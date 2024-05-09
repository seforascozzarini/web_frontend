<template>
    <v-container :fluid="mobile"
                 class="pt-10">
        <v-row>
            <v-col class="text-h6 text-primary font-weight-bold">
                {{ $t('Commenti') }}
            </v-col>
            <v-col class="text-end">
                <v-btn color="primary"
                       @click="dialog = true">
                    {{ $t('Aggiungi Commento') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12"
                   xs="12"
                   sm="12"
                   md="12"
                   lg="4"
                   xl="4"
                   class="pt-10"
                   v-for="comment in Comments.comments.value">
                <comment-grid-item :comment="comment"
                                   :on-action="Comments.loadComments"></comment-grid-item>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-pagination rounded="circle"
                              v-model="Comments.page.value"
                              :length="Comments.pageCount.value"
                              :total-visible="5"
                              active-color="primary"
                              variant="elevated"
                              @update:modelValue="Comments.loadComments()">
                </v-pagination>
            </v-col>
        </v-row>
    </v-container>


    <v-dialog v-model="dialog" style="max-width:1000px">
        <add-comment-dialog :onclose="() => dialog = false" :callback="create"></add-comment-dialog>
    </v-dialog>
</template>

<script setup>
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();

const props = defineProps({
    postId: {
        type: Number,
        required: true
    },
})
const dialog = ref(false)

const Comments = usePostComments(props.postId)
Comments.loadComments()
const create = (comment) => {
    Comments.create(comment)
    dialog.value = false
}


</script>