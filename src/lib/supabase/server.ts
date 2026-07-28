import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

let client: any = null;

export async function createClient(): Promise<any> {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl === "your-supabase-url" || !supabaseAnonKey || supabaseAnonKey === "your-supabase-anon-key") {
    throw new Error("Supabase environment variables not configured");
  }

  const cookieStore = await cookies();

  client = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });

  return client;
}

export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(supabaseUrl && supabaseUrl !== "your-supabase-url" && supabaseAnonKey && supabaseAnonKey !== "your-supabase-anon-key");
}
