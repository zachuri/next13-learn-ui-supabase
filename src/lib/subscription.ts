import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { ProductWithPrice, Subscription } from "@/types/stripe"

const getUserSubscriptionPlan = async ({
  user_id,
}: {
  user_id: string
}): Promise<Subscription> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .eq("user_id", user_id)
    .single()

  return data
}

export default getUserSubscriptionPlan
