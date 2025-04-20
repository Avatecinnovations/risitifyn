import { Link } from "react-router-dom";

export function Cta() {
  return (
    <section className="py-20 bg-brand-primary">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Get started with invoicing now
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Join thousands of freelancers and businesses who use Risitify to
          streamline their invoicing process.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-brand-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Try Risitify for free
        </Link>
      </div>
    </section>
  );
}
