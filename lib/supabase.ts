import { createClient } from "@supabase/supabase-js";

console.log("URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY =", process.env.SUPABASE_SERVICE_ROLE_KEY ? "есть" : "нет");

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);