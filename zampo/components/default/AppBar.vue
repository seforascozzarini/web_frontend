<template>
    <v-app-bar color="primary"
               :extension-height="extensionHeight">


        <v-container fluid
                     :class="{ 'm-content': !mobile }">
            <v-row>
                <v-col :cols="mobile ? 12 : 6">

                    <div class="d-flex flex-row justify-start align-center text-primary "
                         :class="{ 'justify-space-between': mobile }">


                        <!-- LOGO -->
                        <img src="@/assets/images/logo/logo_primary.svg"
                             alt=""
                             width="100"
                             class="clickable ms-2"
                             @click="navigateTo('/')">


                        <!-- DRAWER BUTTON -->
                        <v-btn v-if="mobile"
                               @click="props.drawerFunc"
                               icon="mdi-menu"></v-btn>

                        <!-- NAVIGATION LINKS -->
                        <v-btn v-if="!mobile"
                               density="compact"
                               variant="text"
                               v-for="s in sections"
                               class=" clickable font-weight-bold"
                               @click="navigateTo(s.link)">{{ s.title
                               }}</v-btn>
                    </div>

                </v-col>


                <v-col v-if="!mobile">

                    <div class="d-flex flex-row align-center justify-end">

                        <!-- SEARCH BAR -->
                        <v-text-field density="compact"
                                      rounded
                                      variant="solo"
                                      class="me-5"
                                      :placeholder="`${$t('Cerca')}...`"
                                      style="max-width: 300px;"
                                      hide-details
                                      prepend-inner-icon="mdi-magnify">
                        </v-text-field>

                        <!-- ADD POST BUTTON -->
                        <v-btn v-if="!mobile"
                               color="primary"
                               class="me-3"
                               variant="elevated"
                               density="compact"
                               @click="navigateTo('/post/create/')"
                               icon="mdi-plus">
                        </v-btn>


                        <!-- PROFILE MENU -->
                        <v-menu open-on-hover>
                            <template #activator="{ props: __props }">
                                <v-btn v-if="!mobile"
                                       variant="text"
                                       icon="mdi-account"
                                       color="grey"
                                       v-bind="__props"
                                       @click="!authenticated ? navigateTo('/auth/login/') : null">

                                </v-btn>
                            </template>

                            <v-list v-if="authenticated">
                                <v-list-item @click="navigateTo('/account/')">{{ $t('Il tuo profilo') }}</v-list-item>
                                <v-list-item @click="logout">Logout</v-list-item>
                            </v-list>
                        </v-menu>


                    </div>

                </v-col>
            </v-row>
        </v-container>



        <template #extension>
            <v-container class="d-flex flex-column justify-center align-center flex-fill">


                <p class="text-h3 font-weight-bold text-primary text-center"
                   :class="{ 'text-h2': homepage }">{{ site.title }}</p>
                <p class="text-h6 mt-3 text-primary text-center mb-5">{{ site.subtitle }}</p>
                <div class="w-100 d-flex flex-row justify-center"
                     v-if="!xs">
                    <search-bar v-if="showSearchBar"
                                class="mt-15"></search-bar>
                </div>
                <div class="w-100">

                    <search-bar v-if="showSearchBar && xs"
                                class="mt-15"></search-bar>
                </div>
            </v-container>

        </template>


        <!-- BACKGROUND -->
        <template #image>
            <v-parallax v-if="homepage"
                        src="@/assets/images/banner_expanded.png"></v-parallax>
            <v-parallax v-else
                        src="@/assets/images/banner_small.png"
                        scale=".8"></v-parallax>
        </template>



    </v-app-bar>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const props = defineProps({
    drawerFunc: Function,
    errorPage: Boolean,
})

const homepage = computed(() => {
    return useRoute().path === '/' && !props.errorPage
})

const { mobile, xs } = useDisplay()
const site = useSiteStore()

const $t = useI18n().t

const authenticated = computed(() => {
    return useAuthStore().authenticated
})


const logout = async () => {
    await useAuthStore().logout()
    location.reload()
}


const showSearchBar = computed(() => {
    return homepage.value || (mobile.value && useRoute().name === 'explore')
})

const extensionHeight = computed(() => {
    if (xs.value) return homepage.value ? 380 : 280
    return homepage.value ? 615 : 200
})

const sections = [
    { title: $t('Home'), link: '/' },
    { title: $t('Esplora'), link: '/explore/' },
    { title: $t("Cos'è Zampo"), link: '/content/zampo-intro/' },
    { title: $t("Di nuovo a casa"), link: '/stories' },
    { title: $t("Contatti"), link: '/contacts' },
    // { title: $t("Consigli"), link: '/' },
    // { title: $t("La storia"), link: '/' },
    // { title: $t("Il team"), link: '/' },
    // { title: $t("Supporto"), link: '/' },
    // { title: $t("Sostienici"), link: '/' },
]

</script>
