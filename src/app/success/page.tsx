import { stripe } from '@/lib/stripe'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

interface successProps {
  searchParams: {
    session_id: string
  }
}

export const metadata: Metadata = {
  title: 'Compra efetuada! | Next Shop',
  robots: 'noindex',
}

export default async function Success({ searchParams }: successProps) {
  const { session_id: sessionId } = searchParams

  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return (
    <main className="mx-auto mt-0 flex h-[656px] flex-col items-center justify-center">
      <h1 className="text-[2rem] text-gray-100">Compra efetuada!</h1>
      <div className="mt-16 flex h-[145px] w-full max-w-[130px] items-center justify-center rounded-[8px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1">
        <Image
          className="object-cover"
          src={product.images[0]}
          alt=""
          width={520}
          height={480}
        />
      </div>

      <p className="mt-8 max-w-[560px] text-center text-2xl text-gray-300">
        Uhuul <strong>{customerName}</strong> 🎉, sua compra foi efetuada com
        sucesso! Você receberá um e-mail!! Sua <strong>{product.name}</strong>{' '}
        já está sendo preparada e logo logo chegará em sua casa!
      </p>

      <Link
        href="/"
        className="mt-20 block text-xl font-bold text-green-500 hover:text-green-300"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
