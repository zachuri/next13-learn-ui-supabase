import React from "react"
import { createServerClient } from "@/utils/supabase-server"

export default async function DashboardPage() {
  const supabase = createServerClient()
  const session = await supabase.auth.getSession()

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.data.session?.user.id)

  return (
    <div>
      <h1>DashBoard</h1>
      <h1>Id:{session.data.session?.user.id}</h1>
      <h1>{profiles?.[0]?.username}</h1>
    </div>
  )
}
