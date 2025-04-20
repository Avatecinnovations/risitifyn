
import { motion } from "framer-motion";

export function Partners() {
  const partnerLogos = [
    {
      name: "Stripe",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968244.png"
    },
    {
      name: "PayPal",
      logo: "https://cdn-icons-png.flaticon.com/512/174/174861.png"
    },
    {
      name: "Square",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png"
    },
    {
      name: "Xero",
      logo: "https://cdn-icons-png.flaticon.com/512/6124/6124991.png"
    },
    {
      name: "QuickBooks",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968299.png"
    },
    {
      name: "Wise",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969051.png"
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-500 font-medium">Trusted by thousands of businesses worldwide</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
