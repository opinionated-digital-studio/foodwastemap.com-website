import pkg from "./package";
require('dotenv').config()

export default {

  /*
   ** Headers of the page
   */
  head: {
    title: 'Food Waste Solution Map',
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: 'Maak voedselverspilling verleden tijd' }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Varela&display=swap"
      },
      { rel: "stylesheet", href: "https://use.typekit.net/otf2qav.css" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
    script: [
      {
        src: "https://kit.fontawesome.com/41ac469f68.js",
        crossorigin: "anonymous"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/scss/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/proxy",
    "nuxt-i18n"
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English'
      },
      {
        code: 'nl',
        iso: 'nl-NL',
        file: 'nl-NL.js',
        name: 'Nederlands'
      }
    ],
    langDir: 'locales/',
    lazy: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      onlyOnRoot: true,
    }
  },

  axios: {
    proxy: true
  },

  proxy: {
    "/api": { target: process.env.FWSM_API_URL, pathRewrite: { "^/api": "" } }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          type: false
        },
        user: {
          property: 'organization'
        },
        endpoints: {
          login: { url: '/api/users/login', method: 'post'},
          user: { url: '/api/organizations/me', method: 'get'},
          logout: false
        }
      }
    }
  },

  styleResources: {
    scss: ["~assets/scss/main.scss"]
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
