import { LineChart, Clock, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      icon: <Clock className="h-10 w-10 text-brand-yellow" />,
      title: "Track your time & calculate expenses",
      description:
        "Easily track time spent on projects and automatically calculate expenses to include in your invoices.",
      imageRight: true,
      image: (
        <div className="bg-gray-100 rounded-lg p-4 h-full flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xs"
          >
            <img
              src="https://img.freepik.com/free-vector/time-management-concept-illustration_114360-1013.jpg"
              alt="Time tracking illustration"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      ),
    },
    {
      icon: <FileText className="h-10 w-10 text-brand-coral" />,
      title: "Make an invoice in seconds and send it",
      description:
        "Create professional invoices in seconds with our customizable templates and send them directly to your clients.",
      imageRight: false,
      image: (
        <div className="bg-gray-100 rounded-lg p-4 h-full flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xs"
          >
            <img
              src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2411.jpg"
              alt="Invoice creation illustration"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      ),
    },
    {
      icon: <LineChart className="h-10 w-10 text-brand-primary" />,
      title: "Accept payments on time and from many payments methods",
      description:
        "Get paid faster with multiple payment options including credit cards, PayPal, bank transfers, and more.",
      imageRight: true,
      image: (
        <div className="bg-gray-100 rounded-lg p-4 h-full flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-xs"
          >
            <img
              src="https://img.freepik.com/free-vector/mobile-payments-concept-illustration_114360-1721.jpg"
              alt="Payment methods illustration"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">How does it work</h2>
          <p className="text-xl text-gray-600">
            Risitify simplifies your invoicing workflow, from tracking time to
            getting paid.
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${step.imageRight ? "" : "lg:flex-row-reverse"}`}
            >
              <div
                className={`${step.imageRight ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="flex items-center mb-4">
                  {step.icon}
                  <span className="ml-3 text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
              </div>
              <div
                className={`${step.imageRight ? "lg:order-2" : "lg:order-1"}`}
              >
                {step.image}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
