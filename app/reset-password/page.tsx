import { Suspense } from "react"

import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function Page() {
  return (
    <main className="mx-auto flex w-5xl max-w-full flex-col gap-12 pb-30">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  )
}
