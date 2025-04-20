export function Integrations() {
  const integrationIcons = [
    { name: "Slack", letter: "S" },
    { name: "Google", letter: "G" },
    { name: "Dropbox", letter: "D" },
    { name: "PayPal", letter: "P" },
    { name: "Zoom", letter: "Z" },
    { name: "QuickBooks", letter: "Q" },
    { name: "Stripe", letter: "S" },
    { name: "HubSpot", letter: "H" },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Integrates with 50+ applications
          </h2>
          <p className="text-xl text-gray-600">
            Connect Risitify with your favorite tools to streamline your
            workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
          {integrationIcons.map((icon, index) => (
            <div
              key={index}
              className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-2xl font-bold text-gray-700">
                {icon.letter}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white text-brand-primary border border-brand-primary px-6 py-3 rounded-lg font-medium hover:bg-brand-primary/5 transition-colors">
            View all integrations
          </button>
        </div>
      </div>
    </section>
  );
}
