import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentIntegrationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("paystack");

  useEffect(() => {
    const provider = searchParams.get("provider");
    if (
      provider &&
      ["paystack", "flutterwave", "stripe", "paypal"].includes(provider)
    ) {
      setActiveTab(provider);
    }
  }, [searchParams]);

  const handleSave = () => {
    // TODO: Save payment integration settings
    navigate("/settings");
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Payment Integrations</h1>
        <Button variant="outline" onClick={() => navigate("/settings")}>
          Back to Settings
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="paystack">Paystack</TabsTrigger>
          <TabsTrigger value="flutterwave">Flutterwave</TabsTrigger>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
        </TabsList>

        <TabsContent value="paystack">
          <Card>
            <CardHeader>
              <CardTitle>Paystack Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paystack-public-key">Public Key</Label>
                <Input
                  id="paystack-public-key"
                  placeholder="Enter your Paystack public key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paystack-secret-key">Secret Key</Label>
                <Input
                  id="paystack-secret-key"
                  type="password"
                  placeholder="Enter your Paystack secret key"
                />
              </div>
              <Button onClick={handleSave}>Save Paystack Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flutterwave">
          <Card>
            <CardHeader>
              <CardTitle>Flutterwave Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="flutterwave-public-key">Public Key</Label>
                <Input
                  id="flutterwave-public-key"
                  placeholder="Enter your Flutterwave public key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flutterwave-secret-key">Secret Key</Label>
                <Input
                  id="flutterwave-secret-key"
                  type="password"
                  placeholder="Enter your Flutterwave secret key"
                />
              </div>
              <Button onClick={handleSave}>Save Flutterwave Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stripe">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-public-key">Public Key</Label>
                <Input
                  id="stripe-public-key"
                  placeholder="Enter your Stripe public key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret-key">Secret Key</Label>
                <Input
                  id="stripe-secret-key"
                  type="password"
                  placeholder="Enter your Stripe secret key"
                />
              </div>
              <Button onClick={handleSave}>Save Stripe Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paypal">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input
                  id="paypal-client-id"
                  placeholder="Enter your PayPal client ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-secret">Secret</Label>
                <Input
                  id="paypal-secret"
                  type="password"
                  placeholder="Enter your PayPal secret"
                />
              </div>
              <Button onClick={handleSave}>Save PayPal Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentIntegrationPage;
