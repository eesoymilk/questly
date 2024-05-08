import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClientOptions } from "@supabase/supabase-js";

import { Database } from "@/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseOptions: SupabaseClientOptions<"public"> = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  supabaseOptions,
);
