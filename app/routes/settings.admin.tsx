import { useState } from 'react';
import { AdminRoute } from '../components/AdminRoute';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalApps: number;
  systemUptime: string;
  diskUsage: number;
  memoryUsage: number;
}

const MOCK_STATS: SystemStats = {
  totalUsers: 1247,
  activeUsers: 89,
  totalApps: 6,
  systemUptime: '15 days, 4 hours',
  diskUsage: 68,
  memoryUsage: 42,
};

function AdminSettingsContent() {
  const [stats] = useState<SystemStats>(MOCK_STATS);
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    automaticBackups: true,
    logLevel: 'info',
    maxFileSize: 10,
  });

  const handleSettingChange = (setting: string, value: boolean | string | number) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
  };

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-red-600';
    if (usage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Settings</h1>
          <p className="text-gray-600 mb-6">
            System administration and configuration options
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600">Total Users</h3>
              <p className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600">Active Users</h3>
              <p className="text-2xl font-bold text-green-900">{stats.activeUsers}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600">Total Apps</h3>
              <p className="text-2xl font-bold text-purple-900">{stats.totalApps}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">System Uptime</h3>
              <p className="text-lg font-bold text-gray-900">{stats.systemUptime}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Disk Usage</h3>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className={`h-2 rounded-full ${stats.diskUsage > 80 ? 'bg-red-500' : stats.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${stats.diskUsage}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getUsageColor(stats.diskUsage)}`}>
                  {stats.diskUsage}%
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Memory Usage</h3>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className={`h-2 rounded-full ${stats.memoryUsage > 80 ? 'bg-red-500' : stats.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${stats.memoryUsage}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getUsageColor(stats.memoryUsage)}`}>
                  {stats.memoryUsage}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Maintenance Mode
                    </h4>
                    <p className="text-sm text-gray-500">
                      Disable user access for system maintenance
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Allow User Registration
                    </h4>
                    <p className="text-sm text-gray-500">
                      Allow new users to create accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.allowRegistration}
                      onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500">
                      Send system notifications via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Automatic Backups
                    </h4>
                    <p className="text-sm text-gray-500">
                      Automatically backup system data daily
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.automaticBackups}
                      onChange={(e) => handleSettingChange('automaticBackups', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Log Level
                  </label>
                  <select
                    value={systemSettings.logLevel}
                    onChange={(e) => handleSettingChange('logLevel', e.target.value)}
                    className="block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warn">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum File Upload Size (MB)
                  </label>
                  <select
                    value={systemSettings.maxFileSize}
                    onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                    className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={5}>5 MB</option>
                    <option value={10}>10 MB</option>
                    <option value={25}>25 MB</option>
                    <option value={50}>50 MB</option>
                    <option value={100}>100 MB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <div className="space-x-3">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                  Clear System Logs
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  Generate Backup
                </button>
              </div>
              
              <div className="space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent System Events</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">System backup completed</span>
                <p className="text-sm text-gray-500">Automated daily backup • 2 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Success
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">User registration: john@example.com</span>
                <p className="text-sm text-gray-500">New user account created • 4 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Info
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">High memory usage detected</span>
                <p className="text-sm text-gray-500">Memory usage exceeded 80% • 6 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Warning
              </span>
            </div>
          </div>

          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  return (
    <AdminRoute>
      <AdminSettingsContent />
    </AdminRoute>
  );
} 