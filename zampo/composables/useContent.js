
export default function useContent(slug, locale){
    const $t = useNuxtApp().$t
    const repo = useRepository().content

    const loading = ref(true)
    const page = ref({})
    
    async function init(){
        loading.value = true
        const response = await repo.getPage(slug)
        loading.value = false
        if(response.error)  {
            throw showError({
                statusCode: response.status,
                message: $t('Impossibile caricare la pagina richiesta'),
                fatal: true,
            })
        }
        page.value = response.data
        const site = useSiteStore()
        site.setPageInfo(page.value.title, page.value.subtitle)
        
    }

    return {
        loading,
        page,
        init
    }
}