export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.warnHandler = () => { }
    nuxtApp.$i18n.missingWarn = false
    console.log({nuxtApp})
})