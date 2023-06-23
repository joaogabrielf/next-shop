'use client'

import { createCheckout } from '@/app/actions/checkout'
import { ReactNode, useTransition } from 'react'

interface ButtonProps {
  children: ReactNode
  productId: string
  className: string
}

export default function Button({
  children,
  productId,
  className,
  ...props
}: ButtonProps) {
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    await createCheckout(productId)
  }

  return (
    <button
      onClick={() => startTransition(() => handleClick())}
      className={className}
      disabled={isPending}
    >
      {children}
    </button>
  )
}
