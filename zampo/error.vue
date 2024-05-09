<template>
    <v-app style="min-height: 100vh;">
        <v-layout class=""
                  style="min-height: 100vh;">


            <v-navigation-drawer v-if="mobile"
                                 color="primary"
                                 class="position-fixed w-50"
                                 v-model="drawer"
                                 :class="{ 'w-100': xs }"
                                 disable-resize-watcher
                                 disable-route-watcher>
                <side-bar :drawer-func="() => drawer = false"></side-bar>
            </v-navigation-drawer>


            <app-bar error-page
                     :class="{ navbar: homepage && !mobile }"
                     :drawer-func="() => drawer = true"></app-bar>
            <v-main>


                <v-sheet color="background">
                    <v-container fluid
                                 class="pa-0 text-center d-flex flex-column align-center justify-center">


                        <img v-if="err.status === 404"
                             src="@/assets/images/errors/404.svg"
                             alt="error">
                        <img v-else-if="err.status === 403"
                             src="@/assets/images/errors/403.svg"
                             alt="error">
                        <img v-else-if="err.status === 400"
                             src="@/assets/images/errors/400.svg"
                             alt="error">
                        <img v-else-if="err.status === 503"
                             src="@/assets/images/errors/503.svg"
                             alt="error">
                        <img v-else="err.status === 500"
                             src="@/assets/images/errors/500.svg"
                             alt="error">

                    </v-container>
                </v-sheet>
            </v-main>


            <v-footer class="position-absolute footer pa-0"
                      app
                      :color="useSiteStore().footerBackground">

                <footer-content></footer-content>
            </v-footer>



        </v-layout>
    </v-app>
</template>
<script setup>
const props = defineProps(
    {
        error: Object,
    }
)
const drawer = ref(false)
const $t = useNuxtApp().$i18n.t

const statusMapping = {
    '404': {
        title: $t('Pagina non Trovata'),
        message: $t("Non riusciamo a trovare la pagina che stai cercando. Prova a cercare qualcos'altro, o torna alla nostra homepage"),
        status: 404,
    },
    '403': {
        title: $t('Accesso Negato'),
        message: $t('Sembra che tu non abbia i permessi necessari per accedere a questa pagina'),
        status: 403,
    },
    '400': {
        title: $t('Richiesta non Valida'),
        message: $t('Qualcosa è andato storto con la tua richiesta. Prova a ripetere l\’operazione'),
        status: 400,
    },
    '503': {
        title: $t('Servizio momentaneamente non disponibile'),
        message: $t('Qualcosa è andato storto. Il nostro team sta già lavorando per risolvere. Grazie della tua pazienza'),
        status: 503,
    },

}

const err = statusMapping[props.error.statusCode] || {
    title: $t('Ops! Questo non dovrebbe succedere'),
    message: $t('Qualcosa è andato storto. Il nostro team sta già lavorando per risolvere. Grazie della tua pazienza'),
    status: 500,
}

useSiteStore().setPageInfo(err.title, err.message)

</script>