export default function useStoryList() {
    const loading = ref(false)
    const stories = ref([])

    // pagination
    const page = ref(1)
    const pageSize = ref(12)
    const pageCount = ref(10)
    const count = ref(0)

    async function update() {
        loading.value = true
        const method = useRepository().stories.list
        const resp = await method({}, page.value, pageSize.value)
        loading.value = false
        if (resp.error)
            throw showError({
                statusCode: resp.status,
                message: $t('Impossibile caricare la pagina richiesta'),
                fatal: true
            })
        stories.value = resp.data.results
        count.value = resp.data.count
        pageCount.value = Math.ceil(count.value / pageSize.value)
    }

    return {
        loading,
        stories,
        page,
        pageSize,
        pageCount,
        count,
        update
    }
}