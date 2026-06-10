import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Saber } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export type SupabaseFetchResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export async function fetchSaberes(): Promise<SupabaseFetchResult<Saber[]>> {
  const { data, error } = await supabase
    .from<Saber>('saberes')
    .select('*')
    .order('createdAt', { ascending: false });

  return { data, error };
}

export async function createSaber(saber: Saber): Promise<SupabaseFetchResult<Saber>> {
  const { data, error } = await supabase
    .from<Saber>('saberes')
    .insert(saber)
    .select()
    .single();

  return { data, error };
}

export async function updateSaber(id: string, patch: Partial<Saber>): Promise<SupabaseFetchResult<Saber>> {
  const { data, error } = await supabase
    .from<Saber>('saberes')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}
