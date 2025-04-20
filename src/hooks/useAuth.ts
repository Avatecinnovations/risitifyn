import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ExtendedUser } from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            company_name: profile.company_name,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            postal_code: profile.postal_code,
            country: profile.country,
            phone: profile.phone,
            website: profile.website,
            logo_url: profile.logo_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            company_name: profile.company_name,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            postal_code: profile.postal_code,
            country: profile.country,
            phone: profile.phone,
            website: profile.website,
            logo_url: profile.logo_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}
