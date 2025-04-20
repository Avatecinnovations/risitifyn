import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  trend: "up" | "down";
  trendValue: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        {trend === "up" ? (
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
        )}
        <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
          {trendValue}
        </span>
        <span className="ml-1">{description}</span>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="2,850"
          description="from last month"
          icon={Users}
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Invoices"
          value="1,429"
          description="from last month"
          icon={FileText}
          trend="up"
          trendValue="+8.2%"
        />
        <StatCard
          title="Revenue"
          value="$48,250"
          description="from last month"
          icon={DollarSign}
          trend="down"
          trendValue="-4.5%"
        />
        <StatCard
          title="Growth"
          value="+25.5%"
          description="from last quarter"
          icon={TrendingUp}
          trend="up"
          trendValue="+15.2%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Overview of the latest system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "New user registration",
                  description: "John Doe signed up",
                  time: "2 minutes ago",
                },
                {
                  title: "Invoice generated",
                  description: "Invoice #1234 for $1,200",
                  time: "5 minutes ago",
                },
                {
                  title: "Payment received",
                  description: "Payment for Invoice #1232",
                  time: "10 minutes ago",
                },
                {
                  title: "User settings updated",
                  description: "Jane Smith updated profile",
                  time: "15 minutes ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md border p-4"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Active Users", value: "1,234" },
                { label: "Pending Invoices", value: "45" },
                { label: "Total Revenue", value: "$24,500" },
                { label: "Average Invoice", value: "$850" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <span className="text-sm font-medium">{stat.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
