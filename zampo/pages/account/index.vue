<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }">

        <v-row>
            <v-col>
                <account-banner></account-banner>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-if="store.editMode">
                <account-form></account-form>
            </v-col>
            <v-col v-else>
                <p class="text-primary font-weight-bold text-h6">{{ $t('I Miei Annunci') }}</p>
                <post-grid full is-owner></post-grid>
            </v-col>
        </v-row>


       

    </v-container>
</template>

<script setup>

import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const $t = useI18n().t
useSiteStore().setPageInfo($t('Profilo Personale'),
    $t('Personalizza il tuo profilo. Gestisci i tuoi annunci personali e trova possibili corrispondenze.')
)

const store = useAccountStore()
store.update()

const postStore = usePostListStore()
postStore.reset()
postStore.filters.user_only = true
postStore.update()

</script>