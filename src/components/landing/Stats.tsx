
import { BadgeCustom } from "../ui/badge-custom";
import { PieChart } from "lucide-react";

export function Stats() {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <BadgeCustom variant="primary" className="mb-4">ANALYTICS</BadgeCustom>
            <h2 className="text-4xl font-bold mb-6">Generate, upload and sort your invoices in one place</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-brand-primary mt-1 mr-3 flex-shrink-0"></div>
                <p>Create professional invoices in seconds with customizable templates</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-brand-yellow mt-1 mr-3 flex-shrink-0"></div>
                <p>Track payment status and send automated reminders</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-brand-coral mt-1 mr-3 flex-shrink-0"></div>
                <p>Generate financial reports with just a few clicks</p>
              </li>
            </ul>
            <div className="mt-6">
              <button className="btn-primary">Try it for free</button>
            </div>
          </div>
          <div className="bg-brand-dark/50 p-8 rounded-xl">
            <div className="bg-white rounded-lg shadow-xl p-6 text-brand-dark">
              <h3 className="text-xl font-bold mb-6">Invoices Issued</h3>
              <div className="flex justify-center">
                <div className="w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="15" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#13C296" strokeWidth="15" strokeDasharray="185" strokeDashoffset="50" />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">75%</text>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">Invoices Paid</p>
                  <p className="text-xl font-bold">$103,430</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold">$13,893</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
