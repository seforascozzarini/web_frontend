    <template>
    <v-card v-if="!smAndDown"
            variant="flat"
            image="@/assets/images/banner_add_post.svg"
            height="378px">
        <v-card-text class="d-flex flex-column h-100 justify-center w-50 ps-15">
            <p class="font-weight-bold text-primary text-h3">{{number}} {{ $t('Animali Tornati a Casa') }}
                <img src="@/assets/images/paw_primary.svg"
                     alt="arrow_right"
                     class="ms-2">
            </p>
            <p class="text-primary mt-3">{{ text }}</p>
           
        </v-card-text>
    </v-card>
    <v-card v-else
            variant="flat"
            image="@/assets/images/banner_add_post_mobile.svg"
            height="378px">
        <v-card-text class="d-flex flex-column align-center justify-center h-100 px-3">
            <p class="font-weight-bold text-primary text-h3 text-center">{{number}} {{ $t('Animali Tornati a Casa') }}
                <img src="@/assets/images/paw_primary.svg"
                     alt="arrow_right"
                     class="ms-2">
            </p>

            <p class="text-primary text-center mt-3">{{ text }}</p>
           
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const props = defineProps({
    number: {
        type: Number,
        default: 0
    },
})

const { mobile, smAndDown } = useDisplay()

const addPost = () => {
    return useAuthStore().isAuthenticated() ? navigateTo('/post/create/') : navigateTo('/auth/login/')
}
const $t = useNuxtApp().$i18n.t
const text = $t("Ci piace raccontarvi anche di quelle storie che finiscono bene. Sia per ringraziare la comunità, sia per dare evidenza a tutti dell'obiettivo ed efficacia di Zampo.")

</script>
