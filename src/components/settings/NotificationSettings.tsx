
import { useState } from "react";
import { Bell, Mail, MessageSquare, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    invoiceCreated: true,
    paymentReceived: true,
    invoiceReminders: true,
    quoteAccepted: true,
    newComments: false,
    weeklyReports: true,
    marketingUpdates: false
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    invoiceCreated: false,
    paymentReceived: true,
    invoiceReminders: false,
    quoteAccepted: true,
    newComments: true
  });
  
  const handleEmailToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key]
    });
  };
  
  const handlePushToggle = (key: keyof typeof pushNotifications) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: !pushNotifications[key]
    });
  };
  
  const handleSave = () => {
    toast.success("Notification settings saved successfully!");
  };
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="px-4 md:px-6">
        <CardTitle className="flex items-center text-lg md:text-xl">
          <Bell className="h-5 w-5 mr-2 text-gray-500" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Manage how and when you receive notifications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div>
          <h3 className="text-md font-medium mb-3 md:mb-4 flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            Email Notifications
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Invoice Created</p>
                <p className="text-xs md:text-sm text-gray-500">Receive an email when a new invoice is created</p>
              </div>
              <Switch 
                checked={emailNotifications.invoiceCreated}
                onCheckedChange={() => handleEmailToggle('invoiceCreated')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Payment Received</p>
                <p className="text-xs md:text-sm text-gray-500">Receive an email when a payment is recorded</p>
              </div>
              <Switch 
                checked={emailNotifications.paymentReceived}
                onCheckedChange={() => handleEmailToggle('paymentReceived')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Invoice Reminders</p>
                <p className="text-xs md:text-sm text-gray-500">Get notified when reminders are sent to clients</p>
              </div>
              <Switch 
                checked={emailNotifications.invoiceReminders}
                onCheckedChange={() => handleEmailToggle('invoiceReminders')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Quote Accepted</p>
                <p className="text-xs md:text-sm text-gray-500">Receive an email when a client accepts a quote</p>
              </div>
              <Switch 
                checked={emailNotifications.quoteAccepted}
                onCheckedChange={() => handleEmailToggle('quoteAccepted')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">New Comments</p>
                <p className="text-xs md:text-sm text-gray-500">Get notified when clients leave comments</p>
              </div>
              <Switch 
                checked={emailNotifications.newComments}
                onCheckedChange={() => handleEmailToggle('newComments')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Weekly Reports</p>
                <p className="text-xs md:text-sm text-gray-500">Receive weekly summary of activity</p>
              </div>
              <Switch 
                checked={emailNotifications.weeklyReports}
                onCheckedChange={() => handleEmailToggle('weeklyReports')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Marketing Updates</p>
                <p className="text-xs md:text-sm text-gray-500">Receive updates about new features and tips</p>
              </div>
              <Switch 
                checked={emailNotifications.marketingUpdates}
                onCheckedChange={() => handleEmailToggle('marketingUpdates')}
              />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 md:pt-6">
          <h3 className="text-md font-medium mb-3 md:mb-4 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
            Push Notifications
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Invoice Created</p>
                <p className="text-xs md:text-sm text-gray-500">Receive a notification when a new invoice is created</p>
              </div>
              <Switch 
                checked={pushNotifications.invoiceCreated}
                onCheckedChange={() => handlePushToggle('invoiceCreated')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Payment Received</p>
                <p className="text-xs md:text-sm text-gray-500">Receive a notification when a payment is recorded</p>
              </div>
              <Switch 
                checked={pushNotifications.paymentReceived}
                onCheckedChange={() => handlePushToggle('paymentReceived')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Invoice Reminders</p>
                <p className="text-xs md:text-sm text-gray-500">Get notified when reminders are sent to clients</p>
              </div>
              <Switch 
                checked={pushNotifications.invoiceReminders}
                onCheckedChange={() => handlePushToggle('invoiceReminders')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Quote Accepted</p>
                <p className="text-xs md:text-sm text-gray-500">Receive a notification when a client accepts a quote</p>
              </div>
              <Switch 
                checked={pushNotifications.quoteAccepted}
                onCheckedChange={() => handlePushToggle('quoteAccepted')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">New Comments</p>
                <p className="text-xs md:text-sm text-gray-500">Get notified when clients leave comments</p>
              </div>
              <Switch 
                checked={pushNotifications.newComments}
                onCheckedChange={() => handlePushToggle('newComments')}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 md:p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800">Push Notifications</h3>
              <p className="mt-1 text-xs md:text-sm text-amber-700">
                Push notifications require browser permission. You may need to allow notifications 
                in your browser settings for this website.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 md:pt-6">
          <h3 className="text-md font-medium mb-3 md:mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            Notification Schedule
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">Quiet Hours</p>
                <p className="text-xs md:text-sm text-gray-500">Don't send notifications during selected hours</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm text-gray-500 mb-1">Start Time</label>
                <input 
                  type="time" 
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  defaultValue="22:00" 
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-500 mb-1">End Time</label>
                <input 
                  type="time" 
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  defaultValue="07:00" 
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t px-4 py-3 md:px-6 md:py-4">
        <Button onClick={handleSave} className="ml-auto">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
