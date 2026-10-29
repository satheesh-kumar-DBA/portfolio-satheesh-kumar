import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { resolveExperience } from '../lib/experience';

// Loads all portfolio content in one round trip via the get_portfolio() SQL function.
export function usePortfolio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setError(new Error('Supabase is not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.'));
      setLoading(false);
      return;
    }

    const { data: result, error: rpcError } = await supabase.rpc('get_portfolio');
    if (rpcError) {
      setError(rpcError);
    } else {
      // Fill in {experience} placeholders and job periods calculated from the job dates
      setData(resolveExperience(result));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, error, loading, reload: load };
}
