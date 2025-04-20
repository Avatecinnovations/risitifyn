import { useState } from "react";
import { DollarSign, Plus, Trash2, PlusCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

interface TaxRule {
  id: string;
  name: string;
  rate: number;
  type: string;
  default: boolean;
  country: string;
}

const TaxSettings = () => {
  const [taxRules, setTaxRules] = useState<TaxRule[]>([
    {
      id: "1",
      name: "Standard VAT",
      rate: 7.5,
      type: "vat",
      default: true,
      country: "Nigeria",
    },
    {
      id: "2",
      name: "Reduced VAT",
      rate: 5,
      type: "vat",
      default: false,
      country: "UK",
    },
    {
      id: "3",
      name: "GST",
      rate: 10,
      type: "gst",
      default: false,
      country: "Australia",
    },
  ]);

  const [newTaxRule, setNewTaxRule] = useState<Omit<TaxRule, "id">>({
    name: "",
    rate: 0,
    type: "vat",
    default: false,
    country: "",
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTaxRule({
      ...newTaxRule,
      [name]: name === "rate" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTaxRule({
      ...newTaxRule,
      [name]: value,
    });
  };

  const addTaxRule = () => {
    if (!newTaxRule.name || newTaxRule.rate <= 0 || !newTaxRule.country) {
      toast.error("Please fill all required fields");
      return;
    }

    const newId = Math.random().toString(36).substring(2, 9);
    const updatedRules = [...taxRules, { ...newTaxRule, id: newId }];

    // If the new rule is set as default, update other rules
    if (newTaxRule.default) {
      updatedRules.forEach((rule) => {
        if (rule.id !== newId) {
          rule.default = false;
        }
      });
    }

    setTaxRules(updatedRules);
    setNewTaxRule({
      name: "",
      rate: 0,
      type: "vat",
      default: false,
      country: "",
    });
    setIsAddingNew(false);
    toast.success("Tax rule added successfully!");
  };

  const deleteTaxRule = (id: string) => {
    setTaxRules(taxRules.filter((rule) => rule.id !== id));
    toast.success("Tax rule deleted successfully!");
  };

  const setAsDefault = (id: string) => {
    const updatedRules = taxRules.map((rule) => ({
      ...rule,
      default: rule.id === id,
    }));
    setTaxRules(updatedRules);
    toast.success("Default tax rule updated!");
  };

  const saveChanges = () => {
    // In a real app, this would connect to a backend API
    toast.success("Tax settings saved successfully!");
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-4 md:px-6">
        <CardTitle className="flex items-center text-lg md:text-xl">
          <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
          Tax Settings
        </CardTitle>
        <CardDescription>
          Manage tax rates and rules for your invoices
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div className="bg-gray-50 p-3 md:p-4 rounded-md">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold">About Tax Settings</h3>
              <p className="mt-1 text-xs md:text-sm text-gray-600">
                Configure tax rules to automatically calculate taxes on your
                invoices. The default tax rule will be applied when creating new
                invoices unless you select a different rule.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-md font-medium">Tax Rules</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingNew(true)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Add New Rule</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden overflow-x-auto">
            <div className="bg-gray-50 p-2 md:p-3 text-xs md:text-sm font-medium grid grid-cols-12 gap-2">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Rate (%)</div>
              <div className="col-span-2 hidden md:block">Type</div>
              <div className="col-span-2 hidden md:block">Country</div>
              <div className="col-span-2 md:col-span-1 text-center">
                Default
              </div>
              <div className="col-span-5 md:col-span-2 text-right">Actions</div>
            </div>

            {taxRules.map((rule) => (
              <div
                key={rule.id}
                className="p-2 md:p-3 border-t grid grid-cols-12 gap-2 items-center text-xs md:text-sm"
              >
                <div className="col-span-3 font-medium">{rule.name}</div>
                <div className="col-span-2">{rule.rate}%</div>
                <div className="col-span-2 hidden md:block">
                  {rule.type === "vat"
                    ? "VAT"
                    : rule.type === "gst"
                      ? "GST"
                      : "Custom"}
                </div>
                <div className="col-span-2 hidden md:block">{rule.country}</div>
                <div className="col-span-2 md:col-span-1 text-center">
                  {rule.default ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  ) : (
                    <button
                      className="text-xs text-gray-500 hover:text-brand-primary"
                      onClick={() => setAsDefault(rule.id)}
                    >
                      Set
                    </button>
                  )}
                </div>
                <div className="col-span-5 md:col-span-2 text-right">
                  <button
                    onClick={() => deleteTaxRule(rule.id)}
                    className="text-gray-500 hover:text-red-500"
                    disabled={rule.default}
                    title={
                      rule.default ? "Cannot delete default tax rule" : "Delete"
                    }
                  >
                    <Trash2 className="h-4 w-4 inline-block" />
                    <span className="ml-1 hidden sm:inline-block">Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {isAddingNew && (
              <div className="p-2 md:p-3 border-t grid grid-cols-1 md:grid-cols-12 gap-2 items-center text-xs md:text-sm bg-gray-50">
                <div className="md:col-span-3 mb-2 md:mb-0">
                  <Input
                    placeholder="Tax Name"
                    name="name"
                    value={newTaxRule.name}
                    onChange={handleInputChange}
                    size={1}
                  />
                </div>
                <div className="md:col-span-2 mb-2 md:mb-0">
                  <Input
                    type="number"
                    placeholder="Rate"
                    name="rate"
                    value={newTaxRule.rate.toString()}
                    onChange={handleInputChange}
                    size={1}
                  />
                </div>
                <div className="md:col-span-2 mb-2 md:mb-0">
                  <Select
                    value={newTaxRule.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="tax-type">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="gst">GST</SelectItem>
                      <SelectItem value="sales">Sales Tax</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 mb-2 md:mb-0">
                  <Input
                    placeholder="Country"
                    name="country"
                    value={newTaxRule.country}
                    onChange={handleInputChange}
                    size={1}
                  />
                </div>
                <div className="md:col-span-1 flex items-center justify-center mb-2 md:mb-0">
                  <input
                    type="checkbox"
                    id="default-tax"
                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                    checked={newTaxRule.default}
                    onChange={() =>
                      setNewTaxRule({
                        ...newTaxRule,
                        default: !newTaxRule.default,
                      })
                    }
                  />
                  <label htmlFor="default-tax" className="ml-1 md:hidden">
                    Default
                  </label>
                </div>
                <div className="md:col-span-2 flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingNew(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={addTaxRule}>
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 md:pt-4">
          <Button
            onClick={() => setIsAddingNew(true)}
            className="w-full flex items-center justify-center"
            variant="outline"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another Tax Rule
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t px-4 py-3 md:px-6 md:py-4">
        <Button onClick={saveChanges} className="ml-auto">
          Save Tax Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaxSettings;
