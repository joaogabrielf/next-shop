'use server'

import { notFound } from 'next/navigation'

import { stripe } from '@/lib/stripe'

export const createCheckout = async (productId: string) => {
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  if (!productId) {
    notFound()
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
  })

  return checkoutSession.url ?? '/'
}
