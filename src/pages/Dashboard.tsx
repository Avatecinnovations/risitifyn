import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  PieChart,
  Users,
  FileText,
  CreditCard,
  Settings,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

interface Invoice {
  id: string;
  client_id: string;
  clients?: {
    name: string;
  };
  total_amount: number;
  status: string;
  due_date: string;
  created_at: string;
}

interface DashboardStats {
  totalRevenue: number;
  pendingAmount: number;
  paidAmount: number;
  overdueAmount: number;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const StatCard = ({ title, value, change, positive }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1">
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    pendingAmount: 0,
    paidAmount: 0,
    overdueAmount: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Invoice[]>([]);
  const [upcomingInvoices, setUpcomingInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch all invoices for the user
      const { data: invoices, error } = await supabase
        .from("invoices")
        .select(
          `
          id,
          client_id,
          clients (name),
          total_amount,
          status,
          due_date,
          created_at
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate stats
      const stats = invoices.reduce(
        (acc, invoice) => {
          const amount = invoice.total_amount || 0;
          switch (invoice.status) {
            case "paid":
              acc.paidAmount += amount;
              acc.totalRevenue += amount;
              break;
            case "pending":
              acc.pendingAmount += amount;
              break;
            case "overdue":
              acc.overdueAmount += amount;
              break;
          }
          return acc;
        },
        {
          totalRevenue: 0,
          pendingAmount: 0,
          paidAmount: 0,
          overdueAmount: 0,
        }
      );

      // Get recent activities (last 5 invoices)
      const recentActivities = invoices.slice(0, 5);

      // Get upcoming invoices (due in next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const upcomingInvoices = invoices
        .filter(
          (invoice) =>
            invoice.status === "pending" &&
            new Date(invoice.due_date) <= thirtyDaysFromNow
        )
        .slice(0, 4);

      setStats(stats);
      setRecentActivities(recentActivities);
      setUpcomingInvoices(upcomingInvoices);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change="+12.5%"
          positive={true}
        />
        <StatCard
          title="Pending Invoices"
          value={formatCurrency(stats.pendingAmount)}
          change="-2.4%"
          positive={false}
        />
        <StatCard
          title="Paid Invoices"
          value={formatCurrency(stats.paidAmount)}
          change="+18.2%"
          positive={true}
        />
        <StatCard
          title="Overdue Invoices"
          value={formatCurrency(stats.overdueAmount)}
          change="-5.1%"
          positive={true}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="px-6 py-5">
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={`Invoice #${activity.id} ${activity.status}`}
                description={`Client: ${activity.clients?.name} - ${formatCurrency(activity.total_amount)}`}
                time={getTimeAgo(activity.created_at)}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              title="Create Invoice"
              icon={<FileText className="h-6 w-6" />}
              href="/invoices/new"
              color="bg-brand-primary"
            />
            <QuickAction
              title="Add Client"
              icon={<Users className="h-6 w-6" />}
              href="/clients/new"
              color="bg-brand-yellow"
            />
            <QuickAction
              title="Record Payment"
              icon={<CreditCard className="h-6 w-6" />}
              href="/payments/new"
              color="bg-brand-coral"
            />
            <QuickAction
              title="Generate Report"
              icon={<PieChart className="h-6 w-6" />}
              href="/reports/new"
              color="bg-brand-purple"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Invoices */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upcoming Invoices
          </h3>
          <Link
            to="/invoices"
            className="text-sm text-brand-primary font-medium hover:text-brand-primary/80"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingInvoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  id={invoice.id}
                  client={invoice.clients?.name || "Unknown"}
                  amount={formatCurrency(invoice.total_amount)}
                  dueDate={formatDate(invoice.due_date)}
                  status={invoice.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

const SidebarLink = ({
  icon,
  text,
  href,
  active = false,
}: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ title, description, time }: ActivityItemProps) => {
  return (
    <li className="bg-gray-50 px-4 py-3 rounded-lg">
      <div className="flex justify-between">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </li>
  );
};

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const QuickAction = ({ title, icon, href, color }: QuickActionProps) => {
  return (
    <Link
      to={href}
      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
    >
      <div className={`${color} p-3 rounded-lg text-white mr-3`}>{icon}</div>
      <div className="font-medium">{title}</div>
    </Link>
  );
};

interface InvoiceRowProps {
  id: string;
  client: string;
  amount: string;
  dueDate: string;
  status: string;
}

const InvoiceRow = ({
  id,
  client,
  amount,
  dueDate,
  status,
}: InvoiceRowProps) => {
  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-primary">
        <Link to={`/invoices/${id}`}>#{id}</Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {client}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {dueDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;
