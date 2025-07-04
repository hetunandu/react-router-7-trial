export interface App {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  category: string;
  lastUpdated: string;
  icon: string;
  downloads: number;
  rating: number;
}

const MOCK_APPS: App[] = [
  {
    id: '1',
    name: 'TaskMaster Pro',
    description: 'Advanced task management application with team collaboration features.',
    version: '2.1.4',
    status: 'active',
    category: 'Productivity',
    lastUpdated: '2024-01-15',
    icon: '📋',
    downloads: 15420,
    rating: 4.7,
  },
  {
    id: '2',
    name: 'CloudSync',
    description: 'Seamless file synchronization across all your devices.',
    version: '1.8.2',
    status: 'active',
    category: 'Storage',
    lastUpdated: '2024-01-12',
    icon: '☁️',
    downloads: 8930,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'DataViz Studio',
    description: 'Create stunning data visualizations and interactive dashboards.',
    version: '3.0.1',
    status: 'maintenance',
    category: 'Analytics',
    lastUpdated: '2024-01-10',
    icon: '📊',
    downloads: 5672,
    rating: 4.8,
  },
  {
    id: '4',
    name: 'SecureVault',
    description: 'Enterprise-grade password manager with zero-knowledge encryption.',
    version: '1.5.7',
    status: 'active',
    category: 'Security',
    lastUpdated: '2024-01-14',
    icon: '🔒',
    downloads: 12340,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'StreamFlow',
    description: 'Real-time data processing and stream analytics platform.',
    version: '2.3.0',
    status: 'inactive',
    category: 'Analytics',
    lastUpdated: '2024-01-08',
    icon: '🌊',
    downloads: 3456,
    rating: 4.2,
  },
  {
    id: '6',
    name: 'NotesHub',
    description: 'Smart note-taking app with AI-powered organization.',
    version: '1.2.9',
    status: 'active',
    category: 'Productivity',
    lastUpdated: '2024-01-16',
    icon: '📝',
    downloads: 9876,
    rating: 4.6,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchApps(): Promise<App[]> {
  await delay(800); // Simulate network delay
  return MOCK_APPS;
}

export async function fetchAppById(id: string): Promise<App | null> {
  await delay(500); // Simulate network delay
  return MOCK_APPS.find(app => app.id === id) || null;
}

export async function searchApps(query: string): Promise<App[]> {
  await delay(600); // Simulate network delay
  
  if (!query.trim()) {
    return MOCK_APPS;
  }
  
  const lowercaseQuery = query.toLowerCase();
  return MOCK_APPS.filter(app => 
    app.name.toLowerCase().includes(lowercaseQuery) ||
    app.description.toLowerCase().includes(lowercaseQuery) ||
    app.category.toLowerCase().includes(lowercaseQuery)
  );
} 