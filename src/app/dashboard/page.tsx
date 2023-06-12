import React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase-server"

export default async function DashboardPage() {
  const supabase = createServerClient()
  const session = await supabase.auth.getSession()

  if (!session.data.session?.user) {
    redirect("/login")
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.data.session?.user.id)

  return (
    <div>
      <h1>DashBoard</h1>
      <h1>Id:{session.data.session?.user.id}</h1>
      <h1>User Name: {profiles?.[0]?.username}</h1>
      <h1>Full Name: {profiles?.[0]?.full_name}</h1>
    </div>
  )
}
