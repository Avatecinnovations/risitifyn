import { Link } from "react-router-dom";
import { BadgeCustom } from "../ui/badge-custom";
export function Hero() {
  return <section className="bg-brand-dark text-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <BadgeCustom variant="yellow" className="mb-2">14-DAY FREE TRIAL</BadgeCustom>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Solving all <br />your invoicing <br />problems here
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              A modern invoicing platform that streamlines your billing process and helps you get paid faster. Create, send, and track invoices with ease.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary">
                Try for free
              </Link>
              <Link to="/demo" className="btn-outline">
                View demo
              </Link>
            </div>
            <p className="text-sm text-gray-400">No credit card required</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-brand-dark">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold">Invoice for</h4>
                  <p className="text-gray-500">Client Name</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">$1,659.00</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Paid</span>
                </div>
              </div>
              <div className="mb-6">
                <input type="text" placeholder="search@clientemail.com" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <button className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium">
                Pay Now
              </button>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-2">
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center">
                  <span className="text-white">Cc</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center">
                  <span className="text-white">Pa</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-brand-coral rounded-full flex items-center justify-center">
                  <span className="text-white">Pp</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                  <span className="text-white">Bt</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <span className="text-white">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}