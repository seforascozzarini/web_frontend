<template>
    <div class="position-relative h-100">

        <div class="avatar"
             :style="avatarStyle">
            <v-avatar :image="image"
                      :size="avatarSize"></v-avatar>
        </div>
        <v-card elevation="10"
                rounded="md"
                class="card h-100 text-body-1"
                :style="cardStyle">
            <v-card-text class="mb-auto d-flex flex-column justify-space-between h-100 text-body-1">
                <p class="text-grey">"{{ comment.text }}"</p>
                <div class="mt-3 mb-10 d-flex flex-row justify-space-between">

                    <div>
                        <p class="font-weight-bold text-primary">{{ `${comment.user.first_name} ${comment.user.last_name}` }}
                        </p>
                        <p class="text-primary">{{ writeDate }}</p>
                    </div>

                    <div v-if="useAuthStore().authenticated"
                         class="d-flex flex-row">

                        <comment-action-btn type="UPVOTE"
                                            :comment="props.comment"
                                            :callback="props.onAction"></comment-action-btn>
                        <comment-action-btn type="DOWNVOTE"
                                            :comment="props.comment"
                                            :callback="props.onAction"></comment-action-btn>
                        <comment-action-btn type="FLAG"
                                            :comment="props.comment"
                                            :callback="props.onAction"></comment-action-btn>
                    
                    </div>

                </div>
            </v-card-text>

        </v-card>
    </div>
</template>

<script setup>
import { useDate } from 'vuetify'

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    onAction: {
        type: Function,
        required: true
    }
})

const image = computed(() => {
    console.log(props.comment.user)
    const {mediaLink} = useUtils()
    return mediaLink(props.comment.user.image) ?? 'https://picsum.photos/200'
})

const date = useDate()
const writeDate = date.format(new Date(props.comment.write_date), 'normalDateWithWeekday')

const avatarSize = ref(60)

</script>

<style scoped>
.card {
    position: relative;
    padding-top: 40px;
}


.avatar {
    position: absolute;
    left: 30px;
    top: -30px;
    margin: auto;
    overflow: hidden;
    z-index: 1000;
}</style>
