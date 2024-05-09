<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }">

        <v-row>

            <v-col>
                <p class="text-primary font-weight-bold text-h6">{{ $t('Corrispondenze per') }} {{ toMatch }}</p>
                <post-grid full ></post-grid>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const $t = useI18n().t
useSiteStore().setPageInfo($t('Corrispondenze'),
    $t('Trova possibili corrispondenze per il tuo animale.'))

const postId = useRoute().params.id
const toMatch = useRoute().query.pet 

const postStore = usePostListStore()
postStore.reset()
postStore.filters.user_only = true
postStore.filters.related_to = postId
postStore.update()




</script>