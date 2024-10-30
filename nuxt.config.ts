// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  sourcemap: {
    client: true,
    server: true,
  },
  app: {
    head: {
      title:
        "Dental World Store - Buy Dental Products Online | World's Best Dental Store",
      titleTemplate:
        "%s - Buy Dental Products Online | World's Best Dental Store",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no",
        },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", href: "/favicon-16x16.png" },
        { rel: "icon", type: "mask-icon", href: "/safari-pinned-tab.svg" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "nuxt-headlessui",
    "nuxt-viewport",
    "nuxt-vue3-google-signin",
    "@morev/vue-transitions/nuxt",
    "vue3-carousel-nuxt",
    "pinia-plugin-persistedstate",
    "@primevue/nuxt-module",
    "nuxt-meta-pixel",
  ],
  runtimeConfig: {
    iamAppName: process.env.APP_NAME,
    // IAM token secrets. Please rotate every 2 - 4 weeks
    iamAccessTokenSecret: process.env.IAM_ACCESS_TOKEN_SECRET,
    iamRefreshTokenSecret: process.env.IAM_REFRESH_TOKEN_SECRET,
    iamResetTokenSecret: process.env.IAM_RESET_TOKEN_SECRET,
    iamVerifyTokenSecret: process.env.IAM_VERIFY_TOKEN_SECRET,

    // Public Url
    iamPublicUrl: process.env.IAM_PUBLIC_URL,

    // IAM Emailer
    iamEmailer: process.env.IAM_EMAILER,

    // nodemailer-service
    iamNodemailerService: process.env.IAM_NODEMAILER_SERVICE,
    iamNodemailerServiceSender: process.env.IAM_NODEMAILER_SERVICE_SENDER,
    iamNodemailerServicePassword: process.env.IAM_NODEMAILER_SERVICE_PASSWORD,

    // nodemailer-smtp
    iamNodemailerSmtpHost: process.env.IAM_NODEMAILER_SMTP_HOST,
    iamNodemailerSmtpPort: process.env.IAM_NODEMAILER_SMTP_PORT,
    iamNodemailerSmtpSender: process.env.IAM_NODEMAILER_SMTP_SENDER,
    iamNodemailerSmtpPassword: process.env.IAM_NODEMAILER_SMTP_PASSWORD,

    // IAM SendGrid
    iamSendGridApiKey: process.env.IAM_SENDGRID_API_KEY,
    iamSendgridSender: process.env.IAM_SENDGRID_SENDER,

    // GOOGLE CLIENT ID
    iamGoogleClientId: process.env.IAM_GOOGLE_CLIENT_ID,
    // Do not put secret information here
    public: {
      iamVerifyRegistrations: process.env.IAM_VERIFY_REGISTRATIONS,
      iamAllowGoogleAuth: process.env.IAM_ALLOW_GOOGLE_AUTH,
      publicUrl: process.env.IAM_PUBLIC_URL,
      appName: process.env.APP_NAME,
      clientId: process.env.PAYPAL_CLIENT_ID,
      metaPixel: process.env.NUXT_PUBLIC_METAPIXEL_DEFAULT_ID,
    },
  },
  googleSignIn: {
    clientId: process.env.IAM_GOOGLE_CLIENT_ID,
  },
  typescript: {
    shim: false,
  },
  colorMode: {
    classSuffix: "",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },
  css: ["~/assets/css/main.scss"],
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  primevue: {
    importTheme: { from: "~/assets/primevue-theme.ts" },
  },
});
