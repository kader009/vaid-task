'use client';
import { useAuth } from '@/hooks/useAuth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const ordersData = [
  { month: 'Jan', orders: 320 },
  { month: 'Feb', orders: 280 },
  { month: 'Mar', orders: 350 },
  { month: 'Apr', orders: 400 },
  { month: 'May', orders: 370 },
];

const usersData = [
  { name: 'Admin', value: 10 },
  { name: 'Customer', value: 80 },
  { name: 'Guest', value: 30 },
];

const COLORS = ['#4B5563', '#3B82F6', '#9CA3AF'];

export default function DashboardHomePage() {
  useAuth()
  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-gray-800">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              New Orders
            </h2>
            <p className="text-3xl font-bold text-gray-800">245</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Earnings</h2>
            <p className="text-3xl font-bold text-gray-800">$12,400</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart - Monthly Orders */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Monthly Orders
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - User Types */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              User Types
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={usersData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {usersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            System Status
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center justify-between">
              <span>Database</span>
              <span className="font-medium">Operational</span>
            </li>
            <li className="flex items-center justify-between">
              <span>API Server</span>
              <span className="font-medium">Running</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Email Service</span>
              <span className="font-medium">Degraded</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Payment Gateway</span>
              <span className="font-medium">Operational</span>
            </li>
            <li className="flex items-center justify-between">
              <span>File Storage</span>
              <span className="font-medium">Down</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
