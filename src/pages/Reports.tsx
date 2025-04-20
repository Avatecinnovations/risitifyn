
import { useState } from "react";
import { BarChart, LineChart, PieChart, AreaChart, ArrowDown, ArrowUp, Download, Filter, ChevronDown } from "lucide-react";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line
} from "recharts";

const Reports = () => {
  const [reportType, setReportType] = useState<string>("income");
  const [timeRange, setTimeRange] = useState<string>("month");

  const incomeData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
    { name: 'Jul', income: 3490, expenses: 4300 },
  ];

  const clientData = [
    { name: 'Acme Corp', value: 5300 },
    { name: 'Tech Solutions', value: 3200 },
    { name: 'Global Enterprises', value: 9600 },
    { name: 'Webdesign Pro', value: 1950 },
    { name: 'Other', value: 2800 },
  ];

  const invoiceData = [
    { name: 'Paid', value: 18300, color: '#13C296' },
    { name: 'Pending', value: 4950, color: '#FFC44E' },
    { name: 'Overdue', value: 1530, color: '#FF5F7A' },
  ];

  const COLORS = ['#13C296', '#FFC44E', '#FF5F7A', '#7B61FF', '#A3A3A3'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">Analyze your business performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="btn-secondary flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ReportCard 
            title="Total Revenue" 
            value="$24,780.00" 
            change="+12.5%" 
            increasing={true} 
            icon={<BarChart className="h-5 w-5 text-brand-primary" />} 
          />
          <ReportCard 
            title="Outstanding" 
            value="$6,480.00" 
            change="-2.4%" 
            increasing={false} 
            icon={<LineChart className="h-5 w-5 text-brand-yellow" />} 
          />
          <ReportCard 
            title="Total Clients" 
            value="24" 
            change="+4.2%" 
            increasing={true}
            icon={<PieChart className="h-5 w-5 text-brand-purple" />}  
          />
          <ReportCard 
            title="Invoices Sent" 
            value="128" 
            change="+18.2%" 
            increasing={true} 
            icon={<AreaChart className="h-5 w-5 text-brand-coral" />} 
          />
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Financial Overview</h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white">
                  <select 
                    className="appearance-none bg-transparent pr-6 focus:outline-none"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="income">Income vs Expenses</option>
                    <option value="invoices">Invoice Status</option>
                    <option value="clients">Revenue by Client</option>
                  </select>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
                <div className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white">
                  <select 
                    className="appearance-none bg-transparent pr-6 focus:outline-none"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-80">
              {reportType === "income" && (
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={incomeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#13C296" />
                    <Bar dataKey="expenses" name="Expenses" fill="#FFC44E" />
                  </ReBarChart>
                </ResponsiveContainer>
              )}
              
              {reportType === "invoices" && (
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={invoiceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {invoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              )}
              
              {reportType === "clients" && (
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={clientData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {clientData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Top Clients</h2>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                {clientData.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      >
                        <span className="text-white font-medium">{client.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                    <span className="font-bold">${client.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Payment Trends</h2>
            </div>
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart
                    data={incomeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="income" name="Revenue" stroke="#13C296" activeDot={{ r: 8 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  value: string;
  change: string;
  increasing: boolean;
  icon: React.ReactNode;
}

const ReportCard = ({ title, value, change, increasing, icon }: ReportCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div>{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 flex items-center">
        {increasing ? (
          <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
        )}
        <span className={`text-sm font-medium ${increasing ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last period</span>
      </div>
    </div>
  );
};

export default Reports;
