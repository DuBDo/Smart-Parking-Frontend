import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does it work?",
    answer:
      "You search for available parking spaces, choose a suitable spot, book it, and park your vehicle at the selected time.",
  },
  {
    question: "How can I contact you if I need help?",
    answer:
      "You can contact us through in-app chat, email support, or our customer support hotline available 24/7.",
  },
  {
    question: "How do I find my space?",
    answer:
      "When you have completed your booking and payment has been taken, we’ll send through the exact address and access instructions to your space.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, we have a flexible cancellation policy, you can cancel up to 24hrs before the start time of your booking.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-7 py-7 rounded-md border text-[#212226] bg-white border-[#ddd] shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Frequently asked questions
      </h2>

      <div className="">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#1fa637] font-medium text-lg">
                {faq.question}
              </p>
              {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-3" : "max-h-0"
              }`}
            >
              <p className="text-[#212121]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
