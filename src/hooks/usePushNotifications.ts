import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);
  }, []);

  useEffect(() => {
    if (isSupported) {
      checkSubscription();
    }
  }, [isSupported]);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setSubscription(subscription);
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
      });

      // Save subscription to Supabase
      const { error } = await supabase.from("push_subscriptions").upsert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        subscription: subscription.toJSON(),
      });

      if (error) throw error;

      setSubscription(subscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      throw error;
    }
  };

  const unsubscribe = async () => {
    try {
      if (!subscription) return;

      await subscription.unsubscribe();

      // Remove subscription from Supabase
      const { error } = await supabase
        .from("push_subscriptions")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      setSubscription(null);
      setIsSubscribed(false);
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      throw error;
    }
  };

  return {
    isSupported,
    isSubscribed,
    subscribe,
    unsubscribe,
  };
};
