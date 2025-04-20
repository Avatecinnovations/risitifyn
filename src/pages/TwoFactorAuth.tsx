import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_LOGO, APP_LOGO_ALT } from "@/lib/constants";

const TwoFactorAuth = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // In a real implementation, this would come from the auth flow
  const email = location.state?.email || "your email";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This is a placeholder. In a real implementation,
      // you would verify the code with your auth provider
      if (code.length < 6) {
        throw new Error("Invalid verification code");
      }

      // Simulate a verification delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully verified!");

      // Redirect to the dashboard or intended page
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center">
            <img src={APP_LOGO} alt={APP_LOGO_ALT} className="h-10 w-10" />
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="mx-auto bg-brand-50 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
            </div>
            <CardTitle className="text-xl text-center">
              Verification Required
            </CardTitle>
            <CardDescription className="text-center">
              We've sent a verification code to {email}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter 6-digit code</Label>
                <Input
                  id="code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="text-center text-xl tracking-widest"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-gray-500 text-center">
                  The code will expire in 10 minutes
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading || code.length !== 6}
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>

              <div className="text-center text-sm space-y-2">
                <p className="text-gray-500">Didn't receive the code?</p>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  disabled={loading}
                >
                  Resend code
                </Button>
              </div>

              <Link
                to="/login"
                className="text-sm text-gray-600 hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
