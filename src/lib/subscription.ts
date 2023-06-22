import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getUserSubscriptionPlan({
  user_id,
}: {
  user_id: string
}) {
  const supabase = createClientComponentClient()

  const subscription = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user_id)
    .single()

  return subscription.data
}
