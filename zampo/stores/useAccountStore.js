export default defineStore('account-store', () => {
    const $t = useNuxtApp().$i18n.t
    const userRepo = useRepository().users

    const user = ref({})
    const newUser = ref({})

    const loading = ref(false)
    const editMode = ref(false)


    async function fetchUser() {

        const resp = await userRepo.account()
        if (resp.error) {
            throw showError({
                statusCode: resp.status,
                message: $t('Impossibile caricare la pagina richiesta'),
                fatal: true,
            })
        }
        _updateUser(resp.data)
    }

    function _updateUser(data) {
        const { radiusTickByValue } = usePostDefaults()
        user.value = data
        newUser.value = JSON.parse(JSON.stringify(user.value))
        newUser.value.radius = radiusTickByValue(user.value.radius / 1000)
    }


    async function getBody() {
        const { searchRadiusByIndex } = usePostDefaults()

        const data = { ...newUser.value }
        data.radius = searchRadiusByIndex(data.radius).value * 1000
        console.log(data)

        return data

    }


    async function saveUser() {
        loading.value = true
        const body = await getBody()
        const resp = await userRepo.update(body)
        loading.value = false
        if (resp.error) {
            useMessages().error($t('Errore durante il salvataggio del tuo profilo. Riprova più tardi.'))
        }
        else {
            _updateUser(resp.data)
            useMessages().success($t('Il tuo profilo è stato aggiornato con successo!'))
        }
        // editMode.value = false
    }




    async function update() {
        await Promise.all([
            fetchUser(),
        ])
    }

    const image = computed(() => {
        const { mediaLink } = useUtils()
        let image = user.value.image
        if (image)
            return mediaLink(image)
        return 'https://via.placeholder.com/150'
    })

    return {
        user,
        loading,
        image,
        saveUser,
        update,
        editMode,
        saveUser,
        newUser,
    }
})