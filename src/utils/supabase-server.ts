import { cookies, headers } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from '@/types/supabase.db'

export const createServerClient = () =>
  createServerComponentClient<Database>({
    // headers,
    cookies,
  })
