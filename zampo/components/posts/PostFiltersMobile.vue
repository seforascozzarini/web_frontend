<template>
    <v-btn rounded="10"
           variant="outlined"
           append-icon="mdi-filter"
           color="primary">{{ $t('Filtra') }}

        <v-dialog v-model="dialog"
                  activator="parent"
                  fullscreen
                  :scrim="false"
                  transition="dialog-bottom-transition">

            <v-card rounded="0">
                <v-card-title class="d-flex flex-row justify-space-between align-center bg-primary ">
                    <p class="text-white font-weight-bold text-h5">Filtri</p>
                    <v-btn icon="mdi-close"
                           @click="close()"
                           variant="text"
                           color="white"></v-btn>
                </v-card-title>
                <v-card-text>

                    <post-filters show-orderby></post-filters>
                </v-card-text>

                <v-card-actions>
                    <v-btn block color="primary" variant="elevated" rounded="10" size="large" class="mb-3" @click="save()">{{ $t('Salva') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script setup>
const dialog = ref(false)

const store = usePostListStore()

const close = () => {
    store.undoFilters()
    dialog.value = false
}

const save = () => {
    store.update()
    dialog.value = false
}
</script>