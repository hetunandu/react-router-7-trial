import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchApps, fetchAppById, searchApps } from '../services/appsApi';

// Custom hook for debounced search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Query keys for consistency
export const appsQueryKeys = {
  all: ['apps'] as const,
  lists: () => [...appsQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...appsQueryKeys.lists(), { filters }] as const,
  details: () => [...appsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...appsQueryKeys.details(), id] as const,
};

// Query options
export const appsQueryOptions = {
  all: () => ({
    queryKey: appsQueryKeys.lists(),
    queryFn: fetchApps,
  }),
  
  search: (query: string) => ({
    queryKey: appsQueryKeys.list(query),
    queryFn: () => searchApps(query),
    enabled: query.trim().length > 0,
  }),
  
  byId: (id: string) => ({
    queryKey: appsQueryKeys.detail(id),
    queryFn: () => fetchAppById(id),
    enabled: !!id,
  }),
};

// Custom hooks
export function useApps() {
  return useQuery(appsQueryOptions.all());
}

export function useAppsSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300);
  return useQuery(appsQueryOptions.search(debouncedQuery));
}

export function useApp(id: string) {
  return useQuery(appsQueryOptions.byId(id));
} 