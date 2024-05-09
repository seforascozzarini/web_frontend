<template>
    <div class="position-relative">

        <div class="avatar"
             :style="avatarStyle">
            <v-avatar :image="image"
                      :size="avatarSize"></v-avatar>
        </div>
        <v-card elevation="10"
                rounded="xl"
                class="card"
                :style="cardStyle">
            <v-card-text class="text-center">
                <p class="text-primary font-weight-bold text-h6">{{ post.pet_name === '' ? $t('Sconosciuto') :
                post.pet_name
                    }}</p>
                <p class="text-body-1 text-grey mt-2">{{ event }}: <span class="font-weight-bold">{{ eventDate }}</span>
                </p>
                <p class="text-body-1 text-grey mt-2">{{ $t('Zona') }}: <span class="font-weight-bold">{{ post.address
                        }}</span></p>

                <v-dialog v-model="contactDialog"
                          width="auto">
                    <template #activator="{ props: _props }">
                        <v-btn class="mt-10 font-weight-bold text-h6"
                               size="x-large"
                               color="primary"
                               v-bind="_props"
                               block>{{ $t('Contatta') }}</v-btn>
                    </template>

                    <v-card min-width="400px">
                        <v-card-title class="pt-5 text-primary font-weight-bold">
                            {{ $t('Contatti') }}
                        </v-card-title>
                        <v-divider class="my-2"></v-divider>
                        <v-card-text>
                            <post-info-text :label="$t('Email')"
                                            :value="post.contacts?.email"></post-info-text>
                            <post-info-text :label="$t('Telefono')"
                                            v-if="post.contacts?.phone"
                                            :value="post.contacts?.phone"
                                            class="mt-4"></post-info-text>
                            <v-btn @click="contactDialog = false"
                                   class="mt-5 mb-3"
                                   block
                                   rounded="md">{{ $t('Chiudi') }}</v-btn>
                        </v-card-text>
                    </v-card>
                </v-dialog>



            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { useDate } from 'vuetify'

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const $t = useI18n().t
const contactDialog = ref(false)

const image = computed(() => {
    const { mediaLink } = useUtils()
    return mediaLink(props.post.images[0]?.image)


    // return `https://picsum.photos/250/250?random=${props.post.id}`
})

const { event, eventDate } = useUtils().getPostEventInfo(props.post)

const avatarSize = ref(120)
const cardStyle = computed(() => {
    return {
        'margin-top': `${avatarSize.value / 2}px`,
        'padding-top': `${avatarSize.value / 2}px`
    }
})

const avatarStyle = computed(() => {
    return {
        'top': `-${avatarSize.value / 2}px`,
    }
})

</script>

<style scoped>
.card {
    position: relative;
    margin-top: 50px;

}


.avatar {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;
    overflow: hidden;
    z-index: 1000;
}
</style>
