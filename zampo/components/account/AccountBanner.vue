<template>
    <v-sheet :height="smAndDown ? 500 : 400"
             rounded="xl"
             class="banner position-relative">

        <v-btn class="edit-btn"
               icon="mdi-pencil"
               color="primary"
               variant="text"
               v-if="!store.editMode"
               @click="store.editMode = true"></v-btn>

        <v-container fluid
                     class="h-100">
            <v-row class="h-100 d-flex flex-row align-center">

                <v-col cols="12"
                       xs="12"
                       sm="12"
                       md="6"
                       lg="6"
                       xl="6"
                       :class="{ [smAndDown ? '' : 'ms-15']: true, [smAndDown ? 'text-center' : 'text-start']: true }">
                    <p class="font-weight-bold text-primary"
                       :class="titleText">
                        {{ postStore.totalCount }} {{ $t('Annunci inseriti') }}
                        <img src="@/assets/images/paw_primary.svg"
                             alt="arrow_right"
                             :width="smAndDown ? 20 : 50"
                             class="ms-2">
                    </p>
                    <p class="mt-2 text-primary">{{ $t('La tua area di intertesse arriva fino a') }}
                        <span class="font-weight-bold text-secondary  mx-1"
                              :class="secondaryText">{{ store.user.radius / 1000 }} km</span>,
                        {{ $t('a partire da') }}
                    </p>

                    <p class="font-weight-bold text-secondary mt-2"
                       :class="secondaryText">{{ store.user.address }}</p>
                </v-col>

                <v-col class="text-center">
                    <span class="position-relative"
                          style="width: fit-content;">

                        <v-avatar :image="store.image"
                                  class="position-relative"
                                  size="200">

                        </v-avatar>
                        <v-btn @click="changeImage()"
                               v-if="store.editMode"
                               class="image-btn"
                               size="40"
                               color="secondary"
                               icon="">
                            <v-icon icon="mdi-camera"
                                    size="22"></v-icon>
                        </v-btn>
                    </span>
                </v-col>
            </v-row>
        </v-container>


    </v-sheet>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile, smAndDown } = useDisplay()

const store = useAccountStore()
const postStore = usePostListStore()

const titleText = computed(() => {
    return {
        [smAndDown.value ? 'text-h4' : 'text-h3']: true,
        [smAndDown.value ? 'mt-15' : '']: true
    }
})
const secondaryText = computed(() => {
    return { [smAndDown.value ? 'text-h6' : 'text-h5']: true }
})


const $t = useI18n().t

const changeImage = () => {
    const updateMethod = useRepository().users.updateProfileImage
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = false
    input.accept = 'image/png, image/jpeg'
    input.onchange = async (e) => {
        const resp = await updateMethod(e.target.files[0])
        if (resp.error) {
            useMessages().error($t('Impossible aggiornare l\'immagine del profilo'))
            return
        }
        useMessages().success($t('Immagine del profilo aggiornata con successo'))
        store.update()
    }
    input.click()
}

</script>


<style scoped>
.banner {
    background-image: url('@/assets/images/account_banner_bg.svg');
    background-position: cover;
    background-repeat: no-repeat;
    background-size: cover;
}

.edit-btn {
    position: absolute;
    right: 20px;
    top: 20px;
}

.image-btn {
    position: absolute;
    right: 0px;
    bottom: -70px;
}
</style>