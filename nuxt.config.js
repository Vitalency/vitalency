export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Vitalency',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:400,600,700,800|Open+Sans&display=swap' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/6.2.4/firebase-auth.js' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase', '~/plugins/fireauth'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    chargeebeeSite: process.env.chargebeeSite,
    chargebeePlanId: process.env.chargebeePlanId
  }
}
