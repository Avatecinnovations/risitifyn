
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Key, Lock, Eye } from "lucide-react";

const SecurityPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Security</h1>
        <Button>Update Security Settings</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-6 w-6 text-brand-primary mr-3" />
              <h3 className="text-lg font-medium">Account Protection</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Enhance your account security with additional layers of protection.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Login History</h4>
                  <p className="text-sm text-gray-500">View recent account access</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Key className="h-6 w-6 text-brand-primary mr-3" />
              <h3 className="text-lg font-medium">Password Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Regularly update your password to maintain account security.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Change Password</h4>
                  <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Password Strength</h4>
                  <p className="text-sm text-gray-500">Your password is strong</p>
                </div>
                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-5/6"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-brand-primary mr-3" />
              <h3 className="text-lg font-medium">Privacy Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage how your information is used and shared.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Sharing</h4>
                  <p className="text-sm text-gray-500">Control how your data is shared</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Privacy Policy</h4>
                  <p className="text-sm text-gray-500">Review our privacy policy</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Download Your Data</h4>
                  <p className="text-sm text-gray-500">Get a copy of all your data</p>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
