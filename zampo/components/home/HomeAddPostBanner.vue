<template>
    <v-card v-if="!smAndDown"
            variant="flat"
            image="@/assets/images/banner_add_post.svg"
            height="378px">
        <v-card-text class="d-flex flex-column h-100 justify-center w-50 ps-15">
            <p class="font-weight-bold text-primary text-h3">{{ $t('Pubblica il Tuo Annuncio') }}
                <img src="@/assets/images/paw_primary.svg"
                     alt="arrow_right"
                     class="ms-2">
            </p>
            <p class="text-primary mt-3">{{ $t('add_post_banner_text') }}</p>
            <div>
                <v-btn class="mt-5"
                       @click="addPost()"
                       color="primary">{{ $t('Pubblica ora') }}</v-btn>
            </div>
        </v-card-text>
    </v-card>
    <v-card v-else
            variant="flat"
            image="@/assets/images/banner_add_post_mobile.svg"
            height="378px">
        <v-card-text class="d-flex flex-column align-center justify-center h-100 px-3">
            <p class="font-weight-bold text-primary text-h3 text-center">{{ $t('Pubblica il Tuo Annuncio') }}
                <img src="@/assets/images/paw_primary.svg"
                     alt="arrow_right"
                     class="ms-2">
            </p>

            <p class="text-primary mt-3">{{ $t('add_post_banner_text') }}</p>
            <div>
                <v-btn class="mt-5 "
                       color="primary"
                       @click="addPost()">{{ $t('Pubblica ora') }}</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile, smAndDown } = useDisplay()

const addPost = () => {
    return useAuthStore().isAuthenticated() ? navigateTo('/post/create/') : navigateTo('/auth/login/')
}

</script>