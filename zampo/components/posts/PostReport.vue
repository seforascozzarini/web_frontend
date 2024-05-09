<template>
    <v-card>

        <v-card-title class="pt-3 text-primary  font-weight-bold">{{ $t('Segnala il Post') }}</v-card-title>
        <v-divider class="mt-3"></v-divider>

        <v-card-text>
            <v-form ref="form"
                    validate-on="submit"
                    @submit.prevent="submit">

                <v-select :loading="loading"
                          v-model="formData.type"
                          variant="outlined"
                          :items="usePostDefaults().REPORT_TYPE"
                          :rules="[useValidators().required()]"
                          :label="$t('Motivazione')"></v-select>

                <v-textarea :loading="loading"
                            v-model="formData.text"
                            auto-grow
                            class="mt-3"
                            :label="$t('Dettagli Segnalzione')"
                            variant="outlined"></v-textarea>

                <div class="d-flex flex-row align-center justify-end mt-5">

                    <v-btn :loading="loading"
                           class="me-2"
                           variant="outlined"
                           @click="props.close()">{{ $t('Annulla') }}</v-btn>
                    <v-btn :loading="loading"
                           color="primary"
                           type="submit">{{ $t('Segnala') }}</v-btn>

                </div>



            </v-form>

        </v-card-text>


    </v-card>

</template>

<script setup>
const props = defineProps({
    post: Object,
    close: Function,
    onSuccess: Function
})

const formData = ref({
    type: null,
    text: '',
})

const loading = ref(false)
const form = ref(null)
const $t = useI18n().t

const submit = async () => {
    await form.value.validate()
    if (!form.value.isValid) return
    const method = useRepository().posts.report
    const body = { ...formData.value, post: props.post.id }
    loading.value = true
    const resp = await method(body)
    loading.value = false
    if (resp.error) {
        useMessages().error($t('Impossibile segnalare il post'))
        props.close()
        return
    }
    useMessages().success($t('Post segnalato con successo'))
    props.onSuccess()
}

</script>