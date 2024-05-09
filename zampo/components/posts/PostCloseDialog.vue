<template>

    <v-dialog v-model="dialog"
              persistent
              max-width="800px">
        <v-card>
            <v-card-title class="mt-3">
                <p class="font-weight-bold text-primary">{{ $t('Chiudi il Post') }}</p>
            </v-card-title>
            <v-divider class="my-3"></v-divider>
            <v-form ref="form" @submit.prevent="(submit)" validate-on="submit">
            <v-card-text>
                <v-select :items="availableReasons"
                          variant="outlined"
                          label="Motivo della chiusura"
                          v-model="postForm.close_reason"
                          :rules="[validators.required()]"></v-select>

                <v-checkbox v-model="addStory"
                            :label="$t('Condividi una storia sulla tua esperienza')"></v-checkbox>

                <v-slide-x-transition group>

                    <template v-if="addStory">
                        <date-field variant="outlined"
                                    v-model="storyForm.event_date"
                                    :label="$t('Data dell\'evento')"
                                    :rules="[storyRequired]"
                                    required></date-field>

                        <v-textarea variant="outlined"
                                    auto-grow
                                    v-model="storyForm.text"
                                    :rules="[storyRequired]"
                                    :label="$t('Descrivi qui la tua esperienza')"></v-textarea>

                        <v-file-input :label="$t('Aggiungi un\'immagine')"
                                      variant="outlined"
                                      v-model="storyForm.image"
                                      prepend-icon="mdi-image"
                                      accept="image/png, image/jpeg, image/bmp"></v-file-input>

                        <v-checkbox :label="$t('Voglio mostrare il mio username')"
                                    v-model="storyForm.is_username_visible"></v-checkbox>
                    </template>
                </v-slide-x-transition>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error"
                @click="dialog = false">{{ $t('Annulla') }}</v-btn>
                <v-btn color="primary"
                type="submit">{{ $t('Conferma') }}</v-btn>
            </v-card-actions>
        </v-form>
        </v-card>
    </v-dialog>


</template>

<script setup>
const props = defineProps({
    post: Number,
    onsuccess: Function,
    modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue'])


const _dialog = ref(null)
const dialog = computed({
    get() { return props.modelValue ?? _dialog.value },
    set(val) {
        _dialog.value = val
        emits('update:modelValue', val)
    }
})

const availableReasons = usePostDefaults().CLOSE_REASONS[props.post.type]

const $t = useI18n().t

const addStory = ref(false)
const storyForm = ref({
    event_date: new Date(),
    text: '',
    image: null,
    is_username_visible: false,
    post: props.post.id


})
const postForm = ref({
    status: 2,
    close_reason: null,
    close_date: new Date().toISOString().slice(0, 16)
})



const validators = useValidators()
const storyRequired = (value) => {
    if (addStory.value) {
        return validators.required()(value)
    }
    return true
}

const form = ref(null)
const submit = async () => {
    console.log('submit')
    await form.value.validate()
    if(!form.value.isValid) return

    const updatePost = useRepository().posts.update

    const resp = await updatePost(props.post.id, postForm.value)
    if (resp.error) {
        useMessages().error($t('Errore durante la chiusura del post'))
        dialog.value = false
        return
    }

    if (addStory.value) {
        const repo = useRepository().stories
        const data = {...storyForm.value}
        data.event_date = data.event_date.toISOString().slice(0, 16)
        console.log(data)
        if(data.image){
            data.image = data.image[0]
        }
        else{
            delete data.image
        }
        const resp = await repo.create(data)
        if (resp.error) {
            useMessages().error($t('Errore durante la creazione della storia'))
            dialog.value = false
            return
        }
    }
    useMessages().success($t('Post chiuso con successo'))
    dialog.value = false
    props.onsuccess()
}

</script>