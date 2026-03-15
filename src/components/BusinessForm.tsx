
import React, { useState } from 'react';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import { Building2, Clock, Building, Upload, ArrowRight, Check } from 'lucide-react';
import Input from '@/components/Input';
import Label from '@/components/Label';
import fileToBase64 from '@/utils/fileToBase64';

interface BusinessFormData {
  company_name: string;
  industry: string;
  project_type: string;
  project_timeline: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  project_details: string;
  project_address: string
  files: File[];
}

const BusinessForm = () => {
  const [businessForm, setBusinessForm] = useState<BusinessFormData>({
    company_name: '',
    industry: '',
    project_type: '',
    project_timeline: '',
    name: '',
    role: '',
    phone: '',
    email: '',
    project_details: '',
    project_address: '',
    files: []
  });
  const [step, setStep] = useState(1);
  const [invalid, setInvalid] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState(false);
  const [predictions, setPredictions] = useState<string[]>([])
  const totalSteps = 4;

  const handleSubmit = async () => {
    const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/20756347/2sw8vj6';

    try {
      const response = await fetch(zapierWebhook, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          ...businessForm
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const filesUrls = await Promise.all(businessForm.files.map(fileToBase64)).then(res => res);

      const responseEmail = await fetch('/api/business_email', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...businessForm, files: filesUrls }),
      });

      const data = await responseEmail.json();

      if (!responseEmail.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      // Send lead to Get Timber webhook (with validation - gibberish won't be added)
      try {
        const { sendLeadToGetTimber } = await import("@/utils/sendLeadToGetTimber");
        await sendLeadToGetTimber({
          name: businessForm.name,
          email: businessForm.email,
          phone: businessForm.phone,
          address: businessForm.project_address || "",
          message: businessForm.project_details || "",
          facilityType: businessForm.industry || "Commercial",
          propertyType: "Commercial",
          serviceType: businessForm.project_type || "Business Services",
          leadSource: "AZ Air Conditioning Website - Business Form",
          formPage: "/business",
        });
      } catch (webhookError) {
        console.warn("Error sending lead to Get Timber webhook:", webhookError);
        // Don't fail the form submission - email was already sent
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };
  function isStepValid(step: number) {
    switch (step) {
      case 1:
        return !!(businessForm.company_name && businessForm.industry)
      case 2:
        return !!businessForm.project_type
      case 3:
        return !!(businessForm.project_address && businessForm.project_details && businessForm.project_timeline)
      case 4:
        return !!(businessForm.email && businessForm.phone && businessForm.name)
      default:
        return false
    }
  }

  const renderProgressBar = () => (
    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-500 transition-all duration-500 ease-out"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );

  // Success Message Component
  const SuccessMessage = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/10 mb-4">
            <Check className="h-6 w-6 text-yellow-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Request Submitted Successfully!</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Thank you for submitting your project details. Our team will reach out to you within the next few hours.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-12">
      {showSuccess && <SuccessMessage />}

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-70" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 animate-fade-in">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              Over 15 years of experience delivering large-scale commercial projects across Canada
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">


        <div id='businessFormCards' className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Building2,
              title: "Quality Assurance",
              desc: "Successfully completed over 500 commercial projects with stringent quality standards",
              list: ["Major retail chains", "Class A office buildings", "Healthcare facilities"]
            },
            {
              icon: Clock,
              title: "Fast Response Times",
              desc: "Dedicated enterprise team ready to handle urgent commercial requirements",
              list: ["24/7 emergency service", "Same-day quotes", "Flexible scheduling"]
            },
            {
              icon: Building,
              title: "Expert Teams",
              desc: "Large-scale project capabilities with specialized commercial experience",
              list: ["Licensed professionals", "Project managers", "Safety certified"]
            }
          ].map((service, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-full bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-xl mb-6">
                  <service.icon className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {service.list.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-yellow-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Card className="bg-white rounded-3xl shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8 space-y-6">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">Submit Information</h2>
                  <p className="text-gray-600">
                    Submit your information to our enterprise team in 3 easy steps
                  </p>
                </div>

                {renderProgressBar()}

                <div id='businessFormSubmit' className="mt-12 max-w-7xl mx-auto">
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-semibold mb-6">Business Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-gray-700 text-sm font-medium">Company or Building Name</Label>
                          <Input
                            placeholder="Your Company Ltd."
                            className="rounded-xl h-12 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            value={businessForm.company_name}
                            onChange={(e) => {
                              setBusinessForm({ ...businessForm, company_name: e.target.value })
                              setInvalid(false)
                            }}
                          />
                          {invalid && !businessForm.company_name && (
                            <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700 text-sm font-medium">Industry</Label>
                          <select
                            className="w-full rounded-xl h-12 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            value={businessForm.industry}
                            onChange={e => {
                              setBusinessForm({ ...businessForm, industry: e.target.value });
                              setInvalid(false)
                            }}
                          >
                            <option>Select your industry</option>
                            <option value="retail">Retail</option>
                            <option value="office">Office Space</option>
                            <option value="residential">Multi-Unit Residential</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="hospitality">Hospitality</option>
                          </select>
                          {invalid && !businessForm.industry && (
                            <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-semibold mb-6">Project Type</h3>
                      <div className="grid gap-4">
                        {[
                          "Complete Renovation",
                          "New Installation",
                          "Repair Work",
                          "Water Damage Restoration",
                          "Commercial Build-Out",
                          "Other"
                        ].map((type, i) => (
                          <div key={i}
                            className={`flex items-center p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-500 cursor-pointer transition-colors ${businessForm.project_type === type ? 'border-yellow-500 bg-yellow-50' : ''}`}
                            onClick={() => {
                              setBusinessForm({ ...businessForm, project_type: type })
                              setInvalid(false)
                            }}
                          >
                            <div className="flex-1">{type}</div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                      {invalid && !businessForm.project_type && (
                        <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-semibold mb-6">Project Details</h3>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <Label className="text-gray-700 text-sm font-medium">Project Address</Label>
                          <Input
                            placeholder="Your project address"
                            className="rounded-xl h-12 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            value={businessForm.project_address}
                            onChange={(e) => {
                              if (e.target.value.length >= 3) {
                                fetch(`api/address?address=${e.target.value}`)
                                  .then(res => res.json())
                                  .then((predictions: string []) => setPredictions(predictions))
                              }
                              setBusinessForm({ ...businessForm, project_address: e.target.value })
                              setInvalid(false)
                            }}
                          />
                          {predictions.map(text=>
                            <div 
                              key={text} 
                              className="text-sm sm:text-base" 
                              onClick={()=>{
                                setBusinessForm({ ...businessForm, project_address: text })
                                setPredictions([])
                              }}
                            >{text}</div>)}
                          {invalid && !businessForm.project_address && (
                            <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <Label className="text-gray-700 text-sm font-medium">Project Description</Label>
                          <textarea
                            placeholder="Please describe your project requirements, specifications, or any special considerations..."
                            className="w-full rounded-xl border border-gray-200 p-4 min-h-[120px] focus:border-yellow-500 focus:ring-yellow-500"
                            value={businessForm.project_details}
                            onChange={(e) => {
                              setBusinessForm({ ...businessForm, project_details: e.target.value })
                              setInvalid(false)
                            }}
                          />
                          {invalid && !businessForm.project_details && (
                            <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Label className="text-gray-700 text-sm font-medium">Upload Project Documents</Label>
                          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                            <input
                              type="file"
                              multiple
                              onChange={(e) => setBusinessForm({ ...businessForm, files: [...businessForm.files, ...Array.from(e.target.files || [])] })}
                              className="hidden"
                              id="file-upload"
                              accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                              <Upload className="w-10 h-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">
                                Drag & drop any relevant project documents
                              </span>
                              <span className="text-xs text-gray-400 mt-1">
                                Architectural drawings, specifications, floor plans, schedules, etc.
                              </span>
                              <span className="text-xs text-gray-400 mt-1">
                                Supported formats: PDF, DWG, Office Documents, Images
                              </span>
                            </label>
                          </div>

                          {/* File List */}
                          {businessForm.files.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {businessForm.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                  <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                  <button
                                    onClick={() => setBusinessForm({
                                      ...businessForm,
                                      files: businessForm.files.filter((_, i) => i !== index)
                                    })}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-700 text-sm font-medium">Timeline</Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              { label: "Emergency", desc: "24-48 hours" },
                              { label: "Standard", desc: "Within a week" },
                              { label: "Planned", desc: "Within a month" },
                              { label: "Future", desc: "Planning ahead" }
                            ].map((timeline, i) => (
                              <div key={i}
                                className={`p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-500 cursor-pointer transition-colors ${businessForm.project_timeline === timeline.label ? 'border-yellow-500 bg-yellow-50' : ''}`}
                                onClick={() => {
                                  setBusinessForm({ ...businessForm, project_timeline: timeline.label })
                                  setInvalid(false)
                                }}
                              >
                                <div className="font-medium">{timeline.label}</div>
                                <div className="text-sm text-gray-500">{timeline.desc}</div>
                              </div>
                            ))}
                          </div>
                          {invalid && !businessForm.project_timeline && (
                            <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-semibold mb-6">Contact Details</h3>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-sm font-medium">Contact Name</Label>
                            <Input
                              placeholder="Your name"
                              className="rounded-xl h-12"
                              value={businessForm.name}
                              onChange={(e) => {
                                setBusinessForm({ ...businessForm, name: e.target.value })
                                setInvalid(false)
                              }}
                            />
                            {invalid && !businessForm.name && (
                              <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-sm font-medium">Role</Label>
                            <Input
                              placeholder="Your position"
                              className="rounded-xl h-12"
                              value={businessForm.role}
                              onChange={(e) => setBusinessForm({ ...businessForm, role: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-sm font-medium">Phone</Label>
                            <Input
                              type="tel"
                              placeholder="+1 (___) ___-____"
                              className="rounded-xl h-12"
                              value={businessForm.phone}
                              onChange={(e) => {
                                setBusinessForm({ ...businessForm, phone: e.target.value })
                                setInvalid(false)
                              }}
                            />
                            {invalid && !businessForm.phone && (
                              <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-sm font-medium">Email</Label>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              className="rounded-xl h-12"
                              value={businessForm.email}
                              onChange={(e) => {
                                setBusinessForm({ ...businessForm, email: e.target.value })
                                setInvalid(false)
                              }}
                            />
                            {invalid && !businessForm.email && (
                              <div className="text-red-500 text-sm sm:text-base">Field is required</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between items-center w-full">
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className=" w-full text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      disabled={invalid}
                      onClick={() => {
                        const valid = isStepValid(step);
                        if ((step < totalSteps) && valid) {
                          setStep(step + 1)
                        } else if ((step === totalSteps) && valid) {
                          handleSubmit()
                        } else {
                          setInvalid(true)
                        }
                      }}
                      className={` w-full ml-auto bg-black flex items-center justify-center text-black px-8 py-3 rounded-xl font-medium hover:bg-[#ffc527] text-white transition-colors flex items-center gap-2 hover:text-black`}
                    >
                      {step === totalSteps ? (
                        <>Submit <Check className="w-5 h-5" /></>
                      ) : (
                        <>Next <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;