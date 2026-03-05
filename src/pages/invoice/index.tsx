import {
  Sparkles,
  Plus,
  X,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
} from "lucide-react";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { AiService } from "@/ai/ai-service";
import Navigation from "@/components/Navigation";
import { log } from "console";
import { date } from "zod";
import { useRouter } from "next/router";

// Simple custom alert component
const Alert: React.FC<{
  title: string;
  description: string;
  className?: string;
}> = ({ title, description, className = "" }) => (
  <div
    className={`bg-green-50 border-2 border-green-600 rounded-lg p-4 ${className}`}
  >
    <h3 className="text-green-800 font-bold">{title}</h3>
    <p className="text-green-700">{description}</p>
  </div>
);

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  company?: string;
  notes?: string;
}

interface LineItem {
  id: string;
  input: string;
  content: string;
  isLoading: boolean;
  error: string | null;
  total: number;
}

export interface Section {
  type: "labor" | "materials" | "equipment";
  items: LineItem[];
  isExpanded: boolean;
}

const AutoExpandingTextarea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className?: string;
}> = ({ value, onChange, placeholder, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} resize-none overflow-hidden`}
      rows={1}
    />
  );
};

const EnhancedInvoiceGenerator: React.FC = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    company: "",
    notes: "",
  });

  const [sections, setSections] = useState<Section[]>([
    {
      type: "labor",
      items: [
        {
          id: "labor-1",
          input: "",
          content: "",
          isLoading: false,
          error: null,
          total: 0,
        },
      ],
      isExpanded: true,
    },
    {
      type: "materials",
      items: [
        {
          id: "materials-1",
          input: "",
          content: "",
          isLoading: false,
          error: null,
          total: 0,
        },
      ],
      isExpanded: true,
    },
    {
      type: "equipment",
      items: [
        {
          id: "equipment-1",
          input: "",
          content: "",
          isLoading: false,
          error: null,
          total: 0,
        },
      ],
      isExpanded: true,
    },
  ]);
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<
    {
      name: string;
      column_values: { id: string; text: string }[];
    }[]
  >([]);

  const context = useMemo(
    () => `
    System Role: You are an expert invoice generation assistant with deep knowledge of professional billing practices.
    
    Your task is to transform brief descriptions into comprehensive, professional invoice line items that demonstrate expertise and attention to detail.
    You should expand on the input to create detailed, specific descriptions that justify the costs.
    
    Guidelines for all items:
    - Be extremely detailed and specific
    - Use industry-standard terminology
    - Break down complex tasks into clear components
    - Include relevant technical specifications
    - Mention quality standards and compliance where applicable
    - Always justify costs through detailed explanation
    
    For labor items:
    - Specify exact tasks performed and their sequence
    - Include time breakdowns for each sub-task
    - Note any specialized skills or certifications required
    - Mention safety procedures and quality control steps
    - Reference any relevant codes or standards met
    - Calculate labor at $125/hr for skilled work
    
    For materials:
    - List detailed specifications of all materials
    - Include precise quantities, dimensions, and grades
    - Specify brands and model numbers where relevant
    - Note any special handling or storage requirements
    - Include waste factor in calculations
    - Add 15% markup on materials
    
    For equipment:
    - Detail exact equipment specifications
    - Include setup/breakdown time
    - Note any special configurations or attachments
    - Specify safety measures and operator requirements
    - Include fuel/power consumption if relevant
    - Calculate hourly rates based on market standards
    
    Format: Create a detailed paragraph with clear organization.
    Always end with: [TOTAL: $X,XXX.XX]
  `,
    []
  );

  const handleAddNewItem = (
    sectionType: "labor" | "materials" | "equipment"
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === sectionType
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  id: `${sectionType}-${Date.now()}`,
                  input: "",
                  content: "",
                  isLoading: false,
                  error: null,
                  total: 0,
                },
              ],
            }
          : section
      )
    );
  };

  const toggleSectionExpansion = (
    sectionType: "labor" | "materials" | "equipment"
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === sectionType
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const handleRemoveItem = (
    sectionType: "labor" | "materials" | "equipment",
    itemId: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === sectionType
          ? {
              ...section,
              items:
                section.items.length > 1
                  ? section.items.filter((item) => item.id !== itemId)
                  : section.items,
            }
          : section
      )
    );
  };

  const extractTotal = (content: string): number => {
    const match = content.match(/\[TOTAL: \$([0-9,]+\.?[0-9]*)\]/);
    return match ? Number(match[1].replace(/,/g, "")) : 0;
  };

  const handleGenerateDescription = async (
    sectionType: "labor" | "materials" | "equipment",
    itemId: string,
    input: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === sectionType
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? { ...item, isLoading: true, error: null }
                  : item
              ),
            }
          : section
      )
    );

    try {
      const response = await AiService.generateText({
        prompt: `Transform this ${sectionType} description into a detailed, professional invoice line item: "${input}"
                Make it comprehensive and specific, focusing on the key aspects of ${sectionType}.
                Remember to end with a total cost estimate in the specified format.`,
        attachmentUrls: [],
        context,
      });

      const total = extractTotal(response);
      const contentWithoutTotal = response
        .replace(/\[TOTAL: \$[0-9,]+\.?[0-9]*\]/, "")
        .trim();

      setSections((prev) =>
        prev.map((section) =>
          section.type === sectionType
            ? {
                ...section,
                items: section.items.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        content: contentWithoutTotal,
                        input,
                        total,
                        isLoading: false,
                      }
                    : item
                ),
              }
            : section
        )
      );
    } catch (err) {
      setSections((prev) =>
        prev.map((section) =>
          section.type === sectionType
            ? {
                ...section,
                items: section.items.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        error:
                          err instanceof Error
                            ? err.message
                            : "An error occurred",
                        isLoading: false,
                      }
                    : item
                ),
              }
            : section
        )
      );
    }
  };

  const updateLineItemContent = (
    sectionType: "labor" | "materials" | "equipment",
    itemId: string,
    newContent: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === sectionType
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, input: newContent } : item
              ),
            }
          : section
      )
    );
  };

  const calculateSectionTotal = (items: LineItem[]): number => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateGrandTotal = (): number => {
    return sections.reduce(
      (sum, section) => sum + calculateSectionTotal(section.items),
      0
    );
  };

  const generateInvoice = () => {
    const preparedSections = sections.filter((sec) => sec.items[0].content);
    fetch("/api/invoice", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerInfo,
        sections: preparedSections,
        date: new Date(),
      }),
    })
      .then((d) => d.json())
      .then((res) => {
        setShowSuccess(true);
        setTimeout(() => router.push(`/invoice/${res.insertedId}`), 3000);
      });
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navigation transparent />

      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            title="Success!"
            description="Your invoice has been generated and is ready for download."
          />
        </div>
      )}

      <section className="relative pt-16 pb-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3 text-zinc-800">
              Industrial Invoice Generator
            </h1>
            <p className="text-zinc-600 text-lg">
              Transform simple descriptions into professional invoices with
              precision engineering
            </p>
          </div>

          <div className="space-y-8">
            {/* Customer Information Card */}
            <div className="bg-white rounded-lg border-2 border-zinc-200 overflow-hidden hover:border-zinc-300 transition-all">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Info Fields */}
                  {[
                    {
                      label: "Name",
                      key: "name" as keyof CustomerInfo,
                      type: "text",
                    },
                    {
                      label: "Email",
                      key: "email" as keyof CustomerInfo,
                      type: "email",
                    },
                    {
                      label: "Phone",
                      key: "phone" as keyof CustomerInfo,
                      type: "tel",
                    },
                    {
                      label: "Company",
                      key: "company" as keyof CustomerInfo,
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.key} className="space-y-1">
                      <label className="text-sm font-medium text-zinc-600">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={`Customer ${field.label.toLowerCase()}`}
                        value={customerInfo[field.key] || ""}
                        onChange={(e) => {
                          setCustomerInfo((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }));
                          if (
                            field.key === "email" &&
                            e.target.value.length >= 2 &&
                            e.target.value.length < 6
                          ) {
                            fetch(`/api/getClients?search=${e.target.value}`)
                              .then((d) => d.json())
                              .then((d) =>
                                setSuggestions(d.boards[0].items_page.items)
                              );
                          }
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-50 border-2 border-zinc-200 focus:border-zinc-400 focus:ring-0 transition-all"
                      />
                      {field.key === "email" && (
                        <div className="absolute bg-white border-1 ">
                          {suggestions.map((s) => (
                            <div
                              key={s.name}
                              className="text-sm sm:text-base"
                              onClick={() => {
                                setCustomerInfo((prev) => ({
                                  ...prev,
                                  name: s.name,
                                  email: s.column_values?.[3]?.text || "",
                                  company: s.column_values?.[1]?.text || "",
                                  phone: s.column_values?.[2]?.text || "",
                                  address: s.column_values?.[0]?.text || "",
                                }));
                                setSuggestions([]);
                              }}
                            >
                              {s.name} {s.column_values?.[1]?.text || ""}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Address and Notes Fields */}
                  {[
                    { label: "Address", key: "address" as keyof CustomerInfo },
                    { label: "Notes", key: "notes" as keyof CustomerInfo },
                  ].map((field) => (
                    <div key={field.key} className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-zinc-600">
                        {field.label}
                      </label>
                      <textarea
                        placeholder={`Customer ${field.label.toLowerCase()}`}
                        value={customerInfo[field.key] || ""}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg bg-zinc-50 border-2 border-zinc-200 focus:border-zinc-400 focus:ring-0 transition-all resize-none h-24"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Invoice Sections */}
            {sections.map((section) => (
              <div
                key={section.type}
                className="bg-white rounded-lg border-2 border-zinc-200 overflow-hidden hover:border-zinc-300 transition-all"
              >
                <div className="p-6">
                  <div
                    className="flex items-center justify-between mb-6 cursor-pointer"
                    onClick={() => toggleSectionExpansion(section.type)}
                  >
                    <h2 className="text-xl font-semibold text-zinc-800 capitalize flex items-center gap-2">
                      {section.type}
                      <span className="text-sm text-zinc-500">
                        ({section.items.length}{" "}
                        {section.items.length === 1 ? "item" : "items"})
                      </span>
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-800">
                        Section Total: $
                        {calculateSectionTotal(section.items).toLocaleString(
                          "en-US",
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        )}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddNewItem(section.type);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 
                                 rounded-lg hover:bg-zinc-200 border-2 border-zinc-300 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </button>
                      {section.isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-500" />
                      )}
                    </div>
                  </div>

                  {section.isExpanded && (
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="group relative bg-zinc-50 rounded-lg p-4 border-2 border-zinc-200"
                        >
                          <div className="flex gap-4">
                            <div className="flex-grow relative">
                              <AutoExpandingTextarea
                                value={item.input}
                                onChange={(e) =>
                                  updateLineItemContent(
                                    section.type,
                                    item.id,
                                    e.target.value
                                  )
                                }
                                placeholder={`Describe the ${section.type} in natural language...`}
                                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-zinc-200 focus:border-zinc-400 focus:ring-0 transition-all min-h-[80px] font-sans"
                              />
                              <button
                                onClick={() =>
                                  handleGenerateDescription(
                                    section.type,
                                    item.id,
                                    item.input
                                  )
                                }
                                disabled={item.isLoading || !item.input.trim()}
                                className="absolute right-3 top-3 px-4 py-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 
                                         rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                                         border-2 border-zinc-200 hover:border-zinc-300"
                              >
                                {item.isLoading ? (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-700"></div>
                                    <span className="text-sm">
                                      Processing...
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      AI Enhance
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-zinc-900">
                                  $
                                  {item.total.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </div>
                              </div>
                              {section.items.length > 1 && (
                                <button
                                  onClick={() =>
                                    handleRemoveItem(section.type, item.id)
                                  }
                                  className="self-start p-2 text-zinc-400 hover:text-red-500 transition-colors rounded-lg 
                                           hover:bg-zinc-100 border-2 border-transparent hover:border-red-200"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {item.content && (
                            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-zinc-200">
                              <div className="prose prose-zinc max-w-none">
                                <p className="text-zinc-700">{item.content}</p>
                              </div>
                            </div>
                          )}

                          {item.error && (
                            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg border-2 border-red-200">
                              {item.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Totals Section */}
            <div className="bg-zinc-800 text-white rounded-lg p-6 border-2 border-zinc-600">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Invoice Summary</h2>
                <button
                  onClick={generateInvoice}
                  className="px-6 py-3 bg-yellow-500 text-zinc-900 rounded-lg font-medium 
                           hover:bg-yellow-400 transition-all flex items-center gap-2 
                           border-2 border-yellow-600 shadow-lg hover:shadow-xl 
                           transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Generate Invoice
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-zinc-400 text-sm font-medium">Subtotal</p>
                  <p className="text-3xl font-semibold mt-1">
                    $
                    {calculateGrandTotal().toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">Tax (5%)</p>
                  <p className="text-3xl font-semibold mt-1">
                    $
                    {(calculateGrandTotal() * 0.05).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Total (incl. tax)
                  </p>
                  <p className="text-3xl font-semibold mt-1">
                    $
                    {(calculateGrandTotal() * 1.05).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-700">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-zinc-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-400">
                      Payment Terms: Net 30 days
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      2.99% fee applies for credit card payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedInvoiceGenerator;
