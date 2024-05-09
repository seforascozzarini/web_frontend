<template>

    <v-container :class="{ 'm-content': !mobile }">

        <v-row>
            <v-col cols="12"
                   xs="12"
                   sm="12"
                   md="6"
                   lg="6"
                   xl="6">
                <p class="text-h6 font-weight-bold text-primary text-center">{{ title }}</p>
                <p class="text-grey text-center">{{ text }}</p>
                <v-form ref="form" validate-on="submit"
                        @submit.prevent="submit"
                        class="mt-10 text-end">
                    <v-text-field density="comfortable"
                                  v-model="formData.name"
                                  :label="$t('Nome')"
                                  :rules="[validators.required()]"
                                  variant="outlined"></v-text-field>
                    <v-text-field density="comfortable"
                                  v-model="formData.email"
                                  :label="$t('Indirizzo Email')"
                                  :rules="[validators.required(), validators.email()]"
                                  variant="outlined"></v-text-field>
                    <v-textarea density="comfortable"
                                v-model="formData.message"
                                :label="$t('Messaggio')"
                                variant="outlined"
                                :rules="[validators.required()]"
                                rows="7"
                                auto-grow></v-textarea>

                    <v-btn min-width="160"
                           type="submit"
                           color="secondary">{{ $t('Invia') }}</v-btn>
                </v-form>
            </v-col>
            <v-col v-if="!smAndDown">
                <v-img max-width="500"
                       src="@/assets/images/contacts_image.png" />
            </v-col>
        </v-row>

    </v-container>

</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile, smAndDown } = useDisplay()

const $t = useI18n().t
useSiteStore().setPageInfo($t('Contattaci'))


const title = $t('Hai Domande o Dubbi da Porci?')
const text = $t('Il nostro team è sempre disponibile per rispondere ad ogni tua domanda. Non esitare e scrivici pure, sarà nostra premura risponderti nel più breve tempo possibile.')


const validators = useValidators()
const form = ref(null)
const formData = ref({
    name: '',
    email: '',
    message: ''
})
const submit = async () => {
    await form.value.validate()
    if (!form.value.isValid) return
    const repo = useRepository().contacts
    const resp = await repo.sendContactForm(formData.value)
    if(resp.error){
        useMessages().error($t('Si è verificato un errore durante l\'invio del messaggio. Riprova più tardi.'));
        return
    }
    useMessages().success($t('Messaggio inviato con successo!'));
    formData.value = {
        name: '',
        email: '',
        message: ''
    }
}

</script>