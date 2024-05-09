<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }">

        <v-skeleton-loader v-if="loading"
                           type="list-item@10"></v-skeleton-loader>

        <v-expansion-panels>
            <v-expansion-panel v-for="faq in faqs"
                               elevation="0"
                               class="border mb-3 rounded-md">

                <v-expansion-panel-title>
                    <template #default="{ expanded }">
                        <p class="font-weight-bold py-3"
                           :class="{ 'text-primary': !expanded, 'text-secondary': expanded }">{{ faq.question }}
                        </p>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const $t = useI18n().t
const page = useContent('faqs')
page.init()

const loading = ref(false)
const faqs = ref([])
const fetch = async () => {
    const fetcher = useRepository().content.getFAQs
    loading.value = true
    const resp = await fetcher()
    if (resp.error) {
        loading.value = false
        useMessages().error($t('Impossibile caricare le FAQ'))
    }
    faqs.value = resp.data
    loading.value = false
}

fetch()

</script>