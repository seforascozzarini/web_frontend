<template>
    <v-container :fluid="mobile">
        <v-row>
            <v-col :cols="mobile ? 12 : 7">
                <!-- CAROUSEL -->
                <v-carousel show-arrows="hover"
                            color="white"
                            class="c-rounded"
                            :key="images"
                            hide-delimiter-background="">
                    <!-- ARROW-RIGHT -->
                    <template v-slot:next="{ props }">
                        <v-btn variant="text"
                               color="grey-lighten-1"
                               size="100"
                               class="btn-icon"
                               @click="props.onClick">
                            <v-icon icon="mdi-menu-right"
                                    size="100"></v-icon>
                        </v-btn>
                    </template>
                    <!-- ARROW-LEFT -->
                    <template v-slot:prev="{ props }">
                        <v-btn variant="text"
                               color="grey-lighten-1"
                               size="100"
                               class="btn-icon"
                               @click="props.onClick">
                            <v-icon icon="mdi-menu-left"
                                    size="100"></v-icon>
                        </v-btn>
                    </template>
                    <v-carousel-item v-for="img in images"
                                     :src="img"></v-carousel-item>
                </v-carousel>
                <div class="mt-10">
                    <v-container fluid
                                 class="ma-0 pa-0">
                        <v-row gutters="1">
                            <v-col cols="12">
                                <!-- EVENT DATE -->
                                <post-info-text :label="event"
                                                :value="eventDate"
                                                :loading="loading"
                                                class="mb-4"></post-info-text>
                            </v-col>
                            <v-col cols="12">
                                <!-- ADDRESS -->
                                <post-info-text :label="$t('Zona')"
                                                class="mb-4"
                                                :value="post.address"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="12"
                                   xs="12"
                                   sm="6"
                                   md="6"
                                   lg="6"
                                   xl="6"
                                   v-if="post.contacts?.phone">
                                <!-- TELEPHONE -->
                                <post-info-text :label="$t('Telefono')"
                                                :value="post.contacts.phone"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col>
                                <!-- EMAIL -->
                                <post-info-text :label="$t('Email')"
                                                :value="post.contacts?.email"
                                                v-if="post.contacts?.email"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="12">
                                <!-- TEXT  -->
                                <p class="text-primary font-weight-bold text-h6 mb-4">{{ $t('Messaggio Annuncio') }}</p>
                                <p class="text-grey">{{ post.text }}</p>
                            </v-col>
                            <v-col cols="12"
                                   xs="12"
                                   sm="6"
                                   md="6"
                                   lg="6"
                                   xl="6">
                                <!-- PET TYPE -->
                                <post-info-text :label="$t('Tipo Animale')"
                                                :value="petTypeLabel(post.pet_type)"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="12"
                                   xs="12"
                                   sm="6"
                                   md="6"
                                   lg="6"
                                   xl="6">
                                <!-- PET NAME -->
                                <post-info-text :label="$t('Nome Animale')"
                                                :value="post.pet_name === '' ? $t('Sconosciuto') : post.pet_name"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="6">
                                <!-- PET GENDER -->
                                <post-info-text :label="$t('Sesso Animale')"
                                                :value="petGenderLabel(post.gender)"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="6">
                                <!-- AGE -->
                                <post-info-text :label="$t('Età Animale')"
                                                :value="petAge"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="6">
                                <!-- MICROCHIP -->
                                <post-info-text :label="$t('Microchip')"
                                                :value="petMicrochipLabel(post.microchip)"
                                                :loading="loading"></post-info-text>
                            </v-col>
                            <v-col cols="6">
                                <!-- STERILIZED -->
                                <post-info-text :label="$t('Microchip')"
                                                :value="petSterilizedLabel(post.sterilised)"
                                                :loading="loading"></post-info-text>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-col>
            <v-col offset="1"
                   v-if="!mobile">
                <post-recap-card v-if="!loading"
                                 :post="post"></post-recap-card>

                <div v-if="isOwner">
                    <v-btn class="mt-5"
                           size="x-large"
                           color="secondary"
                           @click="closeDialog = true"
                           block>{{ $t('Chiudi') }}</v-btn>

                    <post-close-dialog v-model="closeDialog"
                                       :onsuccess="()=>navigateTo('/')"
                                       :post="post"></post-close-dialog>



                    <v-btn class="mt-5"
                           size="x-large"
                           color="error"
                           variant="outlined"
                           @click="deleteDialog = true"
                           block>{{ $t('Elimina') }}</v-btn>
                    <post-delete-dialog :post-id="postId"
                                        :onsuccess="() => navigateTo('/')"
                                        v-model="deleteDialog"></post-delete-dialog>


                </div>

                <v-dialog v-model="reportDialog"
                          v-if="canReport">
                    <template #activator="{ props: _props }">
                        <v-btn v-bind="_props"
                               :key="post"
                               :disabled="post.reported == true"
                               class="mt-5"
                               size="x-large"
                               color="secondary"
                               block>{{ $t('Segnala') }}</v-btn>
                    </template>

                    <post-report :post="post"
                                 :onSuccess="onReportSuccess"
                                 :close="() => reportDialog = false"></post-report>

                </v-dialog>
            </v-col>
        </v-row>

    </v-container>



    <div class="bg-accent mt-15 pb-15">
        <comment-grid :post-id="postId"></comment-grid>
    </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const reportDialog = ref(false)

const postId = useRoute().params.id
const { mobile } = useDisplay()

const { petTypeLabel, petGenderLabel, petMicrochipLabel, petSterilizedLabel } = usePostDefaults()

const $t = useI18n().t
useSiteStore().setPageInfo($t('Annuncio'), $t('post_page_subtitle'))
useSiteStore().footerBackground = 'accent'
onUnmounted(() => {
    useSiteStore().footerBackground = ''
})

const { getPostEventInfo } = useUtils()
const event = ref(null)
const eventDate = ref(null)
const petAge = ref(null)

const loading = ref(false)
const post = ref({})
const fetchPost = async () => {
    loading.value = true
    const repo = useRepository().posts
    const resp = await repo.byId(postId)
    loading.value = false
    if (resp.error) {
        if (resp.status === 404) {
            throw showError({
                statusCode: 404,
                message: $t('Annuncio non trovato'),
                fatal: true,
            })
        }
    }
    post.value = resp.data


    const { event: e, eventDate: ed } = getPostEventInfo(post.value)
    event.value = e
    eventDate.value = ed

    if (post.value.age_min === post.value.age_max)
        petAge.value = `${post.value.age_min}`
    else
        petAge.value = `${post.value.age_min} - ${post.value.age_max}`
}

const images = computed(() => {
    // return post.value.images
    if (loading.value) return []
    const images = []
    const { mediaLink } = useUtils()
    for (const image of post.value.images) {
        images.push(mediaLink(image.image))
    }

    // for (let i = 0; i < 5; i++) {
    //     const width = 1920
    //     const height = 1080
    //     images.push(`https://picsum.photos/seed/${postId}${i}/${width}/${height}`)
    // }
    return images
})

fetchPost()

const onReportSuccess = () => {
    reportDialog.value = false
    fetchPost()
}
const logged = await useAuthStore().isAuthenticated()

const canReport = computed(() => {
    if (!logged.value) return false
    if (post.value.user === useAuthStore().userData.id)
        return false
    return !post.value.reported
})

const deleteDialog = ref(false)
const isOwner = computed(() => {
    if (!logged.value) return false
    return post.value.user === useAuthStore().userData.id
})

const closeDialog = ref(false)

</script>
