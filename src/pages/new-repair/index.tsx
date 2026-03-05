import { Wrench, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import Navigation from "../../components/Navigation";
import { AiService } from "@/ai/ai-service";
import Contact from "@/components/Contact";

interface FormattedQuoteDetaisProps {
  content: string;
}

const FormattedQuoteDetails = ({ content }: FormattedQuoteDetaisProps) => {
  const processText = (text: string) => {
    // Remove hashtags, asterisks, bullets, and hyphens
    const cleanText = text.replace(/[#\*\•\-]/g, "");
    const sections = cleanText.split("\n\n");

    return sections.map((section, sectionIndex) => {
      const lines = section.split("\n");

      return (
        <div key={sectionIndex} className="mb-6 text-center">
          {lines.map((line, lineIndex) => {
            // Main headers (now checking for non-empty line since we removed hyphens)
            if (lineIndex === 0 && line.trim()) {
              return (
                <h2
                  key={lineIndex}
                  className="text-xl font-semibold mb-4 text-center"
                >
                  {line.trim()}
                </h2>
              );
            }

            // Subheaders (Day 1, Day 2, etc.)
            if (line.toLowerCase().startsWith("day")) {
              return (
                <h3
                  key={lineIndex}
                  className="text-lg font-medium mt-4 mb-2 text-center"
                >
                  {line.trim()}
                </h3>
              );
            }

            // Description headers
            if (line.endsWith(":")) {
              return (
                <h4 key={lineIndex} className="font-medium mt-2 text-center">
                  {line.trim()}
                </h4>
              );
            }

            // List items (now checking for non-empty trimmed line)
            if (line.trim()) {
              return (
                <div key={lineIndex} className="mt-2 flex justify-center">
                  {formatPrices(line.trim())}
                </div>
              );
            }

            // Regular text with price formatting
            return (
              <p key={lineIndex} className="mt-2 text-center">
                {formatPrices(line.trim())}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const formatPrices = (text: string) => {
    // Split the text by dollar amounts
    const parts = text.split(/(\$\d+(?:,\d{3})*(?:\.\d{2})?)/g);

    return parts.map((part, index) => {
      // If the part starts with $, it's a price
      if (part.startsWith("$")) {
        return (
          <span key={index} className="font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-6">
        <div className="space-y-4">{processText(content)}</div>
      </div>
    </div>
  );
};

const NewRepair = ({ setCurrentPage }: any) => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles?.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Function to convert File to base64 URL
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0 || !description.trim()) {
      setError("Please provide both images and a description");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert all files to base64 URLs
      const attachmentUrls = await Promise.all(files.map(fileToBase64));

      const response = await AiService.generateText({
        prompt: `Generate a repair quote for the following description: ${description}. The quote should include labor and parts estimate.`,
        attachmentUrls,
        context: `
          System Role Prompt:
        
          You are a drywall quoting assistant for a company that provides drywall repair services at an hourly rate of $110. Given details about the job, including dimensions of the damaged area, drywall thickness, type of damage, and photos, you will estimate the time, materials, and total cost required. Drywall jobs typically take multiple days to allow drying between applications.
        
          Input Example:
        
          Damage Area Dimensions: 4 feet x 6 feet
          Drywall Thickness: 1/2 inch
          Type of Damage: Water damage
          Photo: [Uploaded image for context]
        
          Output Example:
        
          Scope of Work
          We are pleased to provide a detailed estimate for the ceiling repair and painting services. This service involves a comprehensive 3-day process to restore the ceiling with a high-quality finish.
        
          Project Breakdown
          Day 1: Installation of Drywall Patch
        
          Description: Removal of damaged area and installation of a 2x2 ft drywall patch. This includes insulation where necessary.
          Labor Cost: $420
          Day 2: Sanding and Mudding for a Smooth Finish
          
          Description: Application of joint compound (mudding) to seamlessly blend the patch with the surrounding ceiling. This step includes thorough sanding to ensure a smooth, even surface.
          Labor Cost: $380
          Day 3: Surface Preparation and First Coat of Paint
          
          Description: Final sanding and preparation of the ceiling surface. Application of the first coat of premium-grade ceiling paint to ensure durability and a clean finish.
          Labor Cost: $340
          Materials
          Drywall Repair Materials
          (including drywall, joint compound, insulation, and screws): $120
          Painting Supplies and Paint Protection Covers
          (including paint, rollers, brushes, and covers to protect nearby areas): $30
          Summary of Costs
          Labor Costs: $1,140
          Materials Costs: $150
          Grand Total Estimate
          Total Cost: $1,290
          
          Instructions for Custom GPT:
          
          Use the input dimensions to calculate square footage and determine the number of drywall sheets required.
          Account for drying times by splitting labor across multiple days where compound coats need time to dry.
          Consider the type of damage (e.g., water, hole, full replacement) to adjust labor hours and material estimates.
          Use an hourly rate of $110 to calculate total labor costs and add an estimate for materials.
          Return the total quote with a breakdown of labor, materials, and any notes about the process (e.g., drying time). Also format it to be more readable
          
          This is input from customer and the image is from them:
        `,
      });

      setQuote(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing your request"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={setCurrentPage} />

      <main className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            <h1 className="text-2xl md:text-3xl font-bold">
              New Repair Request
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Upload photos of what needs to be repaired and provide a
            description. Our AI will generate a quote based on your input.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg border p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Section */}
            <div>
              <label className="block mb-2">
                <span className="text-sm md:text-base text-gray-700">
                  Upload Photos
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>

              {/* Upload Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 md:p-8 text-center 
                  hover:bg-gray-50 cursor-pointer transition-colors
                  ${
                    isDragging ? "border-black bg-gray-50" : "border-gray-300"
                  }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-sm md:text-base text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label className="block mb-2">
                <span className="text-sm md:text-base text-gray-700">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
                placeholder="Describe what needs to be repaired..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors
                ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                }`}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Get Quote
                </>
              )}
            </button>
          </form>

          {/* Quote Result */}
          {quote && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Your Quote</h2>
              <FormattedQuoteDetails content={quote} />
            </div>
          )}
        </div>
      </main>
      <Contact />
    </div>
  );
};

export default NewRepair;
