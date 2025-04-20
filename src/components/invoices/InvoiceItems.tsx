import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface FormInvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

interface InvoiceItemsProps {
  items: FormInvoiceItem[];
  handleItemChange: (
    index: number,
    field: keyof FormInvoiceItem,
    value: string | number
  ) => void;
  calculateItemAmount: (quantity: number, unitPrice: number) => number;
  removeItem: (index: number) => void;
  addItem: () => void;
  currency: string;
}

const InvoiceItems = ({
  items,
  handleItemChange,
  calculateItemAmount,
  removeItem,
  addItem,
  currency,
}: InvoiceItemsProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                Item Description
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Input
                    type="text"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Input
                    type="number"
                    className="w-20"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">
                      {formatCurrency(0, currency).charAt(0)}
                    </span>
                    <Input
                      type="number"
                      className="w-24"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "unit_price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="text-gray-900 font-medium">
                    {formatCurrency(
                      calculateItemAmount(item.quantity, item.unit_price),
                      currency
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-right">
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 inline-flex items-center text-brand-primary hover:text-brand-primary/80"
        onClick={addItem}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </button>
    </div>
  );
};

export default InvoiceItems;
