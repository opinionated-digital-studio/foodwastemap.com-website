import pkg from "./package";

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
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
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],

  axios: {
    proxy: true
  },

  proxy: {
    "/api": { target: process.env.FWSM_API_URL, pathRewrite: { "^/api": "" } }
  },

  styleResources: {
    scss: ["~assets/scss/main.scss"]
  },

  buildModules: ["@nuxt/typescript-build"],

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
