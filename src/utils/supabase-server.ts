import { cookies, headers } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export const createServerClient = () =>
  createServerComponentClient({
    // headers,
    cookies,
  })
