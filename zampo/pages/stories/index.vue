<template>
    <v-container :fluid="mobile" >

        <v-row>
            <v-col>
                <story-banner :number="stories.count"></story-banner>
                <story-grid :stories="stories"></story-grid>
            </v-col>
        </v-row>



    </v-container>


</template>

<script setup>
import { useDisplay } from 'vuetify';

const $t = useNuxtApp().$i18n.t
useSiteStore().setPageInfo(
    $t('Finalmente a Casa!'),
    $t('Leggi le testimonianze di chi è riuscito a riabbracciare il proprio animale.')
)

const { mobile, smAndDown } = useDisplay()

const stories = useStoryList()
stories.update()
</script>