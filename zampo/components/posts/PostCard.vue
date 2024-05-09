<template>
    <v-hover>
        <template #default="{ isHovering, props: _props }">
            <v-card class="h-100"
                    :elevation="isHovering ? 6 : 2"
                    v-bind="_props"
                    @click="navigateTo(`/post/${props.post.id}/`)">
                <v-card-text ref="content"
                             :style="cardStyle">

                    <div class="d-flex flex-column justify-center align-center">
                        <v-img :src="image"
                               :width="size"
                               :height="size"
                               cover
                               class="rounded position-relative">

                            <v-chip v-if="post.type === 2 && !props.isOwner"
                                    elevation="0"
                                    pill
                                    size="x-large"
                                    class="user-chip text-white font-weight-bold bg-success"
                                    variant="elevated"
                                    prepend-icon="mdi-check">

                                <p>{{ props.post.user.first_name }} {{ props.post.user.last_name }}</p>
                            </v-chip>

                            <v-chip v-if="isDraft"
                                    elevation="0"
                                    size="x-large"
                                    class="draft-chip text-white font-weight-bold bg-grey"
                                    variant="elevated">

                                <p>{{ $t('Bozza') }}</p>
                            </v-chip>


                            <!-- DELETE -->
                            <v-btn v-if="props.isOwner"
                                   color="error"
                                   class="delete-btn"
                                   icon=""
                                   variant="outlined"
                                   size="35"
                                   @click.stop="deleteDialog=true">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <!-- EDIT -->
                            <v-btn v-if="props.isOwner"
                                   color="primary"
                                   class="edit-btn"
                                   icon=""
                                   size="35"
                                   @click.stop="navigateTo(`/post/edit/${props.post.id}/`)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>




                        </v-img>
                    </div>


                    <p class="text-primary font-weight-bold text-h6 mt-3">{{ post.pet_name
            === '' ? $t('Sconosciuto') : post.pet_name }}</p>
                    <p class="text-grey mt-1">{{ event }}:
                        <span class="font-weight-bold">{{ eventDate }}</span>
                    </p>
                    <p class="text-grey mt-1">{{ $t('Zona') }}:
                        <span class="font-weight-bold">{{ post.address }}</span>
                    </p>

                    <v-btn v-if="isOwner"
                           rounded="md"
                           block
                           @click.stop="navigateTo({ path: `/post/matches/${props.post.id}/`, query: { pet: props.post.pet_name } })"
                           class="mt-3"
                           variant="outlined">{{ $t('Possibili Corrispondenze') }}</v-btn>

                    <v-btn v-if="isOwner" class="mt-2"
                           color="secondary"
                           block
                           co
                           rounded="md">{{ $t('Chiudi il Post') }}</v-btn>
                </v-card-text>
            </v-card>
        </template>
    </v-hover>

    <post-delete-dialog v-model="deleteDialog" :post-id="props.post.id" :onsuccess="async () =>{ await usePostListStore().update()}"></post-delete-dialog>

</template>

<script setup>
const props = defineProps({
    post: {
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

const { mediaLink } = useUtils()

const image = computed(() => {
    if (props.post.default_image) {
        return mediaLink(props.post.default_image)
    }
    return 'https://via.placeholder.com/250'
})

const { event, eventDate } = useUtils().getPostEventInfo(props.post)
const content = ref(null)
const size = ref(250)
const resizeImage = () => {
    size.value = content.value?.$el.clientWidth || 250
}

const { POST_STATUS } = usePostDefaults()
const isDraft = props.post.status === POST_STATUS.DRAFT.value

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

const deleteDialog = ref(false)


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

.edit-btn {
    top: 20px;
    right: 20px;
    position: absolute;
}

.delete-btn {
    top: 20px;
    right: 60px;
    position: absolute;
}
</style>
