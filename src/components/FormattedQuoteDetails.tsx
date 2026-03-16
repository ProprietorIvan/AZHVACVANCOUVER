interface FormattedQuoteDetaisProps {
  content: string;
  isBlurred: boolean;
}

const FormattedQuoteDetails = ({ content, isBlurred }: FormattedQuoteDetaisProps) => {
  const processText = (text: string) => {
    // Remove hashtags, asterisks, bullets, and hyphens
    const cleanText = text?.replace(/[#\*\•\-]/g, '');
    const sections = cleanText?.split('\n\n');
    
    return sections?.map((section, sectionIndex) => {
      const lines = section.split('\n');
      
      return (
        <div key={sectionIndex} className="mb-6 text-center">
          {lines.map((line, lineIndex) => {
            // Main headers (now checking for non-empty line since we removed hyphens)
            if (lineIndex === 0 && line.trim()) {
              return (
                <h2 key={lineIndex} className={`text-xl font-semibold mb-4 text-center ${isBlurred ? 'blur' : ''}`}>
                  {line.trim()}
                </h2>
              );
            }
            
            // Subheaders (Day 1, Day 2, etc.)
            if (line.toLowerCase().startsWith('day')) {
              return (
                <h3 key={lineIndex} className={`text-lg font-medium mt-4 mb-2 text-center ${isBlurred ? 'blur' : ''}`}>
                  {line.trim()}
                </h3>
              );
            }
            
            // Description headers
            if (line.endsWith(':')) {
              return (
                <h4 key={lineIndex} className={`font-medium mt-2 text-center ${isBlurred ? 'blur' : ''}`}>
                  {line.trim()}
                </h4>
              );
            }
            
            // List items (now checking for non-empty trimmed line)
            if (line.trim()) {
              return (
                <div key={lineIndex} className={`mt-2 flex justify-center ${isBlurred ? 'blur' : ''}`}>
                  {formatPrices(line.trim())}
                </div>
              );
            }
            
            // Regular text with price formatting
            return (
              <p key={lineIndex} className={`mt-2 text-center ${isBlurred ? 'blur' : ''}`}>
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
      if (part.startsWith('$')) {
        return <span key={index} className={`font-bold ${isBlurred ? 'blur' : ''}`}>{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="p-6">
        <div className="space-y-4">
          {processText(content)}
        </div>
      </div>
    </div>
  );
};

export default FormattedQuoteDetails;