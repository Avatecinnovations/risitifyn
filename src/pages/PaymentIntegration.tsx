
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";

const PaymentIntegration = () => {
  const [activeTab, setActiveTab] = useState("stripe");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [autoRemindersEnabled, setAutoRemindersEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    if (!apiKey || !secretKey) {
      toast.error("API Key and Secret Key are required");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payment integration connected successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment Integrations</h1>
      
      <Tabs defaultValue="stripe" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="stripe" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Stripe
          </TabsTrigger>
          <TabsTrigger value="paypal" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            PayPal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stripe" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Stripe Integration</CardTitle>
                  <CardDescription>
                    Connect your Stripe account to accept credit card payments.
                  </CardDescription>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#6772E5"/>
                    <path d="M12.7499 8.5C12.7499 7.94772 13.1976 7.5 13.7499 7.5H16.2499C16.8022 7.5 17.2499 7.94772 17.2499 8.5C17.2499 9.05228 16.8022 9.5 16.2499 9.5H13.7499C13.1976 9.5 12.7499 9.05228 12.7499 8.5Z" fill="white"/>
                    <path d="M6.74994 15.5C6.74994 14.9477 7.19765 14.5 7.74994 14.5H10.2499C10.8022 14.5 11.2499 14.9477 11.2499 15.5C11.2499 16.0523 10.8022 16.5 10.2499 16.5H7.74994C7.19765 16.5 6.74994 16.0523 6.74994 15.5Z" fill="white"/>
                    <path d="M6 9C6 8.44772 6.44772 8 7 8H12C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10H7C6.44772 10 6 9.55228 6 9Z" fill="white"/>
                    <path d="M11 15C11 14.4477 11.4477 14 12 14H17C17.5523 14 18 14.4477 18 15C18 15.5523 17.5523 16 17 16H12C11.4477 16 11 15.5523 11 15Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Stripe API Key (Publishable Key)</Label>
                  <div className="relative">
                    <Input 
                      id="api-key" 
                      placeholder="pk_test_..." 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secret-key">Stripe Secret Key</Label>
                  <div className="relative">
                    <Input 
                      id="secret-key" 
                      type="password" 
                      placeholder="sk_test_..." 
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret (Optional)</Label>
                  <div className="relative">
                    <Input 
                      id="webhook-secret" 
                      placeholder="whsec_..." 
                      value={webhookSecret}
                      onChange={(e) => setWebhookSecret(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 bg-gray-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold">Payment Features</h3>
                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                      <li>• Accept credit and debit card payments</li>
                      <li>• Support for recurring payments</li>
                      <li>• Automatic payment receipts</li>
                      <li>• Payment dispute management</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Enable automatic payment reminders</span>
                  <span className="text-sm text-gray-500">Send reminders for upcoming and late payments</span>
                </div>
                <Switch 
                  checked={autoRemindersEnabled} 
                  onCheckedChange={setAutoRemindersEnabled} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleConnect} disabled={isLoading} className="w-full">
                {isLoading ? "Connecting..." : "Connect Stripe"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="paypal" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>PayPal Integration</CardTitle>
                  <CardDescription>
                    Connect your PayPal account to accept payments.
                  </CardDescription>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.0654 8.54C20.6593 5.3218 18.1536 2 14.8928 2H7.10723C6.18568 2 5.41178 2.6765 5.25496 3.5885L2.25496 19.5885C2.1361 20.2602 2.66817 20.875 3.34938 20.875H7.71496L8.32164 17.083C8.47845 16.1711 9.25236 15.4946 10.1739 15.4946H12.827C16.0878 15.4946 18.5935 12.1728 17.9996 8.9546L17.4058 5.7364" stroke="#1F87C4" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17.4058 5.73639C17.5626 4.82439 16.7887 4 15.8671 4H9.59497C8.67342 4 7.89951 4.6765 7.7427 5.5885L5.25497 19.5885C5.13611 20.2603 5.66818 20.875 6.34939 20.875H9.93055C10.6118 20.875 11.1438 20.2603 11.025 19.5885L9.81791 11.5885C9.6993 10.9168 10.2314 10.302 10.9126 10.302H14.8929C18.1537 10.302 20.6593 6.98022 20.0655 3.762L19.4716 0.543793" stroke="#1F87C4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-id">PayPal Client ID</Label>
                  <div className="relative">
                    <Input 
                      id="client-id" 
                      placeholder="Client ID from PayPal Developer Dashboard" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-secret">PayPal Client Secret</Label>
                  <div className="relative">
                    <Input 
                      id="client-secret" 
                      type="password" 
                      placeholder="Client Secret from PayPal Developer Dashboard" 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 bg-gray-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold">PayPal Features</h3>
                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                      <li>• Accept PayPal payments</li>
                      <li>• Support for international currencies</li>
                      <li>• PayPal checkout integration</li>
                      <li>• Payment dispute management</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Enable PayPal Express Checkout</span>
                  <span className="text-sm text-gray-500">Allow customers to checkout faster with PayPal</span>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect PayPal</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure global payment settings for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">Send receipt emails</span>
              <span className="text-sm text-gray-500">Automatically send receipt emails after payment</span>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">Payment reminders</span>
              <span className="text-sm text-gray-500">Send reminders for upcoming and late payments</span>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">Save customer payment methods</span>
              <span className="text-sm text-gray-500">Allow customers to save their payment methods</span>
            </div>
            <Switch checked={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentIntegration;
