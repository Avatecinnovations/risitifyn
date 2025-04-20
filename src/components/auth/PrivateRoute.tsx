import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, loading, isAdmin, userRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-brand-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if the path is an admin route
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard/team") ||
    location.pathname.startsWith("/dashboard/clients") ||
    location.pathname.startsWith("/dashboard/today") ||
    location.pathname.startsWith("/dashboard/transactions") ||
    location.pathname.startsWith("/dashboard/invoices") ||
    location.pathname.startsWith("/dashboard/reminders") ||
    location.pathname.startsWith("/dashboard/aged-balance") ||
    location.pathname.startsWith("/dashboard/settings/") ||
    location.pathname.startsWith("/dashboard/company/");

  // Check if the path is an accountant route
  const isAccountantRoute = location.pathname.startsWith("/accountant");

  // Check if the path is a client portal route
  const isClientRoute = location.pathname.startsWith("/client-portal");

  // Check if 2FA is required
  const requires2FA = user && !isAdmin && location.pathname !== "/2fa" && false;

  if (requires2FA) {
    return (
      <Navigate
        to="/2fa"
        state={{ from: location, email: user.email }}
        replace
      />
    );
  }

  // For admin routes, only allow access to admin users
  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // For accountant routes, allow only accountants and admins
  if (isAccountantRoute && userRole !== "accountant" && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For client portal routes, allow only clients, accountants, and admins
  if (
    isClientRoute &&
    userRole !== "client" &&
    userRole !== "accountant" &&
    !isAdmin
  ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For regular routes, allow access to authenticated users based on their role
  if (
    (user && !isAdminRoute && !isAccountantRoute && !isClientRoute) ||
    (isAdmin && isAdminRoute) ||
    (userRole === "accountant" && (isAccountantRoute || isClientRoute)) ||
    (userRole === "client" && isClientRoute)
  ) {
    return <>{children}</>;
  }

  // Redirect unauthenticated users to the appropriate login page
  if (isAdminRoute) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
