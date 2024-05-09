export default defineStore('post-edit-store', () => {
    function mediaLink(path) {
        return useAppConfig().local ? `http://localhost:8000${path}` : path
    }
    const { POST_STATUS } = usePostDefaults()
    const repo = useRepository().posts
    const $t = useI18n().t

    const post = ref({})

    const loading = ref(false)

    const lastImages = ref([])
    const lastAddress = ref('')

    // 3 steps form
    const currentStep = ref(1)

    const formData = ref({})



    const nextStep = () => {
        currentStep.value += 1
    }

    const prevStep = () => {
        currentStep.value -= 1
    }

    async function init(id) {
        currentStep.value = 1
        loading.value = true
        const resp = await repo.byId(id)
        if (resp.error) {
            useMessages().error($t('C\'è stato un errore durante il caricamento del post.'))
            loading.value = false
            return
        }
        
        post.value = resp.data
        formData.value = {
            type: post.value.type,
            location: post.value.address,
            event_date: new Date(post.value.event_date),
            contacts: post.value.contacts,
            pet_name: post.value.pet_name,
            pet_type: post.value.pet_type,
            gender: post.value.gender,
            age: [post.value.age_min, post.value.age_max],
            microchip: post.value.microchip,
            sterilised: post.value.sterilised,
            specific_mark: post.value.specific_mark,
            images: post.value.images.map(i => {
                return {
                    id: i.id,
                    value: mediaLink(i.image),
                    type: 'url'
                }
            }),
            text: post.value.text,

        }
        lastAddress.value = post.value.address
        lastImages.value = [...formData.value.images]
        loading.value = false

    }

    async function getBody(status) {

        const body = { ...formData.value }
        body.status = POST_STATUS[status].value

        if (lastAddress.value === formData.value.location) {
            delete body.location
            delete body.address
        } else {

            const { addressToCoordinates } = useMapsUtils()
            const location = await addressToCoordinates(formData.value.location)
            body.location = {
                type: 'Point',
                coordinates: [location.lng, location.lat]
            }
            body.address = location.address
        }
        body['age_min'] = body.age[0]
        body['age_max'] = body.age[1]
        delete body.age
        delete body.images
        // trim all strings
        for (const key in body) {
            if (typeof body[key] === 'string') {
                body[key] = body[key].trim()
            }
        }

        return body
    }

    async function save(draft) {
        loading.value = true
        const body = await getBody(draft?'DRAFT':'PUBLISHED')
        let resp = await repo.update(post.value.id, body)
        if (resp.error) {
            useMessages().error($t('C\'è stato un errore durante l\'aggiornamento del post.'))
            loading.value = false
            return
        }
        // delete images 
        const toDelete = lastImages.value.filter(i => !formData.value.images.map(i => i.id || -1).includes(i.id))
        
        for (const img of toDelete) {
            const resp = await repo.removeImage(img.id)
            if (resp.error) {
                useMessages().error($t('C\'è stato un errore durante l\'aggiornamento delle immagini.'))
                loading.value = false
                return
            }
        }


        let order = 0
        for (const image of formData.value.images) {
            if (image.id) {
                order += 1
                continue
            }
            resp = await repo.addImage({ post: post.value.id, image: image.value, order })
            order += 1
            if (resp.error) {
                useMessages().error($t('C\'è stato un errore durante l\'upload delle immagini.'))
                loading.value = false
            }
        }
        loading.value = false
        return navigateTo(`/post/${post.value.id}`)
    }

    function reset() {
        // post.value = {}
        loading.value = false
        currentStep.value = 1
    }

    return {
        post,
        loading,
        currentStep,
        formData,

        nextStep,
        prevStep,
        save,
        init,
        reset,


    }

})

