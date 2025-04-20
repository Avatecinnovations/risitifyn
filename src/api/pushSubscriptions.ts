import { supabase } from "@/integrations/supabase/client";

export async function savePushSubscription(subscription: PushSubscriptionJSON) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("push_subscriptions").upsert({
    user_id: user.id,
    endpoint: subscription.endpoint,
    keys: subscription.keys,
    created_at: new Date().toISOString(),
  });

  if (error) throw error;
  return data;
}

export async function deletePushSubscription(endpoint: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("push_subscriptions").delete().match({
    user_id: user.id,
    endpoint,
  });

  if (error) throw error;
}

export async function getPushSubscriptions() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  return data;
}
