import { useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Steps from '@/components/Steps';
import Hero from '@/components/Hero';
import { MinusCircle, PlusCircle, AlertCircle } from 'lucide-react';

// Define interfaces
interface ServiceDetails {
  price: number;
  maxPrice: number;
  note?: string;
}

interface CategoryServices {
  [serviceName: string]: ServiceDetails;
}

interface ServiceCatalog {
  [category: string]: CategoryServices;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface SelectedServices {
  [serviceName: string]: number;
}

const GeneralHandyman = () => {
  // State management
  const [selectedServices, setSelectedServices] = useState<SelectedServices>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [step, setStep] = useState<number>(1);

  // Example messages
  const examples = useMemo(() => [
    "I was AZ Handyman's secret pricing tool for 3 years…",
    "Now I'm helping customers like you get instant quotes…",
    "Try me! Like: Need to mount my 65-inch TV in the bedroom…",
    "Or: Kitchen faucet is leaking and needs replacement…"
  ], []);

  // Context string
  const context = useMemo(() => `
    System Role Prompt:
    You are a quoting assistant for a company that provides handyman services...
  `.trim(), []);

  // Services catalog
  const services: ServiceCatalog = {
    'Everyday Handyman Services': {
      'Hanging shelves': { price: 50, maxPrice: 75, note: 'per shelf' },
      'Picture and mirror hanging': { price: 50, maxPrice: 75 },
      'Caulking a bathtub or shower': { price: 150, maxPrice: 250 },
      'Mounting a TV': { price: 120, maxPrice: 200, note: 'based on complexity' },
      'Furniture assembly': { price: 150, maxPrice: 300, note: 'depends on size/complexity' },
      'Replacing light fixtures': { price: 100, maxPrice: 150, note: 'per fixture' },
      'Installing curtain rods or blinds': { price: 100, maxPrice: 200 }
    },
    'Light Plumbing': {
      'Faucet replacement': { price: 200, maxPrice: 300 },
      'Toilet handle or seat replacement': { price: 75, maxPrice: 100 },
      'Unclogging drains': { price: 150, maxPrice: 250 },
      'Showerhead replacement': { price: 120, maxPrice: 200 }
    },
    'Minor Repairs': {
      'Door adjustments': { price: 100, maxPrice: 200 },
      'Fixing cabinet hinges': { price: 100, maxPrice: 150 },
      'Weatherstripping': { price: 100, maxPrice: 200, note: 'per door/window' }
    },
    'Outdoor Tasks': {
      'Gutter cleaning': { price: 150, maxPrice: 300 },
      'Pressure washing': { price: 200, maxPrice: 500, note: 'based on area size' },
      'Fence and gate repairs': { price: 150, maxPrice: 400, note: 'based on damage/length' }
    },
    'Miscellaneous': {
      'Smart device setup': { price: 150, maxPrice: 300, note: 'e.g., video doorbells, thermostats' },
      'Grout cleaning and repair': { price: 150, maxPrice: 300 },
      'Baseboard and trim installation': { price: 200, maxPrice: 400 }
    }
  };

  // Helper functions
  const calculateTotal = () => {
    let minTotal = 0;
    let maxTotal = 0;
    Object.entries(selectedServices).forEach(([service, quantity]) => {
      Object.values(services).forEach((categoryServices) => {
        if (service in categoryServices) {
          minTotal += categoryServices[service].price * quantity;
          maxTotal += categoryServices[service].maxPrice * quantity;
        }
      });
    });
    return { minTotal, maxTotal };
  };

  const meetsMinimumOrder = (): boolean => {
    return calculateTotal().minTotal >= 250;
  };

  const updateQuantity = (service: string, delta: number): void => {
    setSelectedServices(prev => {
      const current = prev[service] || 0;
      const newQuantity = Math.max(0, current + delta);
      if (newQuantity === 0) {
        const { [service]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [service]: newQuantity };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!meetsMinimumOrder()) {
      alert('Minimum order value of $250 required');
      return;
    }

    try {
      // Here you would typically send this to your backend
     
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      });
      setSelectedServices({});
      setStep(1);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-gray-900 selection:text-white">
      <Navigation transparent />
      
      <Hero 
        context={context}
        examples={examples}
        title='Home repair.'
        subtitle='Reimagined.'
        description='Experience the future of home improvement. Instant quotes. Effortless booking. Exceptional results.'
        quoteTitle="Handyman Services. Quoted Instantly"
        quoteSubtitle="From small fixes to major projects. Your precise estimate is seconds away."
        quoteDescription="Whether it is a broken fixture, general repairs, or home improvements. Our new AI system combines 15+ years of successful repairs with cutting-edge technology to deliver accurate estimates in seconds."
      />

      <section className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Service</h2>
              <p className="text-xl text-gray-600 mb-4">Select the services you need and schedule your appointment</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 text-left mt-6">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Important Notes:</p>
                  <ul className="text-sm text-blue-800 mt-1 space-y-1">
                    <li>• Minimum order value of $250 required for all services</li>
                    <li>• For drywall repair services, please use our custom quoting tool at <a href="https://az-handyman.ca/drywall" className="text-blue-600 hover:text-blue-800 underline">az-handyman.ca/drywall</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-8">
                {Object.entries(services).map(([category, categoryServices]) => (
                  <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-900">
                      <h3 className="text-xl font-semibold text-white">{category}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {Object.entries(categoryServices).map(([service, { price, maxPrice, note }]) => (
                        <div key={service} className="px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{service}</p>
                            <p className="text-sm text-gray-600">
                              ${price} - ${maxPrice}
                              {note && <span className="text-gray-500 ml-1">({note})</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => updateQuantity(service, -1)}
                              disabled={!selectedServices[service]}
                              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              type="button"
                            >
                              <MinusCircle className="h-5 w-5 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {selectedServices[service] || 0}
                            </span>
                            <button
                              onClick={() => updateQuantity(service, 1)}
                              className="p-2 rounded-full hover:bg-gray-100"
                              type="button"
                            >
                              <PlusCircle className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {Object.keys(selectedServices).length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                    <div className="text-xl font-semibold mb-4">
                      Estimated Total: ${calculateTotal().minTotal} - ${calculateTotal().maxTotal}
                    </div>
                    {!meetsMinimumOrder() && (
                      <div className="text-red-600 text-sm mb-4">
                        * Please add more services to meet the minimum order value of $250
                      </div>
                    )}
                    <button 
                      onClick={() => meetsMinimumOrder() && setStep(2)}
                      disabled={!meetsMinimumOrder()}
                      className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                    >
                      Continue to Booking
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Back to Services
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Complete Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Steps />
      <Contact />
    </div>
  );
};

export default GeneralHandyman;