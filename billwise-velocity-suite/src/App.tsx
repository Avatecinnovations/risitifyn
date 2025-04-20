import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Quotes from "./pages/Quotes";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Security from "./pages/Security";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import MyStore from "./pages/MyStore";
import SalesOverview from "./pages/SalesOverview";
import Accounting from "./pages/Accounting";
import Discounts from "./pages/Discounts";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import PaymentIntegration from "./pages/PaymentIntegration";
import SettingsPage from "./pages/SettingsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected routes with DashboardLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/new" element={<CreateInvoice />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/payment-history" element={<PaymentHistoryPage />} />
            <Route
              path="/payment-integration"
              element={<PaymentIntegration />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/security" element={<Security />} />
            <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
            <Route path="/my-store" element={<MyStore />} />
            <Route path="/sales-overview" element={<SalesOverview />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/discounts" element={<Discounts />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Onboarding and not found */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
