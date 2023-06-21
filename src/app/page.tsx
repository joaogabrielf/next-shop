import Image from 'next/image'
import Carousel from './carousel'
import Stripe from 'stripe'
import { listProducts, preload } from '@/utils/product'

interface Procuct {
  id: string
  name: string
  description: string | null
  image: string
  price: string
}

export const revalidate = 60 * 60 // 1 hour

export default async function Home() {
  preload()

  const response = await listProducts()

  const products: Procuct[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    }
  })

  return (
    <main className="ml-auto min-h-[656px] w-full max-w-[calc(1180px+(100vw-1180px)/2)]">
      <Carousel>
        {products.map((product) => (
          <a
            key={product.id}
            className="keen-slider__slide group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1"
          >
            <Image
              src={product.image}
              className="object-cover"
              alt=""
              width={520}
              height={480}
            />

            <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-[6px] bg-black bg-opacity-70 p-8 opacity-0 transition-all ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <strong className="text-lg">{product.name}</strong>
              <span className="text-xl font-bold text-green-300">
                {product.price}
              </span>
            </footer>
          </a>
        ))}
      </Carousel>
    </main>
  )
}
