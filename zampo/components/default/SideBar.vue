<template>
    <v-sheet color="secondary"
             class="d-flex flex-column justify-space-between h-100">


        <div>
            <div class="d-flex flex-row justify-space-between align-center mx-3 pt-2">
                <img src="@/assets/images/logo/logo_white.svg"
                     width="125"
                     alt="">
                <v-btn icon="mdi-close"
                       variant="text"
                       @click="props.drawerFunc()"
                       class="m"></v-btn>
            </div>
            <v-text-field variant="solo"
                          hide-details
                          density="compact"
                          rounded
                          v-model="searchText"
                          @keyup.enter="search()"
                          :placeholder="`${$t('Cerca')}...`"
                          prepend-inner-icon="mdi-magnify"
                          class="mx-4 mt-3 mb-3"> </v-text-field>
            <v-list>
                <v-list-item v-for="s in sections"
                             class="font-weight-bold text-h6"
                             @click="navClick(s)">{{ s.title }}</v-list-item>
            </v-list>
        </div>

        <div class="mt-auto mx-4 mb-8">
            <!-- PROFILE/LOGIN BUTTON -->
            <v-btn class="w-100 me-3 text-secondary mb-3"
                   variant="elevated"
                   color="white"
                   @click="useAuthStore().authenticated ? navigateTo('/account/') : navigateTo('/auth/login')"
                   :text="useAuthStore().authenticated ? $t('Profilo') : $t('Accedi/Registrati')">
            </v-btn>
            <!-- ADD POST -->
            <v-btn class="w-100 me-3"
                   variant="elevated"
                   color="primary"
                   @click="useAuthStore().authenticated ? navigateTo('/post/create/') : navigateTo('/auth/login')"
                   :text="$t('Pubblica Annuncio')">
            </v-btn>
            <!-- LOGOUT -->
            <v-btn v-if="useAuthStore().authenticated"
                   class="w-100 me-3  mt-3"
                   variant="elevated"
                   color="primary"
                   :text="$t('Logout')"
                   @click="logout">
            </v-btn>
        </div>
    </v-sheet>
</template>

<script setup>
const props = defineProps({
    drawerFunc: Function
})


const $t = useI18n().t


const logout = async () => {
    await useAuthStore().logout()
    location.reload()
}

const navClick = (s) => {
    props.drawerFunc()
    navigateTo(s.link)
}

const searchText = ref('')
const search = () => {
    props.drawerFunc()
    useSiteStore().lastSearch = searchText.value
    return navigateTo({ path: `/explore/`, query: { q: searchText.value } })
}

const sections = [
    { title: $t('Home'), link: '/' },
    { title: $t('Esplora'), link: '/explore' },
    { title: $t("Cos'è Zampo"), link: '/content/zampo-intro/' },
    { title: $t("Di nuovo a casa"), link: '/stories' },
    { title: $t("Contatti"), link: '/contacts/' },
]
</script>