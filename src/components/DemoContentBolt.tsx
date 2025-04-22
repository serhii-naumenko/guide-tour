import React from "react";
import {
  LayoutDashboard,
  User,
  Bell,
  Settings,
  Search,
  Plus,
  Home,
  FileText,
  Users,
  Calendar,
} from "lucide-react";

const DemoContent: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Demo App</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            type="button"
            id="dashboard-button"
            className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </button>

          <button
            type="button"
            id="profile-button"
            className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <User className="mr-3" size={20} />
            Profile
          </button>

          <button
            type="button"
            id="notifications-button"
            className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Bell className="mr-3" size={20} />
            Notifications
          </button>

          <button
            type="button"
            id="settings-button"
            className="flex items-center p-3 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Settings className="mr-3" size={20} />
            Settings
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              title="bell"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <span className="font-medium text-sm">JS</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              Create New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Stat cards */}
            {[
              {
                title: "Total Users",
                value: "2,543",
                icon: <Users size={20} className="text-blue-500" />,
              },
              {
                title: "New Posts",
                value: "45",
                icon: <FileText size={20} className="text-green-500" />,
              },
              {
                title: "Active Sessions",
                value: "223",
                icon: <Users size={20} className="text-purple-500" />,
              },
              {
                title: "Upcoming Events",
                value: "5",
                icon: <Calendar size={20} className="text-yellow-500" />,
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </h3>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Content panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              {/* Activity list */}
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start pb-4 border-b border-gray-100"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        User {index + 1} completed an action
                      </p>
                      <p className="text-xs text-gray-500">
                        {index + 1} hour{index !== 0 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Create Report",
                    icon: <FileText size={18} className="text-blue-500" />,
                  },
                  {
                    name: "View Team",
                    icon: <Users size={18} className="text-purple-500" />,
                  },
                  {
                    name: "Schedule Meeting",
                    icon: <Calendar size={18} className="text-yellow-500" />,
                  },
                  {
                    name: "Go to Homepage",
                    icon: <Home size={18} className="text-green-500" />,
                  },
                ].map((action, index) => (
                  <button
                    type="button"
                    key={index}
                    className="flex items-center w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="mr-3">{action.icon}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {action.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DemoContent;
