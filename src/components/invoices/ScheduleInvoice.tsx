
import { Clock, Calendar } from "lucide-react";

interface ScheduleInvoiceProps {
  scheduleDate: string;
  setScheduleDate: (date: string) => void;
}

const ScheduleInvoice = ({ scheduleDate, setScheduleDate }: ScheduleInvoiceProps) => {
  return (
    <div className="mb-6 pb-4 border-b">
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <span className="font-medium">Schedule Invoice</span>
      </div>
      <div className="pl-7">
        <div className="relative">
          <input
            type="date"
            className="block w-full md:w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          The invoice will be automatically sent on the specified date.
        </p>
      </div>
    </div>
  );
};

export default ScheduleInvoice;
