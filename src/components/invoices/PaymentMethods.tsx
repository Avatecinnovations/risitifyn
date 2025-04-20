
import { CreditCard } from "lucide-react";

interface PaymentMethodsProps {
  selectedPaymentMethods: string[];
  togglePaymentMethod: (method: string) => void;
}

const PaymentMethods = ({ selectedPaymentMethods, togglePaymentMethod }: PaymentMethodsProps) => {
  return (
    <div className="mb-8 border-t pt-4">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
        Payment Methods
      </h3>
      <div className="flex flex-wrap gap-3">
        <button 
          className={`flex items-center px-4 py-2 rounded-md border ${selectedPaymentMethods.includes('bank') ? 'bg-brand-primary/10 border-brand-primary' : 'border-gray-300'}`}
          onClick={() => togglePaymentMethod('bank')}
        >
          <span className="mr-2">🏦</span>
          Bank Transfer
        </button>
        <button 
          className={`flex items-center px-4 py-2 rounded-md border ${selectedPaymentMethods.includes('card') ? 'bg-brand-primary/10 border-brand-primary' : 'border-gray-300'}`}
          onClick={() => togglePaymentMethod('card')}
        >
          <span className="mr-2">💳</span>
          Credit Card
        </button>
        <button 
          className={`flex items-center px-4 py-2 rounded-md border ${selectedPaymentMethods.includes('paypal') ? 'bg-brand-primary/10 border-brand-primary' : 'border-gray-300'}`}
          onClick={() => togglePaymentMethod('paypal')}
        >
          <span className="mr-2">🅿️</span>
          PayPal
        </button>
        <button 
          className={`flex items-center px-4 py-2 rounded-md border ${selectedPaymentMethods.includes('stripe') ? 'bg-brand-primary/10 border-brand-primary' : 'border-gray-300'}`}
          onClick={() => togglePaymentMethod('stripe')}
        >
          <span className="mr-2">💸</span>
          Stripe
        </button>
        <button 
          className={`flex items-center px-4 py-2 rounded-md border ${selectedPaymentMethods.includes('flutterwave') ? 'bg-brand-primary/10 border-brand-primary' : 'border-gray-300'}`}
          onClick={() => togglePaymentMethod('flutterwave')}
        >
          <span className="mr-2">🌊</span>
          Flutterwave
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
