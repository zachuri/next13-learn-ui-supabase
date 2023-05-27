import React from "react"
import supabase from "@/utils/supabase"
import { createBrowserClient } from "@/utils/supabase-browser"
import { createServerClient } from "@/utils/supabase-server"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useSupabase } from "@/components/providers/supabase-provider"

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
      <pre>{JSON.stringify(profiles)}</pre>
      <h1>{profiles?.[0]?.username}</h1>
    </div>
  )
}

// "use client"

// import React from "react"
// import { useRouter } from "next/navigation"
// import { createBrowserClient } from "@/utils/supabase-browser"
// import { createServerClient } from "@/utils/supabase-server"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
// import { useSupabase } from "@/components/providers/supabase-provider"

// export default async function DashboardPage() {
//   const router = useRouter()

//   const { session } = useSupabase()

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     router.push("/")
//   }

//   const supabase = createBrowserClient()

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", session?.user.id)

//   console.log(profile)

//   return (
//     <div>
//       <h1>DashBoard</h1>
//       <p>Email: {session?.user.email}</p>
//       <button className={cn(buttonVariants())} onClick={handleSignOut}>
//         Sign out
//       </button>
//     </div>
//   )
// }
