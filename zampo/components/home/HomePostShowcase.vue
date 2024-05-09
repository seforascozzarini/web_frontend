<template>
    <v-container v-if="posts.length > 0" fluid
                 class="px-0">
        <v-row>
            <v-col cols="6">
                <p class="text-h6 font-weight-bold text-primary">{{ props.title }}</p>
            </v-col>
            <v-col cols="6"
                   class="text-end">
                <!-- SHOW ALL BTN -->
                <v-btn variant="outlined"
                       append-icon="mdi-chevron-right"
                       @click="navigateTo({ path: `/explore/`, query: { type: props.postType } })"
                       color="primary">{{ $t('Visualizza Tutti') }}</v-btn>
            </v-col>
        </v-row>

        <!-- DESKTOP GRID -->
        <v-row v-if="!mobile">
            <v-col v-if="!loading"
                   cols="12"
                   md="4"
                   lg="3"
                   xl="3"
                   v-for="post in posts">
                <post-card :post="post"></post-card>

            </v-col>

            <v-col v-else
                   cols="12"
                   md="4"
                   lg="3"
                   xl="3"
                   v-for="i in 8">
                <v-post-skeleton-loader></v-post-skeleton-loader>
            </v-col>
        </v-row>

        <!-- MOBILE SLIDER -->
        <v-row v-else>
            <v-col>
                <v-slide-group v-model="model"
                               class="pa-4"
                               selected-class="bg-success"
                               :show-arrows="!platform.touch">

                    <v-slide-group-item v-if="!loading" v-for="post in posts"
                                        :key="post.id"
                                        class="me-10"
                                        v-slot="{ isSelected, toggle, selectedClass }">
                        <post-card :post="post"
                                   class="me-10"
                                   :width="mobile ? 300 : undefined"></post-card>
                    </v-slide-group-item>
                    <v-slide-group-item v-else v-for="i in 8">
                        <v-post-skeleton-loader width="300px" class="me-10"></v-post-skeleton-loader>
                    </v-slide-group-item>
                </v-slide-group>

            </v-col>
        </v-row>



    </v-container>

    <no-post-banner v-else></no-post-banner>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { getGeo } from 'geoplugin'

const { mobile, md, platform } = useDisplay()

const props = defineProps({
    postType: {
        type: Number,
    },
    title: String,
})


const loading = ref(false)
const posts = ref([])

const getParams = async () => {
    const params = {
        type: props.postType,
        orderby: 'distance-asc',
    }
    if (useAuthStore().authenticated)
        params.ignore_user_radius = true
    else {
        const data = await getGeo()
        params.latitude = data.latitude
        params.longitude = data.longitude
    }
    return params
}

const fetchPosts = async () => {
    loading.value = true
    const params = await getParams()
    const func = useRepository().posts.list
    const resp = await func(params, 1, 8)
    if (resp.error) { }
    // TODO: handle error
    if (resp.data.results.length > 0)
        posts.value = resp.data.results
    else {
        delete params.latitude
        delete params.longitude
        const resp = await func(params, 1, 8)
        if (resp.error) { }
        // TODO: handle error
        posts.value = resp.data.results
    }
    loading.value = false
}

onMounted(() => {
    fetchPosts()
})

</script>