export default function usePostDefaults() {
    const $t = useNuxtApp().$i18n.t

    // NOTE: radius value is in km, remember to convert it to meters when communicating with the API
    const searchRadius = {
        VERY_CLOSE: {
            label: $t('Molto vicino'),
            value: 2,
        },
        CLOSE: {
            label: $t('Vicino'),
            value: 5,
        },
        NEAR: {
            label: $t('Abbastanza vicino'),
            value: 10,
        },
        MODERATE: {
            label: $t('Moderato'),
            value: 20,
        },
        FAR: {
            label: $t('Lontano'),
            value: 50,
        },
        DISTANT: {
            label: $t('Molto lontano'),
            value: 100,
        },
    }

    const searchRadiusTicks = {}
    Object.entries(searchRadius).forEach(([key, value], index) => {
        searchRadiusTicks[index] = value.label
    })

    const radiusTickByValue = (value) => {
        return Object.values(searchRadius).findIndex((item) => item.value === value)
    }

    const searchRadiusByIndex = (index) => {
        return Object.values(searchRadius)[index]
    }

    const postType = {
        LOST: {
            label: $t('Smarriti'),
            value: 1,
        },
        FOUND: {
            label: $t('Ritrovati'),
            value: 2,
        },
    }

    const postTypeSelect = [{ title: $t('Tutti'), value: '' }]
    Object.entries(postType).forEach(([key, value]) => {
        postTypeSelect.push({
            title: value.label,
            value: value.value,
        })
    })

    const petType = {
        CAT: {
            label: $t('Gatto'),
            value: 1,
        },
        DOG: {
            label: $t('Cane'),
            value: 2,
        },
        BIRD: {
            label: $t('Uccello'),
            value: 3,
        },
        RABBIT: {
            label: $t('Coniglio'),
            value: 4,
        },
        TURTLE: {
            label: $t('Tartaruga'),
            value: 5,
        },
        REPTILE: {
            label: $t('Rettile'),
            value: 6,
        },
        HAMSTER: {
            label: $t('Criceto'),
            value: 7,
        },
        FERRET: {
            label: $t('Furetto'),
            value: 8,
        },
        OTHER: {
            label: $t('Altro'),
            value: 99,
        },
    }

    const petTypeSelect = [{ title: $t('Tutti'), value: '' }]
    Object.entries(petType).forEach(([key, value]) => {
        petTypeSelect.push({
            title: value.label,
            value: value.value,
        })
    })
    // value:label
    const petTypeLabel = (value) => {
        return Object.values(petType).find((item) => item.value === value)?.label
    }


    const petGender = {
        NOT_SPECIFIED: {
            label: $t('Non specificato'),
            value: 0,
        },
        MALE: {
            label: $t('Maschio'),
            value: 1,
        },
        FEMALE: {
            label: $t('Femmina'),
            value: 2,
        },
    }

    const petGenderSelect = [{ title: $t('Tutti'), value: '' }]
    Object.entries(petGender).forEach(([key, value]) => {
        petGenderSelect.push({
            title: value.label,
            value: value.value,
        })
    })

    const petGenderLabel = (value) => {
        return Object.values(petGender).find((item) => item.value === value)?.label
    }

    const petMicrochip = {
        NOT_SPECIFIED: {
            label: $t('Non specificato'),
            value: 0,
        },
        YES: {
            label: $t('Si'),
            value: 1,
        },
        NO: {
            label: $t('No'),
            value: 2,
        },
    }

    const petMicrochipSelect = [{ title: $t('Tutti'), value: '' }]
    Object.entries(petMicrochip).forEach(([key, value]) => {
        petMicrochipSelect.push({
            title: value.label,
            value: value.value,
        })
    })

    const petMicrochipLabel = (value) => {
        return Object.values(petMicrochip).find((item) => item.value === value)?.label
    }

    const petSterilized = {
        NOT_SPECIFIED: {
            label: $t('Non specificato'),
            value: 0,
        },
        YES: {
            label: $t('Si'),
            value: 1,
        },
        NO: {
            label: $t('No'),
            value: 2,
        },
    }

    const petSterilizedSelect = [{ title: $t('Tutti'), value: '' }]
    Object.entries(petSterilized).forEach(([key, value]) => {
        petSterilizedSelect.push({
            title: value.label,
            value: value.value,
        })
    })

    const petSterilizedLabel = (value) => {
        return Object.values(petSterilized).find((item) => item.value === value)?.label
    }

    const orderBy = [
        {
            title: $t('Distanza'),
            value: 'distance',
        },
        {
            title: $t('Data creazione'),
            value: 'publish_date',
        },
        {
            title: $t('Data evento'),
            value: 'event_date',
        },
    ]

    const POST_STATUS = {
        DRAFT: {
            label: $t('Bozza'),
            value: 0,
        },
        PUBLISHED: {
            label: $t('Pubblicato'),
            value: 1,
        },
        CLOSED: {
            label: $t('Chiuso'),
            value: 2,
        },
    }


    const REPORT_TYPE = [
        {
            title: $t('Contenuto inappropriato'),
            value: 1,
        },
        {
            title: $t('Spam'),
            value: 2,
        },
        {
            title: $t('Contenuto Ingannevole'),
            value: 3,
        },
        {
            title: $t('Contenuto Duplicato'),
            value: 4,
        },
        {
            title: $t('Contenuto Irrilevante'),
            value: 5,
        },
        {
            title: $t('Contenuto Sensitivo'),
            value: 6,
        },
        {
            title: $t('Altro'),
            value: 99,
        },
    ]

    const CLOSE_REASONS = {
        // for post type 1 (lost)
        1: [
            {
                title: $t('Ho ritrovato il mio animale attraverso Zampo'),
                value: 1,
            },
            {
                title: $t('Ho ritrovato il mio animale in altro modo'),
                value: 2,
            },
            {
                title: $t('Altro'),
                value: 99,
            },
        ],
        // for post type 2 (found)
        2: [
            {
                title: $t('Il proprietario mi ha contattato attraverso Zampo'),
                value: 1,
            },
            {
                title: $t('Il proprietario mi ha contattato in altro modo'),
                value: 2,
            },
            {
                title: $t('Altro'),
                value: 99,
            },
        ],
    }


    return {
        searchRadius,
        searchRadiusTicks,
        searchRadiusByIndex,
        postType,
        postTypeSelect,
        petType,
        petTypeSelect,
        petGender,
        petGenderSelect,
        petMicrochip,
        petMicrochipSelect,
        petSterilized,
        petSterilizedSelect,
        radiusTickByValue,
        orderBy,
        POST_STATUS,
        REPORT_TYPE,
        CLOSE_REASONS,

        petTypeLabel,
        petGenderLabel,
        petMicrochipLabel,
        petSterilizedLabel,

    }

}

