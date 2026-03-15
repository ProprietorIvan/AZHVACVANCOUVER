import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "./Input";

export type ContactForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  question?: string;
};

const AskContactsForQuote: FC<{
  type: string;
  quote: string;
  query: string;
  handleIsBlurred: (p: boolean) => void;
  contactForm: ContactForm;
  setContactForm: Dispatch<SetStateAction<ContactForm>>;
  imgs: string[];
}> = ({
  type,
  quote,
  handleIsBlurred,
  contactForm,
  setContactForm,
  imgs,
  query,
}) => {
  const head = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);

  useEffect(() => {
    if (head.current) {
      head.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  // const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     const zapierWebhook =
  //         "https://hooks.zapier.com/hooks/catch/20756347/2id440i/";

  //     try {
  //         const response = await fetch(zapierWebhook, {
  //             method: "POST",
  //             mode: "no-cors",
  //             body: JSON.stringify({
  //                 type,
  //                 quote,
  //                 ...contactForm,
  //                 imgs
  //             }),
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         handleIsBlurred(false);
  //     } catch (error) {
  //         console.error("Error submitting booking:", error);
  //     }
  // };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      //   const formData = new FormData();
      //   formData.append('subject', 'inquire');
      //   formData.append('message', 'new inquire');
      //   if (imgs) {
      //     imgs.forEach(image => {
      //       formData.append('images', image);
      //     });
      //   }
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          address: contactForm.address,
          quote,
          query,
          images: imgs,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      // Send lead to Get Timber webhook (with validation - gibberish won't be added)
      try {
        const { sendLeadToGetTimber } = await import("@/utils/sendLeadToGetTimber");
        await sendLeadToGetTimber({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          address: contactForm.address,
          message: query || quote || "",
          serviceType: "Quote Request",
          leadSource: "AZ Air Conditioning Website - Quote Request Form",
          formPage: "/quote-request",
        });
      } catch (webhookError) {
        console.warn("Error sending lead to Get Timber webhook:", webhookError);
        // Don't fail the form submission - email was already sent
      }

      setStatus("success");
      handleIsBlurred(false);
      //   // Reset form
      //   setTo('');
      //   setSubject('');
      //   setMessage('');
      //   setImages(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send email"
      );
    }
  }
  return (
    <>
      <h6 className="text-xl text-center font-bold">Your quote is ready</h6>
      <form ref={head} onSubmit={handleSubmit} className="p-6 space-y-4">
        <Input
          placeholder="Your Name"
          value={contactForm.name}
          onChange={(e) =>
            setContactForm({ ...contactForm, name: e.target.value })
          }
          className="h-12 bg-white border-gray-200 rounded-xl text-gray-900 focus:ring-gray-900"
          required
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          value={contactForm.phone}
          onChange={(e) =>
            setContactForm({ ...contactForm, phone: e.target.value })
          }
          className="h-12 bg-white border-gray-200 rounded-xl text-gray-900 focus:ring-gray-900"
          required
        />
        <Input
          placeholder="Email Address"
          type="email"
          value={contactForm.email}
          onChange={(e) =>
            setContactForm({ ...contactForm, email: e.target.value })
          }
          className="h-12 bg-white border-gray-200 rounded-xl text-gray-900 focus:ring-gray-900"
          required
        />
        <Input
          placeholder="Your Address"
          value={contactForm.address}
          onChange={(e) => {
            setContactForm({ ...contactForm, address: e.target.value });
            if (e.target.value.length >= 3) {
              fetch(`api/address?address=${e.target.value}`)
                .then((res) => res.json())
                .then((predictions: string[]) => setPredictions(predictions));
            }
          }}
          className="h-12 bg-white border-gray-200 rounded-xl text-gray-900 focus:ring-gray-900"
          required
        />

        {predictions.map((text) => (
          <div
            key={text}
            className="text-sm sm:text-base"
            onClick={() => {
              setContactForm({ ...contactForm, address: text });
              setPredictions([]);
            }}
          >
            {text}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-6 rounded-2xl mt-4 hover:bg-[#ffc527] hover:text-black"
        >
          Get your quote
        </button>
      </form>
    </>
  );
};

export default AskContactsForQuote;
