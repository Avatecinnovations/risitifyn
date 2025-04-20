import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// User role definitions
export type UserRole = "admin" | "accountant" | "client" | "regular";

// Extended user interface to include additional properties
interface ExtendedUser {
  id: string;
  email: string;
  role: UserRole;
  businessName: string;
  currency: string;
  industry: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  website: string;
  logo_url: string;
  name: string;
  user_metadata?: {
    email?: string;
    role?: UserRole;
    businessName?: string;
    currency?: string;
    industry?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    phone?: string;
    website?: string;
    logo_url?: string;
    name?: string;
  };
}

interface AuthContextProps {
  session: Session | null;
  user: ExtendedUser | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
  updateUserProfile: (profileData: Partial<ExtendedUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  isAdmin: false,
  userRole: null,
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (adminLoggedIn) {
      // Create a mock user and session for admin
      const mockUser: ExtendedUser = {
        id: "admin-user",
        email: "",
        role: "admin",
        businessName: "",
        currency: "",
        industry: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
        website: "",
        logo_url: "",
        name: "",
      };

      setUser(mockUser);
      setIsAdmin(true);
      setUserRole("admin");
      setLoading(false);
      return;
    }

    // For regular users, set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        try {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
            setUser(null);
            return;
          }

          setUser({
            ...session.user,
            role: profile.role || "user",
          });
        } catch (error) {
          console.error("Error in auth state change:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    // Check for existing session
    const checkSession = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (currentSession?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", currentSession.user.id)
            .single();

          setUser({
            ...currentSession.user,
            role: profile?.role || "user",
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateUserProfile = async (data: Partial<ExtendedUser>) => {
    try {
      if (!user) throw new Error("No user logged in");

      // First update the user's email if it's changed
      if (data.email && data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email,
        });
        if (emailError) throw emailError;
      }

      // Then update the metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          ...data,
          name: data.name ?? user.user_metadata?.name,
          email: data.email ?? user.user_metadata?.email,
          phone: data.phone ?? user.user_metadata?.phone,
        },
      });

      if (metadataError) throw metadataError;

      // Refresh the user data
      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();
      if (updatedUser) {
        setUser({
          ...updatedUser,
          role: updatedUser.user_metadata?.role,
          businessName: updatedUser.user_metadata?.businessName,
          currency: updatedUser.user_metadata?.currency,
          industry: updatedUser.user_metadata?.industry,
          address: updatedUser.user_metadata?.address,
          city: updatedUser.user_metadata?.city,
          state: updatedUser.user_metadata?.state,
          postal_code: updatedUser.user_metadata?.postal_code,
          country: updatedUser.user_metadata?.country,
          phone: updatedUser.user_metadata?.phone,
          website: updatedUser.user_metadata?.website,
          logo_url: updatedUser.user_metadata?.logo_url,
          name: updatedUser.user_metadata?.name,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const signOut = async () => {
    // Check if it's an admin logout
    if (isAdmin) {
      localStorage.removeItem("isAdminLoggedIn");
      setUser(null);
      setIsAdmin(false);
      setUserRole(null);
      return;
    }

    // Regular Supabase logout
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signOut,
        loading,
        isAdmin,
        userRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
