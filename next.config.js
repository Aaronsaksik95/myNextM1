module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_URL_GRAPHQL: process.env.API_URL_GRAPHQL,
    PUBLIC_KEY_STRIPE: `${process.env.PUBLISHABLE_KEY}`
  },
}
