import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ExtendedUser } from "@/types/auth";

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, any>;
}

class PushNotificationService {
  private static instance: PushNotificationService;

  private constructor() {}

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  async sendNotification(user: ExtendedUser, payload: PushNotificationPayload) {
    try {
      if (!user.id) {
        throw new Error("User ID is required");
      }

      // Get the user's push subscription
      const { data: subscription, error: subscriptionError } = await supabase
        .from("push_subscriptions")
        .select("subscription")
        .eq("user_id", user.id)
        .single();

      if (subscriptionError) {
        throw new Error(
          `Error getting push subscription: ${subscriptionError.message}`
        );
      }

      if (!subscription) {
        console.warn("No push subscription found for user:", user.id);
        return false;
      }

      // Send the notification using the Web Push API
      const response = await fetch("/api/push-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription.subscription,
          payload,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send push notification: ${response.statusText}`
        );
      }

      return true;
    } catch (error) {
      console.error("Error sending push notification:", error);
      toast.error("Failed to send push notification");
      return false;
    }
  }

  async sendInvoiceNotification(
    user: ExtendedUser,
    invoiceId: string,
    action: "created" | "updated" | "paid"
  ) {
    const actions = {
      created: "New invoice created",
      updated: "Invoice updated",
      paid: "Invoice paid",
    };

    return this.sendNotification(user, {
      title: actions[action],
      body: `Invoice #${invoiceId} has been ${action}`,
      icon: "/logo.png",
      data: {
        type: "invoice",
        invoiceId,
        action,
      },
    });
  }

  async sendPaymentNotification(
    user: ExtendedUser,
    invoiceId: string,
    amount: number
  ) {
    return this.sendNotification(user, {
      title: "Payment Received",
      body: `Payment of $${amount} received for invoice #${invoiceId}`,
      icon: "/logo.png",
      data: {
        type: "payment",
        invoiceId,
        amount,
      },
    });
  }

  async requestPermission(): Promise<PushSubscription | null> {
    try {
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service workers are not supported");
      }

      if (!("PushManager" in window)) {
        throw new Error("Push notifications are not supported");
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for notifications");
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
      });

      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");

      return {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: p256dh
            ? btoa(
                String.fromCharCode.apply(
                  null,
                  Array.from(new Uint8Array(p256dh))
                )
              )
            : "",
          auth: auth
            ? btoa(
                String.fromCharCode.apply(
                  null,
                  Array.from(new Uint8Array(auth))
                )
              )
            : "",
        },
      };
    } catch (error) {
      console.error("Error requesting push notification permission:", error);
      toast.error("Failed to enable push notifications");
      return null;
    }
  }
}

export const pushNotificationService = PushNotificationService.getInstance();
