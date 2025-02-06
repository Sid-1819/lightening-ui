const supabaseUrl = (import.meta as any).env.SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.SUPABASE_ANON_KEY;


import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
