export default function usePostComments(postId) {
    const comments = ref([])
    const loading = ref(false)
    // pagination
    const page = ref(1)
    const pageSize = ref(9)
    const pageCount = ref(0)

    const repo = useRepository().comments
    const $t = useI18n().t

    const messages = useMessages()

    const loadComments = async () => {
        loading.value = true
        const resp = await repo.byPost(postId, page.value, pageSize.value)
        loading.value = false
        if (resp.error){
            messages.error($t('Impossibile caricare i commenti.'))
            return
        }

        comments.value = resp.data.results
        pageCount.value = Math.ceil(resp.data.count / pageSize.value)
    }

    const create = async (text) => {
        loading.value = true
        const resp = await repo.create(postId, text)
        if (resp.error){
            messages.error($t('Impossibile creare il commento.'))
            loading.value = false
            return
        }
        messages.success($t('Commento creato con successo.'))
        loadComments()
    }

    return {
        comments,
        loading,
        page,
        pageSize,   
        pageCount,
        
        loadComments,
        create,
        
    }
}