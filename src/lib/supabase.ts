import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Saber } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type SupabaseFetchResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

function createErrorResult<T>(message: string): SupabaseFetchResult<T> {
  return {
    data: null,
    error: {
      message,
      details: null,
      hint: null,
      code: null,
      status: null,
      source: null,
      table: null,
      constraint: null,
    }
  } as SupabaseFetchResult<T>;
}

export async function fetchSaberes(): Promise<SupabaseFetchResult<Saber[]>> {
  if (!supabase) {
    return createErrorResult('Supabase não está configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }

  try {
    const { data, error } = await supabase
      .from<Saber>('saberes')
      .select('*');

    return { data, error };
  } catch (error: unknown) {
    return createErrorResult((error instanceof Error ? error.message : String(error)));
  }
}

export async function createSaber(saber: Saber): Promise<SupabaseFetchResult<Saber>> {
  if (!supabase) {
    return createErrorResult('Supabase não está configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }

  try {
    const { data, error } = await supabase
      .from<Saber>('saberes')
      .insert(saber)
      .select()
      .single();

    return { data, error };
  } catch (error: unknown) {
    return createErrorResult((error instanceof Error ? error.message : String(error)));
  }
}

export async function updateSaber(id: string, patch: Partial<Saber>): Promise<SupabaseFetchResult<Saber>> {
  if (!supabase) {
    return createErrorResult('Supabase não está configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }

  try {
    const { data, error } = await supabase
      .from<Saber>('saberes')
      .update(patch)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  } catch (error: unknown) {
    return createErrorResult((error instanceof Error ? error.message : String(error)));
  }
}
