import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "sonner";
import { supabase } from "./integrations/supabase/client";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import NewClient from "./pages/NewClient";
import Quotes from "./pages/Quotes";
import CreateQuote from "./pages/CreateQuote";
import QuotePreview from "./pages/QuotePreview";
import Reports from "./pages/Reports";
import Security from "./pages/Security";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import NotFound from "./pages/NotFound";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import PaymentIntegration from "./pages/PaymentIntegration";
import SettingsPage from "./pages/SettingsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import ZohoLayout from "./components/layouts/ZohoLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminInvoices from "@/pages/admin/Invoices";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";
import AgedBalance from "@/pages/AgedBalance";
import InvoiceDetails from "@/pages/InvoiceDetails";
import TemplateEditorPage from "./pages/TemplateEditorPage";
import PaymentIntegrationPage from "./pages/PaymentIntegrationPage";
import Organizations from "./pages/settings/Organizations";
import NewOrganization from "./pages/settings/NewOrganization";
import Organization from "./pages/settings/Organization";
import TaxSettings from "@/components/settings/TaxSettings";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Admin routes */}
          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Protected routes with ZohoLayout */}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route element={<ZohoLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/new" element={<NewClient />} />
              <Route path="/clients/aged-balance" element={<AgedBalance />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/new" element={<CreateInvoice />} />
              <Route path="/invoices/:id" element={<InvoiceDetails />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/quotes/new" element={<CreateQuote />} />
              <Route path="/quotes/:id" element={<QuotePreview />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />}>
                <Route index element={<Organizations />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="organizations/new" element={<NewOrganization />} />
                <Route path="organizations/:id" element={<Organization />} />
                <Route path="tax" element={<TaxSettings />} />
                <Route path="templates" element={<TemplateEditorPage />} />
                <Route path="payment" element={<PaymentIntegrationPage />} />
              </Route>
              <Route path="/payment-history" element={<PaymentHistoryPage />} />
              <Route
                path="/payment-integration"
                element={<PaymentIntegration />}
              />
              <Route path="/security" element={<Security />} />
              <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
            </Route>
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
