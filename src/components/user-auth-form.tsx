"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { useSupabase } from "./providers/supabase-provider"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const { supabase } = useSupabase()
  const router = useRouter()
  // const callbackUrl = (router.query?.redirectedFrom as string) ?? "/"
  const redirectUrl = "/dashboard"

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        // void router.back();
        // void router.push(callbackUrl)
        void router.push(redirectUrl)
        // void router.reload();
      }
    }

    void checkSession()
  })

  async function onSubmit(data: FormData) {
    if (type === "register") {
      console.log("REGISTER CALLED")
      setIsLoading(true)
      const email = data.email
      const password = data.password

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback/` || "/",
        },
      })

      setIsLoading(false)

      if (error) {
        return toast({
          title: "Something went wrong.",
          description: "Your sign up request failed. Please try again.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Check your email",
        description:
          "We sent you a login link. Be sure to check your spam too.",
      })
    } else {
      setIsLoading(true)
      const email = data.email
      const password = data.password

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // ToDo -> create a sign in
      // const signInResult = await signIn("email", {
      //   email: data.email.toLowerCase(),
      //   redirect: false,
      //   callbackUrl: searchParams?.get("from") || "/",
      // })

      setIsLoading(false)

      if (error) {
        return toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Successfully logged in!",
        description: "Welcome Back! We were able to authenticate your account.",
      })
    }
  }

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    })

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Successfully logged in!",
      description: "Welcome Back! We were able to authenticate your account.",
    })
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      // void router.reload();
      router.push(redirectUrl)
    }
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type == "register" ? "Sign Up with Email" : "Sign In with Email"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signInWithGitHub()
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}
