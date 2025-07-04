import { Outlet, Link, useLocation } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';

function SettingsNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}

function SettingsContent() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const isSettingsRoot = location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Settings
                </h3>
              </div>
              
              <SettingsNavLink to="/settings/deployment">
                <span className="mr-3">🚀</span>
                Deployment
              </SettingsNavLink>
              
              <SettingsNavLink to="/settings/auth">
                <span className="mr-3">🔐</span>
                Authentication
              </SettingsNavLink>
              
              {isAdmin && (
                <SettingsNavLink to="/settings/admin">
                  <span className="mr-3">⚙️</span>
                  Admin Settings
                </SettingsNavLink>
              )}
            </nav>
          </aside>

          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {isSettingsRoot ? (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                  <p className="text-gray-600 mb-6">
                    Manage your application settings and preferences.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Link
                      to="/settings/deployment"
                      className="group rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🚀</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                            Deployment Settings
                          </h3>
                          <p className="text-sm text-gray-500">
                            Configure deployment environments and variables
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/settings/auth"
                      className="group rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🔐</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                            Authentication Settings
                          </h3>
                          <p className="text-sm text-gray-500">
                            Manage user authentication and security
                          </p>
                        </div>
                      </div>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/settings/admin"
                        className="group rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">⚙️</span>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                              Admin Settings
                            </h3>
                            <p className="text-sm text-gray-500">
                              System administration and configuration
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
} 