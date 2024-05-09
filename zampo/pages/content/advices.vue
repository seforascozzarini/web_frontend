<template>
    <v-container fluid
                 :class="{ 'm-content': !mobile }">
        <v-row>
            <v-col :innerHTML="page.page.value.content"></v-col>
        </v-row>
        <v-divider class="border-opacity-25 mt-5 mb-2"></v-divider>
        
        <v-row>
            <v-col >

            </v-col>
        </v-row>

        <v-row v-if="loading" >
            <v-col v-bind="cols" v-for="i in 12">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>


        <v-row v-else class="mb-15">
            <v-col v-bind="cols" v-for="a in advices">
                <v-card flat>
                    <v-card-title class="text-primary font-weight-bold">{{ a.title }}</v-card-title>
                    <v-card-text class="text-grey">
                        {{ a.text }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const $t = useI18n().t
const page = useContent('advices')
page.init()

const loading = ref(false)
const advices = ref([])
const fetch = async () => {
    const fetcher = useRepository().content.getAdvices
    loading.value = true
    const resp = await fetcher()
    if (resp.error) {
        loading.value = false
        useMessages().error($t('Impossibile caricare i consigli'))
    }
    advices.value = resp.data
    loading.value = false
}

fetch()

const cols = {
    cols: 12,
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    xl: 4

}

</script>