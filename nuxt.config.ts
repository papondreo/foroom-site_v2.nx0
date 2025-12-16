const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

interface PreloadFile {
  file: string
  asType: string
}
const env = require('dotenv').config({
  path: '.env.' + process.env.NODE_ENV
})
const isDev = process.env.NODE_ENV !== 'production'

export default {
  srcDir: 'src/',

  env: env.parsed,

  ssr: true,

  components: true,

  server: {
    // host: 'nx0.katris.ru',
    host: 'localhost',
    port: 8060
  },

  router: {
    middleware: ['GetPageData'],
    prefetchLinks: false
  },

  axios: {
    // baseUrl: 'http://localhost:3000/api'
    proxy: true,
    proxyHeaders: true
  },
  proxy: {
    '/api/': {
      target: 'https://api.foroom.ru/',
      pathRewrite: { '^/api/': '' }
    },
    '/proxy/': {
      target: 'https://api.foroom.ru/',
      pathRewrite: { '^/proxy/': '' }
    },
    '/save_order_foroom/': {
      target:
        'https://www.foroom.ru/_api/ajax_proxy.php?json&action=save_order_foroom',
      pathRewrite: { '^/save_order_foroom/': '' }
    },
    '/send_some_email/': {
      target:
        'https://www.foroom.ru/_api/ajax_proxy.php?json&action=send_some_email',
      pathRewrite: { '^/send_some_email/': '' }
    },
    '/foroomRU_customer_email/': {
      target:
        'https://www.foroom.ru/_api/ajax_proxy.php?json=&action=foroomRU_customer_email34',
      pathRewrite: { '^/foroomRU_customer_email/': '' }
    },
    '/get_regions/': {
      target:
        'https://api.foroom.ru?funnelCRM&getManagerRegions&W5pRNSx8Dx3tGY65xx3BOgAAAAE',
      pathRewrite: { '^/get_regions/': '' }
    },
    '/dealer_request/': {
      target:
        'https://api.foroom.ru?funnelCRM&store_lid_foroom&W5pRNSx8Dx3tGY65xx3BOgAAAAE',
      pathRewrite: { '^/dealer_request/': '' }
    }
  },

  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    title:
      'Купить рулонные шторы и жалюзи в интернет-магазине FOROOM - официальный сайт',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Производство и продажа жалюзи FOROOM. Заказ в интернет - магазине или ближайщем розничном. Доставка по России. Большой выбор материалов и низкие цены.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: 'yandex-manifest.json' },
    ]
  },
  // head: {
  //   title: 'FOROOM',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: 'Nuxt.js project' }
  //   ],
  //   link: [
  //     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //     { rel: 'manifest', href: '/manifest.json' }
  //   ]
  // },

  loading: { color: '#df771c' },

  css: [
    '@/assets/scss/utils/reset',
    '@/assets/scss/utils/fonts',
    '@/assets/scss/UI',
    '@/assets/scss/main',
    './node_modules/hamburgers/dist/hamburgers.min.css',
    './node_modules/bootstrap/dist/css/bootstrap-grid.css',
    './node_modules/vue-multiselect/dist/vue-multiselect.min.css'
  ],

  styleResources: {
    scss: ['@/assets/scss/variables.scss'],
    sass: ['@/assets/sass/utils/vars.sass']
  },

  optimizeCss: true,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/redirect-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/font-awesome',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    [
      '@rkaliev/nuxtjs-yandex-metrika',
      {
        id: '31892916',
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
        debug: true

        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ],
    [
      'nuxt-vk-rtrg',
      {
        id: 'VK-RTRG-1679825-9aiGn'
      }
    ],
    [
      'nuxt-mailru-counter',
      {
        id: '2858626',
        type: 'pageView'
      }
    ]
  ],

  redirect: [
    { from: '^/gdekupit', to: '/sale-points', statusCode: 301 },

    {
      from: '^/shtory-plisse/integra-plisse/ustanovka-integra-plisse',
      to: '/catalog/shtory-plisse/integra-plisse/ustanovka',
      statusCode: 301
    },

    {
      from: '^/rulonnye-shtory/integra-slim/ustanovka-integra-slim',
      to: '/catalog/rulonnye-shtory/integra-slim/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/integra-box/ustanovka-integra-box',
      to: '/catalog/rulonnye-shtory/integra-box/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/integra-box-plus/ustanovka-integra-box-plus',
      to: '/catalog/rulonnye-shtory/integra-box-plus/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/roll/ustanovka-roll',
      to: '/catalog/rulonnye-shtory/roll/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/clic/ustanovka-clic',
      to: '/catalog/rulonnye-shtory/clic/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/clic-box/ustanovka-clic-box',
      to: '/catalog/rulonnye-shtory/clic-box/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/grande/ustanovka-grande',
      to: '/catalog/rulonnye-shtory/grande/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory/grande-box/ustanovka-grande-box',
      to: '/catalog/rulonnye-shtory/grande-box/ustanovka',
      statusCode: 301
    },

    {
      from: '^/rulonnye-shtory-duo/integra-slim-duo/ustanovka-integra-slim-duo',
      to: '/catalog/rulonnye-shtory-duo/integra-slim-duo/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory-duo/integra-box-duo/ustanovka-integra-box-duo',
      to: '/catalog/rulonnye-shtory-duo/integra-box-duo/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory-duo/clic-duo/ustanovka-clic-duo',
      to: '/catalog/rulonnye-shtory-duo/clic-duo/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory-duo/clic-box-duo/ustanovka-clic-box-duo',
      to: '/catalog/rulonnye-shtory-duo/clic-box-duo/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory-duo/grande-box-duo/ustanovka-grande-box-duo',
      to: '/catalog/rulonnye-shtory-duo/grande-box-duo/ustanovka',
      statusCode: 301
    },

    {
      from: '^/vertikalnye-zhalyuzi/v-form-plast/ustanovka-v-form-plast',
      to: '/catalog/vertikalnye-zhalyuzi/v-form-plast/ustanovka',
      statusCode: 301
    },
    {
      from: '^/vertikalnye-zhalyuzi/v-form/ustanovka-v-form',
      to: '/catalog/vertikalnye-zhalyuzi/v-form/ustanovka',
      statusCode: 301
    },

    {
      from: '^/gorizontalnye-zhalyuzi/integra-g-form/ustanovka-integra-g-form',
      to: '/catalog/gorizontalnye-zhalyuzi/integra-g-form/ustanovka',
      statusCode: 301
    },
    {
      from: '^/gorizontalnye-zhalyuzi/g-form/ustanovka-g-form',
      to: '/catalog/gorizontalnye-zhalyuzi/g-form/ustanovka',
      statusCode: 301
    },

    {
      from: '^/rimskie-shtory/integra-roma/ustanovka-integra-roma',
      to: '/catalog/rimskie-shtory/integra-roma/ustanovka',
      statusCode: 301
    },
    {
      from: '^/rimskie-shtory/roma/ustanovka-roma',
      to: '/catalog/rimskie-shtory/roma/ustanovka',
      statusCode: 301
    },

    { from: '^/shtory-plisse', to: '/catalog/shtory-plisse', statusCode: 301 },

    {
      from: '^/rulonnye-shtory',
      to: '/catalog/rulonnye-shtory',
      statusCode: 301
    },
    {
      from: '^/rulonnye-shtory-duo',
      to: '/catalog/rulonnye-shtory-duo',
      statusCode: 301
    },
    {
      from: '^/vertikalnye-zhalyuzi',
      to: '/catalog/vertikalnye-zhalyuzi',
      statusCode: 301
    },
    {
      from: '^/gorizontalnye-zhalyuzi',
      to: '/catalog/gorizontalnye-zhalyuzi',
      statusCode: 301
    },
    {
      from: '^/rimskie-shtory',
      to: '/catalog/rimskie-shtory',
      statusCode: 301
    },
    {
      from: '^/profilnye-karnizy',
      to: '/catalog/profileCornices',
      statusCode: 301
    },
    {
      from: '^/profilnye-karnizy',
      to: '/catalog/profileCornices',
      statusCode: 301
    },



  ],

  plugins: [
    '~/plugins/global',
    { src: '~/plugins/tooltip', mode: 'client' },
    { src: '~/plugins/v-mask', mode: 'client' },
    { src: '~/plugins/saleForoomCounter', mode: 'client' },
    '~/plugins/axios-accessor',
    '~/plugins/axios.js',
    '~/plugins/UI',
    // '~/plugins/helpers.plugin.js',
    '~/plugins/priceSet',
    '~/plugins/cheapestMaterial.js',
    '~/plugins/ucFirst',
    '~/plugins/findMin',
    '~/plugins/getSystem',
    '~/plugins/getParams',
    '~/plugins/getMaterials',
    '~/plugins/minPriceMaterial',
    '~/plugins/declOfNum'
  ],

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        // typeCheck: {
        //   memoryLimit: 4096,
        //   workers: 2
        // },
        typeCheck: false,
        ignoreNotFoundWarnings: false
      }
    ]
  ],

  render: {
    http2: {
      push: true,
      pushAssets: (
        req: Request,
        res: Response,
        publicPath: string,
        preloadFiles: PreloadFile[]
      ) =>
        preloadFiles.map(
          (f: PreloadFile) =>
            `<${encodeURI(publicPath + f.file)}>; rel=preload; as=${f.asType}`
        )
    },
    // compressor: false,
    resourceHints: false
    // etag: false,
    // static: {
    //  etag: false
    // }
  },

  build: {
    postcss: {},
    analise: false,
    typescript: {
      typeCheck: {
        memoryLimit: 8192
      }
    }
    // transpile: ['vuex-module-decorators']
    // extend(
    //   config: any,
    //   { isDev, isClient }: { isDev: boolean; isClient: boolean }
    // ) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|ts|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //       options: {
    //         fix: true
    //       }
    //     })
    //   }
    // }
  },

  ...(isDev && {
    html: {
      minify: {
        collapseBooleanAttributes: false,
        decodeEntities: false,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: false,
        removeEmptyAttributes: false,
        removeRedundantAttributes: false,
        trimCustomFragments: false,
        useShortDoctype: false
      }
    }
  }),

  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },

  optimization: {
    minimize: !isDev,
    splitChunks: {
      chunks: 'all'
    }
  },

  ...(isDev && {
    extractCSS: {
      ignoreOrder: false
    }
  }),

  transpile: ['vue-lazy-hydration', 'intersection-observer'],

  typescript: {
    typeCheck: true
  },

  robots: [
    {
      UserAgent: 'Yandex',
      Disallow: [
        '/_nuxt',
        '/_api',
        '/_downloads',
        '/admin',
        '/*?_openstat=',
        '/*?gclid=',
        '/*?utm_source=',
        '/*from=adwords'
        // '/*?placement',
        // '/*&placement',
        // '*?placement',
        // '*&placement'
      ],
      CleanParam: [
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/rulonnye-shtory',
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/shtory-plisse',
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/rulonnye-shtory-duo',
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/vertikalnye-zhalyuzi',
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/gorizontalnye-zhalyuzi',
        'template&action&placement&material&sizes&step&systeminfo&etext /buy/rimskie-shtory',
        'placement /actions',
        'placement /*'
      ],
      Allow: [],
      Host: 'https://www.foroom.ru/sitemap.xml'
    },
    {
      UserAgent: 'Googlebot',
      Disallow: [
        '/_nuxt',
        '/_api',
        '/_downloads',
        '/admin',
        '/*?_openstat=',
        '/*?gclid=',
        '/*?utm_source=',
        '/*from=adwords'
      ]
    },
    {
      UserAgent: 'bingbot',
      Disallow: '/',
      CrawlDelay: 5
    },
    {
      UserAgent: '*',
      Disallow: [
        '/admin',
        '/buy',
        '/compare',
        '/order',
        // '/*?placement',
        // '/*&placement',
        // '*?placement',
        // '*&placement',
        '/*?material',
        '/*&material',
        '/*?sizes',
        '/*&sizes',
        '/*?template',
        '/*&template',
        '/*?action',
        '/*&action',

        '/catalog/rulonnye-shtory/integra-slim-',
        '/catalog/rulonnye-shtory/integra-box-',
        '/catalog/rulonnye-shtory/integra-box-plus-',
        '/catalog/rulonnye-shtory/roll-',
        '/catalog/rulonnye-shtory/clic-',
        '/catalog/rulonnye-shtory/clic-box-',
        '/catalog/rulonnye-shtory/grande-box-',

        '/catalog/rulonnye-shtory-duo/integra-slim-duo-',
        '/catalog/rulonnye-shtory-duo/integra-box-duo-',
        '/catalog/rulonnye-shtory-duo/clic-duo-',
        '/catalog/rulonnye-shtory-duo/clic-box-duo-',
        '/catalog/rulonnye-shtory-duo/grande-box-duo-',

        '/catalog/shtory-plisse/integra-plisse-',

        '/catalog/vertikalnye-zhalyuzi/v-form-plast-',
        '/catalog/vertikalnye-zhalyuzi/v-form-',

        '/catalog/gorizontalnye-zhalyuzi/integra-g-form-',
        '/catalog/gorizontalnye-zhalyuzi/g-form-',

        '/catalog/rimskie-shtory/roma-'
      ],
      Sitemap: 'https://www.foroom.ru/sitemap.xml'
    }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.foroom.ru',
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date()
    },
    filter ({ routes }) {
      return routes.map(route => {
        route.url = `${route.url}/`
        return route
      })
    }
  },
}
