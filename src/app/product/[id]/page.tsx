import Image from 'next/image'

import { getProduct } from '@/utils/product'
import Button from '@/components/Button'
import { Metadata } from 'next'
interface ProcuctParams {
  params: {
    id: string
  }
}

// export async function generateStaticParams() {
//   return [
//     { id: 'prod_O7W4qUGeXUKXvs' },
//     { id: 'prod_O7W4TTImEJzJ95' },
//     { id: 'prod_O7W3pUSv8K6b99' },
//     { id: 'prod_O7W3qX3SH1UaL4' },
//     { id: 'prod_O7W29c8QYe9mzg' },
//   ]
// }

export default async function Product({ params }: ProcuctParams) {
  const product = await getProduct(params.id)

  return (
    <main className="mx-auto my-0 grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-[8px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1">
        <Image
          alt=""
          className="object-cover"
          src={product.image}
          width={520}
          height={480}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[2rem] text-gray-300">{product.name}</h1>
        <span className="mt-4 block text-[2rem] text-green-300">
          {product.price}
        </span>

        <p className="mt-10 text-lg leading-[1.6] text-gray-300">
          {product.description}
        </p>

        <Button
          productId={product.defaultPriceId}
          className="mt-auto w-full cursor-pointer rounded-[8px] border-0 bg-green-500 p-5 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-green-300"
        >
          Buy
        </Button>
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: ProcuctParams): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.name,
  }
}
