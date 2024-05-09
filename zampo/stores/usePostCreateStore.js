export default defineStore('post-create-store', () => {
    const repo = useRepository().posts
    const $t = useI18n().t
    const { POST_STATUS } = usePostDefaults()


    const post = ref({})

    const loading = ref(false)

    // 3 steps form
    const currentStep = ref(1)

    const _formData = () => ({
        type: '',
        location: '',
        pet_type: '',
        date: new Date(),
        contacts: {
            phone: '',
            email: '',
        },
        gender: 0,
        microchip: 0,
        sterilised: 0,
        images: [],
        age: [0, 2],
    })

    const formData = ref(_formData())

    function init(){
        currentStep.value = 1
        formData.value = _formData()
    }


    const nextStep = () => {
        currentStep.value += 1
        console.log(currentStep.value)
    }

    const prevStep = () => {
        currentStep.value -= 1
    }

    async function getBody(status) {

        const body = JSON.parse(JSON.stringify(formData.value)) 
        body.status = POST_STATUS[status].value

        const { addressToCoordinates } = useMapsUtils()
        console.log(formData.value.location)
        const location = await addressToCoordinates(formData.value.location)
        body.location = {
            type: 'Point',
            coordinates: [location.lng, location.lat]
        }
        body.address = location.address
        body['age_min'] = body.age[0]
        body['age_max'] = body.age[1]
        delete body.age
        delete body.images

        body.user = useAuthStore().userData.id

        // trim all strings
        for (const key in body) {
            if (typeof body[key] === 'string') {
                body[key] = body[key].trim()
            }
        }
        console.log({body})
        return body
    }


    async function save(draft) {
        loading.value = true
        const body = await getBody(draft?'DRAFT':'PUBLISHED')
        let resp = await repo.create(body)
        console.log({resp})
        if (resp.error) {
            useMessages().error($t('C\'è stato un errore durante la creazione del post.'))
            loading.value = false
            return
        }
        const post = resp.data.id
        let order = 0
        for (const image of formData.value.images) {
            resp = await repo.addImage({ post, image: image.value, order })
            order += 1
            if (resp.error) {
                useMessages().error($t('C\'è stato un errore durante l\'upload delle immagini.'))
                loading.value = false
            }
        }
        loading.value = false
        return navigateTo(`/post/${post}`)
    }

    function reset() {
        post.value = {}
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

