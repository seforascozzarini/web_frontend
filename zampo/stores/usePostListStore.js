import { getGeo } from 'geoplugin'

const usePostListStore = defineStore('post-list-store', () => {
    const posts = ref([])

    const loading = ref(false)

    // pagination
    const page = ref(1)
    const pageCount = ref(1)
    const totalCount = ref(0)
    const pageSize = ref(12)

    const repository = useRepository().posts

    const _filters = () => {
        return {
            // post info
            type: '',
            // pet info
            pet_type: '',
            gender: '',
            microchip: '',
            sterilised: '',
            age: [0, 30],
            // location
            radius: useUserStore().radius,
            location: {
                address: '',
                lat: undefined,
                lng: undefined,
                detected: true,
            },
            orderby: {
                field: 'distance',
                order: 'asc',
            
            },

            search: '',
            related_to: '',
        }
    }
    const useFilterLocation = ref(true)

    const filters = ref(_filters())

    /**
     * Initialize location
     * if the user is logged in, use the user's location
     * otherwise, use the IP approximate location
     */
    async function initLocation() {
        let _location = useUserStore().location
        if (!_location) {
            const data = await getGeo()
            filters.value.location.address = data.city
            filters.value.location.lat = data.latitude
            filters.value.location.lng = data.longitude
            filters.value.location.detected = true
        }
        else {
            filters.value.location.address = _location.address
            filters.value.location.lat = _location.latitude
            filters.value.location.lng = _location.longitude
            filters.value.radius = _location.radius
            filters.value.location['detected'] = true
        }
    }

    const lastFilters = ref(JSON.parse(JSON.stringify(filters.value)))

    function resetFilters() {
        filters.value = _filters()
    }

    function undoFilters() {
        filters.value = JSON.parse(JSON.stringify(lastFilters.value))
    }

    async function getQueryParams() {
        const params = {
            ...filters.value,
        }
        Object.keys(params).forEach(key => params[key] === '' && delete params[key])

        delete params.location
        delete params.radius
        delete params.age
        delete params.orderBy

        params.age__gte = filters.value.age[0]
        params.age__lte = filters.value.age[1]
        const detected = filters.value.location.detected
        if (useFilterLocation.value) {
            const { addressToCoordinates } = useMapsUtils()
            if (!detected) {
                const coords = await addressToCoordinates(filters.value.location.address)
                filters.value.location.lat = coords.lat
                filters.value.location.lng = coords.lng
            }
            params.latitude = filters.value.location.lat
            params.longitude = filters.value.location.lng
        }
        params.distance__lte = filters.value.radius * 1000

        params.orderby = `${filters.value.orderby.field}-${filters.value.orderby.order}`

        return params
    }

    async function update(options) {
        await nextTick() // await any changes in filters
        lastFilters.value = JSON.parse(JSON.stringify(filters.value))
        loading.value = true
        const params = await getQueryParams()
        const resp = await repository.list(params, page.value, pageSize.value)
        if(resp.error){
            throw showError({
                fatal: true,
                statusCode: resp.status,
                statusMessage: $t('Impossibile caricare i post'),
            })
        }
        loading.value = false
        posts.value = resp.data.results
        totalCount.value = resp.data.count
        pageCount.value = Math.ceil(totalCount.value / pageSize.value)

    }

    function reset() {
        resetFilters()
        posts.value = []
        page.value = 1
        totalCount.value = 0
        lastFilters.value = {}
    }


    return {
        posts,
        initLocation,
        update,
        loading,
        page,
        pageCount,
        totalCount,
        pageSize,
        filters,
        lastFilters,
        useFilterLocation,
        resetFilters,
        undoFilters,
        reset,

    }
})

export default usePostListStore