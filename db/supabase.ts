import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

import { Config } from "@/constants";

export const supabase = createClient(
  Config.supabaseUrl,
  Config.supabaseAnonKey,
);
