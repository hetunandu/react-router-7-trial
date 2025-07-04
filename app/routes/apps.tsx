import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Navigation } from '../components/Navigation';
import { fetchApps, searchApps } from '../services/appsApi';
import type { App } from '../services/appsApi';

function AppCard({ app }: { app: App }) {
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

  return (
    <Link
      to={`/apps/${app.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{app.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
              <p className="text-sm text-gray-500">v{app.version}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
            {app.status}
          </span>
        </div>
        
        <p className="text-gray-600 mt-3 line-clamp-2">{app.description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="mr-1">📁</span>
              {app.category}
            </span>
            <span className="flex items-center">
              <span className="mr-1">⭐</span>
              {app.rating}
            </span>
            <span className="flex items-center">
              <span className="mr-1">⬇️</span>
              {formatNumber(app.downloads)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            Updated {new Date(app.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

function AppsContent() {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(function loadApps() {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchApps();
        setApps(data);
      } catch (err) {
        setError('Failed to load apps. Please try again.');
        console.error('Error fetching apps:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  useEffect(function handleSearch() {
    async function performSearch() {
      if (!searchQuery.trim()) {
        try {
          setIsSearching(true);
          const data = await fetchApps();
          setApps(data);
        } catch (err) {
          setError('Failed to load apps. Please try again.');
        } finally {
          setIsSearching(false);
        }
        return;
      }

      try {
        setIsSearching(true);
        setError('');
        const results = await searchApps(searchQuery);
        setApps(results);
      } catch (err) {
        setError('Search failed. Please try again.');
        console.error('Error searching apps:', err);
      } finally {
        setIsSearching(false);
      }
    }

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Apps</h1>
          <p className="text-gray-600 mb-6">Discover and manage your applications</p>
          
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {apps.length === 0 && !isLoading && !isSearching ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No apps found matching your search.' : 'No apps available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Apps() {
  return (
    <ProtectedRoute>
      <AppsContent />
    </ProtectedRoute>
  );
} 