'use client'

import { createCheckout } from '@/app/actions/checkout'
import { redirect } from 'next/navigation'
import { ReactNode, useState } from 'react'

interface ButtonProps {
  children: ReactNode
  productId: string
  className: string
}

export default async function ButtonForm({
  children,
  productId,
  className,
  ...props
}: ButtonProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleSubmit(event: any) {
    try {
      const url = await createCheckout(productId)
      navigator.clipboard.writeText(url)

      redirect(url)
    } catch (err) {
      alert('Something went wrong, please try again.')
    }
  }

  async function handleClick() {
    setIsCreatingCheckoutSession((state) => !state)
  }

  return (
    <form action={handleSubmit} className="mt-auto">
      <button
        type="submit"
        onClick={handleClick}
        className={className}
        disabled={isCreatingCheckoutSession}
      >
        {children}
      </button>
    </form>
  )
}
