'use client'

import React from "react"
import { useSupabase } from "@/components/providers/supabase-provider"

export default function DashboardPage() {
  const { supabase, session } = useSupabase()

  return (
    <div>
      <h1>DashBoard</h1>
      <p>Email: {session?.user.email}</p>
    </div>
  )
}
