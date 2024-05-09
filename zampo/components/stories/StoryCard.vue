<template>
    <v-hover>
        <template #default="{ isHovering, props: _props }">
            <v-card class="h-100"
                    :elevation="isHovering ? 6 : 2"
                    v-bind="_props"
                    @click="dialog = true">
                <v-card-text ref="content"
                             :style="cardStyle">

                    <div class="d-flex flex-column justify-center align-center mb-3">
                        <v-img :src="image"
                               :width="size"
                               :height="size"
                               cover
                               class="rounded position-relative">



                            <v-chip v-if="props.story.post.close_reason === 1"
                                    elevation="0"
                                    size="x-large"
                                    class="draft-chip text-white font-weight-bold bg-success"
                                    variant="elevated">

                                <p>{{ $t('Grazie a Zampo!') }}</p>
                            </v-chip>
                        </v-img>
                    </div>


                    <p class="text-primary font-weight-bold text-h6"
                       v-if="story.post.pet_name">{{ story.post.pet_name }}</p>
                    <p class="text-grey mt-1">{{ $t('Data Smarrimento') }}:
                        <span class="font-weight-bold">{{ initialEventDate }}</span>
                    </p>
                    <p class="text-grey mt-1">{{ $t('Data Ritrovamento') }}:
                        <span class="font-weight-bold">{{ eventDate }}</span>
                    </p>

                </v-card-text>
            </v-card>
        </template>
    </v-hover>


    <v-dialog v-model="dialog">

        <v-card rounded="xl"> 
            
            <v-card-text class="h-100">
                <div class="text-end">
                    <v-btn @click="dialog=false" size="small" variant="text" icon="mdi-close"></v-btn>
                </div>

                <v-container fluid
                             class="h-100">
                    <v-row class="">
                        <v-col cols="12" sm="12" xs="12" md="6" lg="6" xl="6"
                               class="h-100">
                            <v-img class="rounded-xl"
                                   :src="image"></v-img>
                        </v-col>
                        <v-col cols="12" sm="12" xs="12" md="6" lg="6" xl="6">

                            <p class="text-h6 font-weight-bold text-primary mb-5"
                               v-if="props.story.is_username_visible">

                                <v-avatar>

                                    <v-img :src="mediaLink(props.story.post.user.image)"></v-img>
                                </v-avatar>

                                <span class="ps-1">{{ props.story.post.user.first_name }} {{
                                    props.story.post.user.last_name
                                    }}</span>

                            </p>

                            <p class="text-grey">{{ props.story.text }}</p>
                            <v-spacer></v-spacer>
                            <div class="mt-3 d-flex flex-row" >
                                <p class="text-grey me-3">{{ $t('Data Smarrimento') }}:
                                    <span class="font-weight-bold">{{ initialEventDate }}</span>
                                </p>
                                <p class="text-grey ">{{ $t('Zona') }}:
                                    <span class="font-weight-bold">{{ eventDate }}</span>
                                </p>
                            </div>

                            
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>


        </v-card>
    </v-dialog>


</template>

<script setup>
import { useDate, useDisplay } from 'vuetify'

const {mobile, smAndDown} = useDisplay()
const props = defineProps({
    story: {
        type: Object,
        required: true
    },
    width: {
        type: Number,
    },
    isOwner: {
        type: Boolean,
        default: false
    }

})

const $t = useI18n().t
console.log(props.story)

const { mediaLink } = useUtils()

const image = computed(() => {
    if (props.story?.image) {
        return mediaLink(props.story.image)
    }
    return 'https://via.placeholder.com/250'
})

const content = ref(null)
const size = ref(250)
const resizeImage = () => {
    size.value = content.value?.$el.clientWidth || 250
}
const date = useDate()
const initialEventDate = date.format(new Date(props.story.post.event_date), 'normalDateWithWeekday')
const eventDate = date.format(new Date(props.story.event_date), 'normalDateWithWeekday')

window.addEventListener('resize', resizeImage)
onMounted(() => {
    resizeImage()
})

const cardStyle = computed(() => {
    if (props.width) {
        return {
            width: `${props.width}px`
        }
    }
})

const dialog = ref(false)



</script>

<style>
.draft-chip {
    top: 20px;
    left: 0px;
    position: absolute;
    border-radius: 0px 10px 10px 0px !important;
}

.user-chip {
    top: 20px;
    right: 0px;
    position: absolute;
    border-radius: 10px 0px 0px 10px !important;
}
</style>
