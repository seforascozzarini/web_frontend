<template>
    <div class="w-100 bg-primary footer "
         :class="{ 'm-content': !mobile }">
        <v-container fluid
                     class="mt-5 w-100 bg-primary">
            <v-row>
                <v-col>
                    <newsletter-form></newsletter-form>
                </v-col>

            </v-row>
            <v-row>
                <v-col v-if="!smAndDown">
                    <div class="d-flex flex-row justify-center justify-space-between mx-2">
                        <p v-for="s in [...sections1, ...sections2]"
                           class="text-body-2 cursor-pointer"
                           style="cursor: pointer;"
                           @click="navigateTo(s.link)">{{ s.title }}</p>
                    </div>
                </v-col>
                <v-col v-if="smAndDown">
                    <p v-for="s in sections1"
                       style="cursor: pointer;"
                       class="text-body-2 mb-2 cursor-pointer"
                       @click="navigateTo(s.link)">{{ s.title }}</p>
                </v-col>

                <v-col v-if="smAndDown"
                       class="text-start">
                    <p v-for="s in sections2"
                       style="cursor: pointer;"
                       class="text-body-2 mb-2 cursor-pointer"
                       @click="navigateTo(s.link)">{{ s.title }}</p>
                </v-col>

            </v-row>

            <v-divider color=""
                       class="border-opacity-100 my-5"></v-divider>

            <v-row>
                <v-col v-bind="colsLastRow"
                       v-if="!mobile"
                       :class="{ 'text-center': xs }">
                    <p class="text-caption">© 2023 Zampo - Tutti i diritti riservati</p>
                </v-col>
                <!-- SOCIAL BUTTONS -->
                <v-col v-bind="colsLastRow"
                       class="text-end my-auto py-auto">
                    <div class="d-flex flex-row align-center"
                         :class="{ 'justify-start': mobile, 'justify-center': !mobile || xs }">
                        <v-btn density="compact"
                               class="me-4"
                               variant="text"
                               icon="mdi-facebook"></v-btn>
                        <v-btn density="compact"
                               class="me-4"
                               variant="text"
                               icon="mdi-instagram"></v-btn>
                        <v-btn density="compact"
                               variant="text"
                               icon="mdi-twitter"></v-btn>
                    </div>
                </v-col>
                <!-- PRIVACY AND TERMS LINKS -->
                <v-col v-bind="colsLastRow">
                    <div class="d-flex flex-row align-center justify-end text-caption"
                         :class="{ 'justify-center': xs }">
                        <p style="cursor: pointer;" @click="navigateTo('/content/termini-servizio/')" class="text-grey me-3">{{ $t('Termini di servizio') }}</p>
                        <p style="cursor: pointer;" @click="navigateTo('/content/politica-privacy/')" class="text-grey">{{ $t('Politica della privacy') }}</p>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile, xs, smAndDown } = useDisplay()

const $t = useI18n().t

const colsLastRow = {
    cols: 12,
    xs: 12,
    sm: 6,
    md: 6,
    xl: 4,
    lg: 4,
}


const sections1 = [
    { title: $t('Home'), link: '/' },
    { title: $t('Esplora'), link: '/explore/' },
    { title: $t("Cos'è Zampo"), link: '/content/zampo-intro/' },
    { title: $t("Finalmente a casa"), link: '/stories' },
    { title: $t("Il Team"), link: '/content/il-team/' },
    { title: $t("Consigli"), link: '/content/advices/' },
]
const sections2 = [
    { title: $t('FAQ'), link: '/content/faq/' },
    { title: $t('Sponsor'), link: '/content/sponsor/' },
    { title: $t("Collabora con Noi"), link: '/partner/' },
    { title: $t("Storia"), link: '/content/storia/' },
    { title: $t("Donazioni"), link: '/support-us/' },
    { title: $t("Contatti"), link: '/contacts/' },
]

</script>

<style scoped>
.link:hover {
    color: white !important;


}

.footer {
    border-radius: 40px 40px 0px 0px !important;
}

style>.footer {
    border-radius: 40px 40px 0px 0px !important;
}
</style>