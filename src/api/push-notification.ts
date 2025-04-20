import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";

// Initialize web-push with VAPID keys
webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subscription, payload } = req.body;

    if (!subscription || !payload) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const notificationPayload: PushNotificationPayload = {
      title: payload.title,
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      data: payload.data,
    };

    await webpush.sendNotification(
      subscription,
      JSON.stringify(notificationPayload)
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending push notification:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
