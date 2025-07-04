import { useState } from 'react';

interface DeploymentEnvironment {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
  lastDeployed: string;
}

const MOCK_ENVIRONMENTS: DeploymentEnvironment[] = [
  {
    id: '1',
    name: 'Production',
    url: 'https://app.example.com',
    status: 'active',
    lastDeployed: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Staging',
    url: 'https://staging.app.example.com',
    status: 'active',
    lastDeployed: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    name: 'Development',
    url: 'https://dev.app.example.com',
    status: 'inactive',
    lastDeployed: '2024-01-10T09:15:00Z',
  },
];

export default function DeploymentSettings() {
  const [environments, setEnvironments] = useState<DeploymentEnvironment[]>(MOCK_ENVIRONMENTS);
  const [isAddingEnvironment, setIsAddingEnvironment] = useState(false);
  const [newEnvironment, setNewEnvironment] = useState({
    name: '',
    url: '',
  });

  const getStatusColor = (status: DeploymentEnvironment['status']) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleAddEnvironment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEnvironment.name || !newEnvironment.url) {
      return;
    }

    const environment: DeploymentEnvironment = {
      id: Date.now().toString(),
      name: newEnvironment.name,
      url: newEnvironment.url,
      status: 'inactive',
      lastDeployed: new Date().toISOString(),
    };

    setEnvironments([...environments, environment]);
    setNewEnvironment({ name: '', url: '' });
    setIsAddingEnvironment(false);
  };

  const toggleEnvironmentStatus = (id: string) => {
    setEnvironments(environments.map(env => 
      env.id === id 
        ? { ...env, status: env.status === 'active' ? 'inactive' : 'active' }
        : env
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEnvironment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deployment Settings</h1>
              <p className="text-gray-600 mt-1">
                Manage your deployment environments and configurations
              </p>
            </div>
            <button
              onClick={() => setIsAddingEnvironment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Add Environment
            </button>
          </div>

          {isAddingEnvironment && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Environment</h3>
              <form onSubmit={handleAddEnvironment} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Environment Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newEnvironment.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Testing, Preview"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                      URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={newEnvironment.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingEnvironment(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Add Environment
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Environments</h3>
            
            {environments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No environments configured</p>
            ) : (
              <div className="space-y-3">
                {environments.map((environment) => (
                  <div
                    key={environment.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">
                          {environment.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(environment.status)}`}>
                          {environment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{environment.url}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last deployed: {formatDate(environment.lastDeployed)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleEnvironmentStatus(environment.id)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          environment.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {environment.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200">
                        Deploy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Environment Variables</h3>
          <p className="text-sm text-gray-600 mb-4">
            Manage environment variables for your deployments
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">DATABASE_URL</span>
                <p className="text-sm text-gray-500">Database connection string</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">API_KEY</span>
                <p className="text-sm text-gray-500">External API authentication key</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <span className="font-medium text-gray-900">REDIS_URL</span>
                <p className="text-sm text-gray-500">Redis cache connection string</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>

          <button className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
            Add Variable
          </button>
        </div>
      </div>
    </div>
  );
} 