export const BASE_URL = 'https://api.stripe.com/v1/products'

export const headers = {
  Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
}
