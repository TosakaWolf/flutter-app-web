import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// import * as directives from 'vuetify/lib/directives/index'
// import * as components from 'vuetify/lib/components/index'
import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
  // components,
  // directives
})
