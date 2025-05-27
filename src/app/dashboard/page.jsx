export default function DashboardHomePage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Welcome to Your Dashboard
        </h1>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-500">1,234</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">New Orders</h2>
            <p className="text-3xl font-bold text-green-500">245</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Earnings</h2>
            <p className="text-3xl font-bold text-yellow-500">$12,400</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="text-gray-600">New user registered: <strong>John Doe</strong></li>
            <li className="text-gray-600">Order #9823 has been shipped</li>
            <li className="text-gray-600">Feedback received from <strong>Anna</strong></li>
          </ul>
        </div>

        {/* Performance Summary */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gray-600 mb-1">Bounce Rate</p>
              <p className="text-2xl font-bold text-red-500">34.2%</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Avg. Session Time</p>
              <p className="text-2xl font-bold text-green-500">3m 45s</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-500">5.8%</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">System Status</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-medium">Operational</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">API Server</span>
              <span className="text-green-600 font-medium">Running</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Email Service</span>
              <span className="text-yellow-500 font-medium">Degraded</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
