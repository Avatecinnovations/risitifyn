
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Zap, Brain, Bot, BarChart } from "lucide-react";

export function IntegratedWithAI() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const aiFeatures = [
    {
      icon: <Zap className="h-12 w-12 text-brand-primary" />,
      title: "Smart Invoice Recognition",
      description: "Our AI automatically extracts and categorizes information from invoices, saving you hours of manual data entry."
    },
    {
      icon: <Brain className="h-12 w-12 text-brand-yellow" />,
      title: "Predictive Analytics",
      description: "Get insights into future cash flow based on your invoicing history and payment patterns."
    },
    {
      icon: <Bot className="h-12 w-12 text-brand-coral" />,
      title: "Virtual Assistant",
      description: "Ask questions about your finances, create invoices, or send payment reminders using natural language."
    },
    {
      icon: <BarChart className="h-12 w-12 text-brand-purple" />,
      title: "Intelligent Reporting",
      description: "Automatically generated reports highlight key financial metrics and identify opportunities for growth."
    }
  ];

  const faqItems = [
    {
      question: "How does Risitify's AI improve my invoicing workflow?",
      answer: "Our AI automates data extraction from invoices, suggests payment terms based on client history, predicts payment timing, and can even detect potential payment issues before they occur."
    },
    {
      question: "Is my financial data safe with AI processing?",
      answer: "Absolutely. We use bank-level encryption and your data is only used to train models specific to your account. We never share your financial information with third parties."
    },
    {
      question: "Can I customize how the AI works with my business?",
      answer: "Yes! You can train the AI with your specific invoicing preferences, customize the automation rules, and define your own templates that the AI will learn to work with."
    },
    {
      question: "Do I need technical expertise to use the AI features?",
      answer: "Not at all. Our AI is designed to be intuitive and user-friendly. You interact with it using simple natural language, and all complex processes happen behind the scenes."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Integrated with AI</h2>
          <p className="text-xl text-gray-600">
            Risitify uses advanced artificial intelligence to automate your invoicing workflow and provide valuable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {activeQuestion === index ? (
                    <ChevronUp className="h-5 w-5 text-brand-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {activeQuestion === index && (
                  <div className="p-4 pt-0 text-gray-600 border-t">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
