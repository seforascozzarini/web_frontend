export default defineNuxtPlugin((nuxtApp) => {
    let config = useRuntimeConfig()
    useHead({
        script: [
            {
                src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`,
                defer: true,
            },  
        ]
    })

})