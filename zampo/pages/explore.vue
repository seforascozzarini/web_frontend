<template>
    <v-container fluid :class="{'m-content':!mobile}">

        <v-row>
            <v-col cols="4"
                   md="4"
                   lg="3"
                   xl="3"
                   v-if="!smAndDown"></v-col>
            <v-col >
                <div class="d-flex flex-row justify-space-between mx-1">
                    <p class="font-weight-bold text-primary text-h5 ">{{ store.totalCount }} {{ $t('Risultati') }}</p>
                    <p>
                        <post-order-by v-if="!smAndDown"></post-order-by>
                        <post-filters-mobile v-else></post-filters-mobile>
                    </p>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4"
                   md="4"
                   lg="3"
                   xl="3"
                   v-if="!smAndDown">
                <v-sheet variant="outlined"
                         class="border rounded border-opacity-25 px-3 py-4">
                    <p class="text-h6 text-primary font-weight-bold">{{ $t('Filtri') }}</p>
                    <post-filters auto-update></post-filters>
                </v-sheet>
            </v-col>
            <v-col class="pa-0 ma-0">

                <post-grid></post-grid>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const $t = useI18n().t

const { mobile, xs, smAndDown } = useDisplay()

const site = useSiteStore()
site.title = $t('Esplora')
site.subtitle = $t('Esplora tutti gli annunci di zampo.')

const store = usePostListStore()
const route = toRef(useRouter().currentRoute)
store.filters.search = route.value.query.q
if(route.value.query.type)
    store.filters.type = Number(route.value.query.type)

const initStore = async () => {
    await store.initLocation()
    await store.update()
}
initStore()

watch(route, () => {
    store.filters.search = route.value.query.q
    store.update()
})

onUnmounted(() => {
    useSiteStore().lastSearch = ''
})

</script>