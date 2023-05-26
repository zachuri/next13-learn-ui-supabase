"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useSupabase } from "@/components/providers/supabase-provider"

export default function DashboardPage() {
  const router = useRouter()

  const { supabase, session } = useSupabase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <p>Email: {session?.user.email}</p>
      <button className={cn(buttonVariants())} onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  )
}
