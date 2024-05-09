<template>

    <v-card>

        <v-card-title class="py-5 font-weight-bold text-primary">{{ $t('Aggiorna la tua password') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>

            <v-form validate-on="submit" ref="form" @submit.prevent="submit">

                <hidden-text-field :label="$t('Password corrente')"
                                   v-model="formData.old_password"
                                   variant="outlined"
                                   :rules="[useValidators().required()]">

                </hidden-text-field>
                <hidden-text-field :label="$t('Nuova password')"
                                   v-model="formData.password"
                                   max-errors="10"
                                   :rules="[useValidators().required(),  ...useValidators().passwordRules]"
                                   variant="outlined">

                </hidden-text-field>
                <hidden-text-field :label="$t('Ripeti la nuova password')"
                                   v-model="formData.password_confirmation"
                                   variant="outlined"
                                   :rules="[useValidators().required(), matchPassword]">

                </hidden-text-field>

                <v-alert v-model="error"
                         type="error"
                         variant="outlined">{{ errorMsg }}</v-alert>

                <div class="d-flex flex-row justify-end my-3">
                    <v-btn color="primary"
                           variant="outlined"
                           class="me-3"
                           @click="props.closeFunction()">{{ $t('Annulla') }}</v-btn>
                    <v-btn color="secondary" type="submit">{{ $t('Conferma') }}</v-btn>
                </div>

            </v-form>
        </v-card-text>

    </v-card>

</template>

<script setup>
const props = defineProps({
    closeFunction: Function,
})
const $t = useI18n().t
const form = ref(null)
const formData = ref({
    old_password: '',
    password: '',
    password_confirmation: '',
})

const error = ref(false)
const errorMsg = ref('')
const loading = ref(false)

const matchPassword = (v) => {
    return v === formData.value.password || $t('Le password non corrispondono')
}

const submit = async () => {
    await form.value.validate()
    if (!form.value.isValid) return 
    error.value = false
    errorMsg.value = ''
    const method = useRepository().users.update
    loading.value = true
    const resp = await method(formData.value)
    loading.value = false
    if(resp.error){
        error.value = true
        errorMsg.value = $t('Si è verificato un errore')
        if(resp.data?.old_password ==='invalid'){
            errorMsg.value = $t('La password corrente non è corretta')
        }
        return
    }
    useMessages().success($t('Password aggiornata con successo'))
    props.closeFunction()
    
    
}

</script>