import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// User role definitions
export type UserRole = "admin" | "accountant" | "client" | "regular";

// Extended user interface to include additional properties
interface ExtendedUser extends User {
  isAdmin?: boolean;
  role?: UserRole;
  businessName?: string;
  currency?: string;
  industry?: string;
  onboardingCompleted?: boolean;
}

interface AuthContextProps {
  session: Session | null;
  user: ExtendedUser | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
  onboardingCompleted: boolean;
  updateUserProfile: (profileData: Partial<ExtendedUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  isAdmin: false,
  userRole: null,
  onboardingCompleted: false,
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    console.log("AuthProvider: Initializing auth state");

    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (adminLoggedIn) {
      console.log("AuthProvider: Admin user detected");
      // Create a mock user and session for admin
      const mockUser: ExtendedUser = {
        id: "admin-user",
        app_metadata: {},
        user_metadata: {
          role: "admin",
          onboardingCompleted: true,
        },
        aud: "authenticated",
        created_at: "",
        isAdmin: true,
        role: "admin",
        onboardingCompleted: true,
      };

      setUser(mockUser);
      setIsAdmin(true);
      setUserRole("admin");
      setOnboardingCompleted(true);
      setLoading(false);
      return;
    }

    // For regular users, set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("AuthProvider: Auth state changed", event, newSession);
      setSession(newSession);

      if (newSession?.user) {
        console.log("AuthProvider: User session found");
        const extendedUser: ExtendedUser = {
          ...newSession.user,
          role: (newSession.user.user_metadata?.role as UserRole) || "regular",
          onboardingCompleted:
            newSession.user.user_metadata?.onboardingCompleted || false,
          businessName: newSession.user.user_metadata?.businessName,
          currency: newSession.user.user_metadata?.currency,
          industry: newSession.user.user_metadata?.industry,
        };
        setUser(extendedUser);
        setUserRole(extendedUser.role || null);
        setOnboardingCompleted(!!extendedUser.onboardingCompleted);
      } else {
        console.log("AuthProvider: No user session");
        setUser(null);
        setUserRole(null);
        setOnboardingCompleted(false);
      }

      setIsAdmin(false);
      setLoading(false);
    });

    // Check for existing session
    const checkSession = async () => {
      try {
        console.log("AuthProvider: Checking existing session");
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        console.log("AuthProvider: Current session", currentSession);

        setSession(currentSession);

        if (currentSession?.user) {
          console.log("AuthProvider: Found existing user session");
          const extendedUser: ExtendedUser = {
            ...currentSession.user,
            role:
              (currentSession.user.user_metadata?.role as UserRole) ||
              "regular",
            onboardingCompleted:
              currentSession.user.user_metadata?.onboardingCompleted || false,
            businessName: currentSession.user.user_metadata?.businessName,
            currency: currentSession.user.user_metadata?.currency,
            industry: currentSession.user.user_metadata?.industry,
          };
          setUser(extendedUser);
          setUserRole(extendedUser.role || null);
          setOnboardingCompleted(!!extendedUser.onboardingCompleted);
        } else {
          console.log("AuthProvider: No existing user session");
          setUser(null);
          setUserRole(null);
          setOnboardingCompleted(false);
        }
      } catch (error) {
        console.error("AuthProvider: Error checking session", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      console.log("AuthProvider: Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  // ... rest of the code ...
};
