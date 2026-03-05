/* eslint-disable @next/next/no-img-element */

import { ImagePlus, Upload, X } from "lucide-react";
import Card from "./Card";
import CardContent from "./CardContent";
import FormattedQuoteDetails from "./FormattedQuoteDetails";
import QuoteResult from "./QuoteResult";
import Input from "./Input";
import { useCallback, useEffect, useState } from "react";
import { AiService } from "@/ai/ai-service";
import AskContactsForQuote from "./AskContactsForQuote";
import fileToBase64 from "@/utils/fileToBase64";

interface QuoteProps {
  examples: string[];
  context: string;
}
export type ContactForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  question?: string;
}

const Quote = ({ examples, context }: QuoteProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isQuoteBlurred, setIsQuoteBlurred] = useState(true);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    question: ''
  });
  const [imgs, setImgs] = useState<string[]>([])

  useEffect(() => {
    if (currentCharIndex < examples[currentExampleIndex].length) {
      const timer = setTimeout(() => {
        setTypingText(
          (prev) => prev + examples[currentExampleIndex][currentCharIndex]
        );
        setCurrentCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setTypingText("");
        setCurrentCharIndex(0);
        setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentCharIndex, currentExampleIndex, examples]);

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

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
      Promise.all(droppedFiles.map(fileToBase64)).then(res => {
        setImgs(prev => [...prev, ...res]);
      });
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const newFiles = Array.from(e.target.files);
        const newUrls = newFiles.map((file) => URL.createObjectURL(file));
        setFiles((prev) => [...prev, ...newFiles]);
        setImageUrls((prev) => [...prev, ...newUrls]);
        Promise.all(newFiles.map(fileToBase64)).then(res => {
        
          setImgs(prev => [...prev, ...res])
        })
      }
    },
    []
  );

  function prepareIMGTag(imgs: string[]) {
    return imgs.map(img => `<img alt='' src='${img}' />`)
  }

  const removeFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(imageUrls[index]);
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
      setImgs((prev) => prev.filter((_, i) => i !== index));
    },
    [imageUrls]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await AiService.generateText({
        prompt: `Generate a repair quote for the following description: ${text}. The quote should include labor and parts estimate.`,
        attachmentUrls: imgs,
        context,
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
    <>
      <div className="mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-1">Tell us about your project</h3>
          <p className="text-sm text-black/60">Magical technology. Human expertise. Instant results.</p>
        </div>
      </div>
      <Card
        id="yourhome"
        className="w-full max-w-7xl mx-auto bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border-0"
      >
        <CardContent className="pt-0 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <Input
                type="text"
                placeholder={typingText || "Describe your repair needs..."}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-12 sm:h-16 px-4 sm:px-8 text-base sm:text-lg placeholder-gray-700 bg-gray-50/50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out shadow-sm hover:bg-gray-50/80"
              />

              {/* Image Upload Area */}
              <div
                className={`relative rounded-xl sm:rounded-2xl transition-all duration-300 ease-in-out ${isDragging
                  ? "border-gray-900 bg-gray-50 scale-[0.99]"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleFileInput}
                />
                <label
                  htmlFor="image-upload"
                  className="h-12 sm:h-16 w-100 md:w-[200px] group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/5 hover:bg-yellow-50 transition-colors border-2 border-transparent hover:border-yellow-200 cursor-pointer"
                >
                  <ImagePlus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  <span className="font-medium text-black/70">
                    {files.length === 0 ? 'Add photos' : `${files.length} photo${files.length !== 1 ? 's' : ''}`}
                  </span>
                </label>
              </div>
            </div>

            {/* Display uploaded images */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {imageUrls.map((url, index) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm sm:text-base">{error}</div>
            )}

            {/* Submit Button */}
            {!quote && (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors hover:text-black
                  ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#ffc527]"}`}
              >
                {isLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    Get Quote
                  </>
                )}
              </button>
            )}
          </form>

          <div className="flex justify-center items-center gap-3 mt-6 text-xs text-black/40">
            <span>30-second process</span>
            <span>•</span>
            <span>No commitment</span>
            <span>•</span>
            <span>Instant result</span>
          </div>

          {/* Quote Result */}
          {quote && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Your Quote</h2>
              <div className="relative">
                <FormattedQuoteDetails
                  isBlurred={isQuoteBlurred}
                  content={quote}
                />
                {isQuoteBlurred ?
                  <AskContactsForQuote
                    quote={quote}
                    query={text}
                    type="drywall"
                    handleIsBlurred={setIsQuoteBlurred}
                    contactForm={contactForm}
                    setContactForm={setContactForm}
                    imgs={imgs}
                  />
                  :
                  <QuoteResult
                    // quote={quote}
                    // type="drywall"
                    // handleIsBlurred={setIsQuoteBlurred}
                    // contactForm={contactForm}
                    // setContactForm={setContactForm}
                  />
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Quote;