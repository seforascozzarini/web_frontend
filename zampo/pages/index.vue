<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }"
                 class="mb-10 mt-10">
        <home-post-showcase :title="$t('Smarriti')"
                            :post-type="postType.LOST.value"></home-post-showcase>
                            
        <v-sheet color="primary"
                 height="300px"
                 class="my-10"
                 rounded></v-sheet>
        <home-post-showcase :title="$t('Ritrovati')"
                            :post-type="postType.FOUND.value"></home-post-showcase>



        <home-add-post-banner class="mt-15"></home-add-post-banner>
    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const site = useSiteStore()
const $t = useI18n().t

site.title = $t('Benvenuti su Zampo!')
site.subtitle = $t('home_page_subtitle')

const { postType } = usePostDefaults()



</script>