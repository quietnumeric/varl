import Sass from 'sass';
import Fiber from 'fibers';
import pathUtil from 'path';
import fs from 'fs-extra';

import pja from './personal-json-accessor';

const personalJson = pja.get();

const {
  nuxt: {
    server: { port, host },
  },
} = personalJson;

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port,
    host,
  },

  router: {
    base: '/varl/',
  },

  generate: {
    dir: 'docs',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'varl',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        name: 'robots',
        content: 'noindex',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
    base: {
      href: 'router.base',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],
  eslint: {
    ignorePath: '.gitignore',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: [
      '~/assets/scss/colors.scss',
      '~/assets/scss/functions.scss',
      '~/assets/scss/mixins.scss',
      '~/assets/scss/draggable-helper.scss',
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber,
        },
      },
    },
  },

  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: pathUtil.resolve(__dirname),
    alias: {
      '@': pathUtil.resolve(__dirname),
      '~': pathUtil.resolve(__dirname),
    },
  },
};
