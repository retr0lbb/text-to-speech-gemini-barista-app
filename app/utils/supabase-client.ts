import { createClient } from "@supabase/supabase-js";

const SUPABASEURI = process.env.NEXT_PUBLIC_SUPABASEURI
const SUPABASETOKEN = process.env.NEXT_PUBLIC_SUPABASETOKEN

export const supabase = createClient(SUPABASEURI!, SUPABASETOKEN!)
