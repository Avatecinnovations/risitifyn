import React from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-gray-600">Active Quotes</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Create New Quote
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Add New Client
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
