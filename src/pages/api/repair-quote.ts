// pages/api/repair-quote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { OpenAI } from 'openai';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

class AiService {
  private api: OpenAI;

  constructor() {
    this.api = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateText(options: {
    prompt: string;
    attachmentUrls: string[];
    history?: string[];
    context?: string;
  }): Promise<string> {
    const messages: any = this.buildMessages(options);

    const response = await this.api.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || '';
  }

  private buildMessages(options: {
    prompt: string;
    attachmentUrls: string[];
    history?: string[];
    context?: string;
  }) {
    const { prompt, context, attachmentUrls = [], history = [] } = options;

    const promptSystem = {
      role: 'system' as const,
      content: `${context}`.trim(),
    };

    const historyMessages = history.map((message, index) => ({
      role: (index % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
      content: [{ type: 'text', text: message }],
    }));

    const mainMessage = {
      role: 'user' as const,
      content: [
        { type: 'text', text: prompt },
        ...attachmentUrls.map(url => ({
          type: 'image_url',
          image_url: { url },
        })),
      ],
    };

    return [promptSystem, ...historyMessages, mainMessage];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data including files
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      uploadDir: './tmp',
      keepExtensions: true,
    });

    // Ensure upload directory exists
    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp');
    }

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Handle files array properly
    const fileArray = Object.values(files).map(fileObj => {
      const file = Array.isArray(fileObj) ? fileObj[0] : fileObj;
      return file;
    });

    // Convert files to base64
    const base64Images = await Promise.all(
      fileArray.map(async (file: any) => {
        if (!file.filepath) {
          throw new Error('File path is undefined');
        }
        const buffer = await fs.promises.readFile(file.filepath);
        return `data:image/jpeg;base64,${buffer.toString('base64')}`;
      })
    );

    const aiService = new AiService();
    
    // Generate the quote using the AiService
    const answer = await aiService.generateText({
      prompt: fields.description as any,
      attachmentUrls: base64Images,
      context: `
        System Role Prompt:
        
        You are a drywall quoting assistant for a company that provides drywall repair services at an hourly rate of $110. Given details about the job, including dimensions of the damaged area, drywall thickness, type of damage, and photos, you will estimate the time, materials, and total cost required. Drywall jobs typically take multiple days to allow drying between applications.
        
        Instructions for Custom GPT:
        
        Use the input dimensions to calculate square footage and determine the number of drywall sheets required.
        Account for drying times by splitting labor across multiple days where compound coats need time to dry.
        Consider the type of damage (e.g., water, hole, full replacement) to adjust labor hours and material estimates.
        Use an hourly rate of $110 to calculate total labor costs and add an estimate for materials.
        Return the total quote with a breakdown of labor, materials, and any notes about the process (e.g., drying time). Also format it to be more readable
        
        This is input from customer and the image is from them:
        `,
    });

    // Clean up temporary files
    await Promise.all(
      fileArray.map(async (file: any) => {
        if (file.filepath && fs.existsSync(file.filepath)) {
          await fs.promises.unlink(file.filepath);
        }
      })
    );

    // Return the response
    res.status(200).json({
      quote: answer,
    });

  } catch (error) {
    console.error('Error processing repair quote:', error);
    res.status(500).json({ 
      error: 'Failed to process repair quote',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}