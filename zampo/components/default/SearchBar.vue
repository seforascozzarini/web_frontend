<template>

        <v-text-field :style="style"
                      hide-details
                      :label="$t('Cerca annunci per parola chiave')"
                      variant="solo"
                      elevation="15"
                      :rounded="!xs"
                      @keyup.enter="search()"
                      v-model="searchText">
            <template #append-inner
                      v-if="!xs">
                <v-btn class="font-weight-bold bg-primary text-white"
                       flat
                       @click="search()"
                       prepend-icon="mdi-magnify">
                    {{ $t('Cerca') }}</v-btn>
            </template>
        </v-text-field>
        <v-btn v-if="xs"
               class="font-weight-bold bg-primary text-white mt-3"
               flat
               @click="search()"
               block
               rounded="10"
               size="large"
               prepend-icon="mdi-magnify">
            {{ $t('Cerca') }}</v-btn>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const style = computed(() => {
    return { 'max-width': '1000px' }
})

const searchText = ref(useSiteStore().lastSearch)
const search = () => {
    useSiteStore().lastSearch = searchText.value
    return navigateTo({ path: `/explore/`, query: { q: searchText.value } })
}

</script>

<style scoped></style>