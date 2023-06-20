export default function Product({ params }: { params: { id: string } }) {
  return <h1 className="text-xl font-bold">Product {JSON.stringify(params)}</h1>
}
