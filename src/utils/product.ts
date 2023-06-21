import 'server-only'

import { stripe } from '@/lib/stripe'
import { cache } from 'react'

export const preload = () => {
  void listProducts()
}

export const listProducts = cache(async () => {
  return await stripe.products.list({
    expand: ['data.default_price'],
  })
})
