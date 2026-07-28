import { createBrowserClient } from "@supabase/ssr";

let client: any = null;

export function createClient(): any {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl === "your-supabase-url" || !supabaseAnonKey || supabaseAnonKey === "your-supabase-anon-key") {
    throw new Error("Supabase environment variables not configured");
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    (supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://")) &&
    supabaseUrl !== "your-supabase-url" &&
    supabaseAnonKey !== "your-supabase-anon-key"
  );
}
