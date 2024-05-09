<template>

    <v-container :class="{ 'm-content': !mobile }">

        <v-row>
            <v-col  >
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
           
        </v-row>

    </v-container>

    <div class="bg-secondary mt-15 pb-15">
    </div>

</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile, smAndDown } = useDisplay()

const $t = useI18n().t
useSiteStore().setPageInfo($t('Collabora con Noi'))
useSiteStore().footerBackground = 'secondary'
onUnmounted(() => {
    useSiteStore().footerBackground = ''
})

const title = $t('Possiamo collaborare in molti modi!')
const text = $t("Che tu sia un privato oppure un'azienda possiamo trovare un modo per collaborare ed aiutarci a vicenda: Zampo infatti è felice stringere partnership ed allargare sempre più la propria rete e comunità. Ti invitiamo a scriverci tramite il form sottostante, oppure inviandoci una email direttamente all'indirizzo info@zampo.it, specificando le tue competenze od il tipo di attività svolta dalla tua azienda, in modo da renderci possibile l'identificazione di un percorso l'uno a fianco dell'altro.")


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
    const resp = await repo.sendPartnerContactForm(formData.value)
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