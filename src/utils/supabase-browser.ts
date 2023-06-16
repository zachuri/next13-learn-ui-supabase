import { Database } from '@/types/supabase.db'
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"

export const createBrowserClient = () => createPagesBrowserClient<Database>()
