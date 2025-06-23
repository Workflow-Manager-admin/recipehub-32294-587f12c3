import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#4CAF50',
            accent: '#9C27B0',
            secondary: '#FF9800',
            background: '#FAFAFA',
            surface: '#FFFFFF',
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
