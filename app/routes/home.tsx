import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Navigation } from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo App - React Router 7" },
    { name: "description", content: "Welcome to our React Router 7 Demo App!" },
  ];
}

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Welcome to Demo App
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            A modern React Router 7 application showcasing authentication, 
            protected routes, and role-based access control.
          </p>
          
          {isAuthenticated ? (
            <div className="mt-8">
              <p className="text-lg text-gray-700 mb-6">
                Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>!
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/apps"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Apps
                </Link>
                <Link
                  to="/settings"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Settings
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Or explore our <Link to="/about" className="text-blue-600 hover:text-blue-500">About page</Link> to learn more
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              Demo authentication system with role-based access control and protected routes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Apps Marketplace</h3>
            <p className="text-gray-600">
              Browse and manage applications with search functionality and detailed views.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Management</h3>
            <p className="text-gray-600">
              Comprehensive settings for deployment, authentication, and admin controls.
            </p>
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Try the Demo</h3>
            <p className="text-blue-800 mb-4">
              Use these demo credentials to explore the full application:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded">
                <h4 className="font-medium text-gray-900">Admin User</h4>
                <p className="text-gray-600">admin@demo.com / admin123</p>
              </div>
              <div className="bg-white p-3 rounded">
                <h4 className="font-medium text-gray-900">Regular User</h4>
                <p className="text-gray-600">user@demo.com / user123</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
