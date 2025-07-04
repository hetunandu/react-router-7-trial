import { useState } from 'react';

interface AuthProvider {
  id: string;
  name: string;
  enabled: boolean;
  configured: boolean;
}

const AUTH_PROVIDERS: AuthProvider[] = [
  { id: 'google', name: 'Google OAuth', enabled: true, configured: true },
  { id: 'github', name: 'GitHub OAuth', enabled: false, configured: true },
  { id: 'microsoft', name: 'Microsoft Azure', enabled: false, configured: false },
  { id: 'discord', name: 'Discord OAuth', enabled: false, configured: false },
];

export default function AuthSettings() {
  const [providers, setProviders] = useState<AuthProvider[]>(AUTH_PROVIDERS);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    lockoutAttempts: 5,
  });

  const toggleProvider = (id: string) => {
    setProviders(providers.map(provider => 
      provider.id === id 
        ? { ...provider, enabled: !provider.enabled }
        : provider
    ));
  };

  const handleSecuritySettingChange = (setting: string, value: boolean | number) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Settings</h1>
          <p className="text-gray-600 mb-6">
            Configure authentication methods and security policies
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">OAuth Providers</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enable or disable external authentication providers
              </p>
              
              <div className="space-y-3">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {provider.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {provider.configured ? 'Configured' : 'Not configured'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {!provider.configured && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Configure
                        </button>
                      )}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={provider.enabled}
                          onChange={() => toggleProvider(provider.id)}
                          disabled={!provider.configured}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-500">
                      Require 2FA for all user accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) => handleSecuritySettingChange('twoFactorEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Require Special Characters
                    </h4>
                    <p className="text-sm text-gray-500">
                      Passwords must contain special characters
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireSpecialChars}
                      onChange={(e) => handleSecuritySettingChange('requireSpecialChars', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={480}>8 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Password Length
                  </label>
                  <select
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => handleSecuritySettingChange('passwordMinLength', parseInt(e.target.value))}
                    className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={6}>6 characters</option>
                    <option value={8}>8 characters</option>
                    <option value={10}>10 characters</option>
                    <option value={12}>12 characters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Lockout Attempts
                  </label>
                  <select
                    value={securitySettings.lockoutAttempts}
                    onChange={(e) => handleSecuritySettingChange('lockoutAttempts', parseInt(e.target.value))}
                    className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={3}>3 attempts</option>
                    <option value={5}>5 attempts</option>
                    <option value={10}>10 attempts</option>
                    <option value={0}>Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
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

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
          <p className="text-sm text-gray-600 mb-4">
            View and manage active user sessions
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">Current Session</span>
                <p className="text-sm text-gray-500">Chrome on macOS • IP: 192.168.1.100</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">Mobile App</span>
                <p className="text-sm text-gray-500">iOS App • Last seen 2 hours ago</p>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>

          <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium">
            Revoke All Sessions
          </button>
        </div>
      </div>
    </div>
  );
} 