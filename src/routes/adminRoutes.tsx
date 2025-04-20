import { RouteObject } from "react-router-dom";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          // Add more admin routes here as they are created
          {
            path: "users",
            lazy: async () => {
              const { default: Users } = await import("@/pages/admin/Users");
              return { element: <Users /> };
            },
          },
          {
            path: "invoices",
            lazy: async () => {
              const { default: Invoices } = await import(
                "@/pages/admin/Invoices"
              );
              return { element: <Invoices /> };
            },
          },
          {
            path: "reports",
            lazy: async () => {
              const { default: Reports } = await import(
                "@/pages/admin/Reports"
              );
              return { element: <Reports /> };
            },
          },
          {
            path: "settings",
            lazy: async () => {
              const { default: Settings } = await import(
                "@/pages/admin/Settings"
              );
              return { element: <Settings /> };
            },
          },
        ],
      },
    ],
  },
];
