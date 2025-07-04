import { Navigation } from '../components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Demo App</h1>
            
            <div className="prose prose-lg text-gray-700 max-w-none">
              <p className="text-xl text-gray-600 mb-6">
                Welcome to our React Router 7 demo application showcasing modern authentication, 
                protected routes, and role-based access control.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>User authentication with localStorage-based demo auth</li>
                <li>Protected routes for authenticated users</li>
                <li>Admin-only sections with role-based access control</li>
                <li>Apps marketplace with search functionality</li>
                <li>Comprehensive settings management</li>
                <li>Responsive design with Tailwind CSS</li>
                <li>Modern React patterns with TypeScript</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Demo Credentials</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Admin User:</h3>
                <p className="text-sm text-gray-700">Email: admin@demo.com</p>
                <p className="text-sm text-gray-700">Password: admin123</p>
                
                <h3 className="font-semibold text-gray-900 mt-4 mb-2">Regular User:</h3>
                <p className="text-sm text-gray-700">Email: user@demo.com</p>
                <p className="text-sm text-gray-700">Password: user123</p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Technology Stack</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>React Router 7:</strong> Modern file-based routing</li>
                <li><strong>React 19:</strong> Latest React features</li>
                <li><strong>TypeScript:</strong> Type-safe development</li>
                <li><strong>Tailwind CSS:</strong> Utility-first styling</li>
                <li><strong>Vite:</strong> Fast development and build tool</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Application Structure</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold">Public Pages:</h3>
                  <p>Home and About pages are accessible without authentication.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Protected Pages:</h3>
                  <p>Apps and Settings require user authentication.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Admin Only:</h3>
                  <p>Admin Settings page is restricted to users with admin role.</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> This is a demonstration application. 
                  Authentication is implemented using localStorage for demo purposes only. 
                  In a production environment, you should implement proper server-side authentication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}