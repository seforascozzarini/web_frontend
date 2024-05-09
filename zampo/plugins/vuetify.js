import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import {VuetifyDateAdapter} from 'vuetify/lib/composables/date/adapters/vuetify'

import { VSkeletonLoader } from 'vuetify/components'

import { md3 } from 'vuetify/blueprints'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr:false,
        blueprint:md3,
        components: { ...components, ...labs },
        directives, 
        date: {
            adapter: VuetifyDateAdapter,
          },
        theme: {
            defaultTheme: 'light',
            themes: {
                light: {
                    dark: false,
                    colors: {
                        accent: '#F7DBA7',      
                        secondary: '#E49C12',    
                        primary: '#003459',       
                        dark: '#003459',       
                        info: '#4F86C6',         
                        background: '#FDFDFD',   
                        surface: '#FFFFFF',      
                        warning: '#FFC107',      
                        error: '#FF5252',        
                        success: '#64C880',      
                        grey: '#667479',         
                        accent2: '#7E8F7C',
                        light_grey: '#CCCCCC',
                        white: '#FFFFFF',
                    }

                }
            }
        },

        // styles: {
        //     configFile: '@/assets/scss/settings.scss',
        //   },

        aliases:{
            VPostSkeletonLoader: VSkeletonLoader
        },

        defaults: {
            VBtn: {
              style: 'text-transform: none;',
              class: 'font-weight-bold',
            },
            VPostSkeletonLoader: {
                type:"image@2, heading, text, text"
            }
          },
    })


    app.vueApp.use(vuetify)
})