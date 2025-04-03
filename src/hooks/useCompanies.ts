import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Company } from '../types';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setCompanies(data || []);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch companies'));
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  return { companies, loading, error };
}