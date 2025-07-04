import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Navigation } from '../components/Navigation';
import { fetchAppById } from '../services/appsApi';
import type { App } from '../services/appsApi';

function AppDetailContent() {
  const { id } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function loadApp() {
    async function fetchData() {
      if (!id) {
        setError('App ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const data = await fetchAppById(id);
        
        if (!data) {
          setError('App not found');
        } else {
          setApp(data);
        }
      } catch (err) {
        setError('Failed to load app details. Please try again.');
        console.error('Error fetching app:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [id]);

  const getStatusColor = (status: App['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error || 'App not found'}</p>
            <Link
              to="/apps"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Back to Apps
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/apps"
            className="text-blue-600 hover:text-blue-500 font-medium flex items-center mb-4"
          >
            ← Back to Apps
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{app.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                  <p className="text-lg text-gray-500">Version {app.version}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {renderStars(app.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {app.rating} rating
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{app.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Advanced functionality and user-friendly interface</li>
                    <li>Cross-platform compatibility</li>
                    <li>Regular updates and security patches</li>
                    <li>24/7 customer support</li>
                    <li>Cloud synchronization</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Release Notes</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Version {app.version}</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Bug fixes and performance improvements</li>
                      <li>• Enhanced security features</li>
                      <li>• New user interface elements</li>
                      <li>• Updated dependencies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                        <dd className="text-sm text-gray-900">{app.category}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                        <dd className="text-sm text-gray-900">{formatNumber(app.downloads)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                        <dd className="text-sm text-gray-900">
                          {new Date(app.lastUpdated).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="text-sm text-gray-900 capitalize">{app.status}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      disabled={app.status !== 'active'}
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                        app.status === 'active'
                          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {app.status === 'active' ? 'Install App' : 'Not Available'}
                    </button>
                    
                    {app.status !== 'active' && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {app.status === 'maintenance' 
                          ? 'App is under maintenance' 
                          : 'App is currently inactive'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppDetail() {
  return (
    <ProtectedRoute>
      <AppDetailContent />
    </ProtectedRoute>
  );
} 