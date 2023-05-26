import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getCurrentUser() {
  const supabase = createClientComponentClient()

  const session = await supabase.auth.getSession()

  return session?.data.session?.user
}
