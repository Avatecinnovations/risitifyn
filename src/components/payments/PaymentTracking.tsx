
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CreditCard, Bell, DollarSign, Clock, Send, ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentTrackingProps {
  invoiceId?: string;
}

const PaymentTracking = ({ invoiceId = "INV-2023-001" }: PaymentTrackingProps) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderDays, setReminderDays] = useState("3");
  const [partialPayments, setPartialPayments] = useState(true);
  const [activeTab, setActiveTab] = useState("record");

  const handleRecordPayment = () => {
    if (!paymentAmount) {
      toast.error("Please enter a payment amount");
      return;
    }
    
    // In a real app, this would connect to a backend API
    toast.success(`Payment of $${paymentAmount} recorded successfully!`);
    setPaymentAmount("");
  };

  const handleSendReminder = () => {
    // In a real app, this would connect to a backend API to send emails
    toast.success("Payment reminder sent successfully!");
  };

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(`https://yourapp.com/pay/${invoiceId}`);
    toast.success("Payment link copied to clipboard!");
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>Track payments and send reminders for invoice #{invoiceId}</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="record" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Record Payment
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Payment Links
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          <TabsContent value="record" className="mt-0">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Payment Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="payment-amount"
                      type="number"
                      className="pl-10"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="flutterwave">Flutterwave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="payment-date"
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">Allow Partial Payments</span>
                    <span className="text-sm text-gray-500">Let clients pay in installments</span>
                  </div>
                  <Switch 
                    checked={partialPayments}
                    onCheckedChange={setPartialPayments}
                  />
                </div>
              </div>
              
              {partialPayments && (
                <div className="p-4 bg-gray-50 rounded-md mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Enabling partial payments allows clients to pay any amount towards 
                    the invoice until the total is paid off.
                  </p>
                </div>
              )}
              
              <Button 
                className="w-full mt-2"
                onClick={handleRecordPayment}
              >
                Record Payment
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="reminders" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Automatic Payment Reminders</span>
                  <span className="text-sm text-gray-500">Send email reminders for unpaid invoices</span>
                </div>
                <Switch 
                  checked={reminderEnabled}
                  onCheckedChange={setReminderEnabled}
                />
              </div>
              
              {reminderEnabled && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Days Before Due Date</Label>
                    <Select value={reminderDays} onValueChange={setReminderDays}>
                      <SelectTrigger id="reminder-days">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day before</SelectItem>
                        <SelectItem value="3">3 days before</SelectItem>
                        <SelectItem value="5">5 days before</SelectItem>
                        <SelectItem value="7">7 days before</SelectItem>
                        <SelectItem value="10">10 days before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-schedule">Reminder Schedule</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="before-due"
                          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                          defaultChecked
                        />
                        <Label htmlFor="before-due" className="text-sm font-normal">Before due date</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="on-due"
                          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                          defaultChecked
                        />
                        <Label htmlFor="on-due" className="text-sm font-normal">On due date</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="after-due"
                          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                          defaultChecked
                        />
                        <Label htmlFor="after-due" className="text-sm font-normal">After due date</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="weekly-after"
                          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                          defaultChecked
                        />
                        <Label htmlFor="weekly-after" className="text-sm font-normal">Weekly after due</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="reminder-preview">Reminder Preview</Label>
                <div className="p-4 border rounded-md bg-white">
                  <p className="text-sm mb-2">Subject: Payment Reminder for Invoice #{invoiceId}</p>
                  <p className="text-sm">Dear Client,</p>
                  <p className="text-sm mt-2">This is a friendly reminder that your invoice #{invoiceId} for $1,250.00 is due on 05/30/2023.</p>
                  <p className="text-sm mt-2">Please click the link below to make your payment.</p>
                  <p className="text-sm mt-4">Thank you for your business!</p>
                </div>
              </div>
              
              <Button 
                className="mt-2"
                onClick={handleSendReminder}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Manual Reminder Now
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="links" className="mt-0">
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium">Payment Link</h3>
                    <p className="text-sm text-gray-500 mt-1">Share this link with your client to accept payment</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyPaymentLink}>
                    Copy Link
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Available Payment Processors</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Stripe</span>
                    </div>
                    <div className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                      Connected
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                      <span>PayPal</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Flutterwave</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-green-500 mr-2" />
                      <span>Paystack</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Link to="/payment-integration" className="text-brand-primary text-sm hover:underline flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure Payment Integrations
                </Link>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          Last payment: 3 days ago
        </div>
        <Link to="/invoices" className="text-sm text-brand-primary hover:underline">
          View Payment History
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PaymentTracking;
