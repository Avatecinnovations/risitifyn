import { Clock, CreditCard, Globe, PieChart } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-brand-purple" />,
      title: "Save time & focus",
      description:
        "Automate repetitive tasks with templates and recurring invoices to focus on what matters most.",
    },
    {
      icon: <Globe className="h-8 w-8 text-brand-yellow" />,
      title: "Unlimited support",
      description:
        "Our team is here to help you get the most out of Risitify with 24/7 support across all channels.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-brand-coral" />,
      title: "Organized & Automated",
      description:
        "Track payments, send reminders, and reconcile accounts with our automated accounting tools.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-brand-primary" />,
      title: "Over 100 currencies",
      description:
        "Bill clients in their local currency and get paid in yours with automatic currency conversion.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            All-in-one invoice platform
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to create professional invoices, track payments,
            and manage your finances in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
