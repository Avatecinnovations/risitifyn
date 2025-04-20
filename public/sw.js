// Service Worker for handling push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/logo192.png",
    badge: "/logo192.png",
    data: {
      url: data.url,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Handle push subscription
self.addEventListener("pushsubscriptionchange", function (event) {
  event.waitUntil(
    Promise.all([
      Promise.resolve(
        event.oldSubscription ? deleteSubscription(event.oldSubscription) : true
      ),
      Promise.resolve(
        event.newSubscription ? saveSubscription(event.newSubscription) : true
      ),
    ])
  );
});

// Helper function to delete subscription
async function deleteSubscription(subscription) {
  const response = await fetch("/api/push-subscriptions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });
  return response.ok;
}

// Helper function to save subscription
async function saveSubscription(subscription) {
  const response = await fetch("/api/push-subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscription: subscription.toJSON(),
    }),
  });
  return response.ok;
}

self.addEventListener("notificationclose", (event) => {
  // Handle notification close event if needed
  console.log("Notification closed:", event.notification);
});
