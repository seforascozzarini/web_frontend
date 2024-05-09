<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }" class="mb-15">
        <div :innerHTML="page.page.value.content"></div>
    </v-container>
</template>


<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const slug = useRoute().params.slug

const $t = useI18n().t
const page = useContent(slug)
page.init()

</script>