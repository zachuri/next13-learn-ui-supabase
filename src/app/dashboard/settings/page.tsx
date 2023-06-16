import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase-server"

// import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  // const user = await getCurrentUser()

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
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm
          user={{
            id: session.data.session.user.id,
            full_name: profiles?.[0]?.full_name || "",
            username: profiles?.[0]?.username || "",
            avatar_url: profiles?.[0]?.avatar_url || "",
            website: profiles?.[0]?.website || "",
          }}
        />
      </div>
    </DashboardShell>
  )
}
