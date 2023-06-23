import 'server-only'

import { cache } from 'react'

import Stripe from 'stripe'
import { BASE_URL, headers } from '@/lib/fetchStripe'

export interface Product {
  id: string
  name: string
  description: string | null
  image: string
  price: string
  defaultPriceId: string
}

export const preload = () => {
  void listProducts()
}

export const listProducts = cache(async () => {
  const expand = new URLSearchParams('expand[0]=data.default_price').toString()

  const staticData = await fetch(`${BASE_URL}?${expand}`, {
    cache: 'force-cache',
    headers,
  })

  const response = await staticData.json()

  return response.data.map(productDto) as Product[]
})

export const getProduct = cache(async (productId: string) => {
  const expand = new URLSearchParams('expand[0]=default_price').toString()

  const staticData = await fetch(`${BASE_URL}/${productId}?${expand}`, {
    cache: 'force-cache',
    headers,
  })

  const response = await staticData.json()

  return productDto(response)
})

function productDto({
  id,
  name,
  description,
  images,
  default_price: priceDefault,
}: Stripe.Response<Stripe.Product>): Product {
  const price = priceDefault as Stripe.Price
  return {
    id,
    name,
    description,
    image: images[0],
    price: new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    defaultPriceId: price.id,
  }
}
