<template>
    <v-container>
        <v-row>
            <v-col cols="12"
                   xs="12"
                   sm="12"
                   md="5"
                   lg="4"
                   xl="3"
                   class="my-auto">
                <p class="text-h6 font-weight-bold">{{ $t('Iscriviti alla Nostra Newsletter') }}</p>
            </v-col>
            <v-col>
                <v-sheet rounded
                         class="pa-2">

                    <v-form @submit.prevent="subscribe"  validate-on="submit"  ref="form">

                        <v-text-field variant="outlined"
                                      hide-details
                                      active
                                      :loading="loading"
                                      v-model="email"
                                      density="compact"
                                      :rules="[useValidators().required(), useValidators().email()]"
                                      :placeholder="$t('Inserisci la tua email...')">


                            <template #append
                                      v-if="!xs">
                                <v-btn rounded="10"
                                       :loading="loading"
                                       :disabled="loading"
                                       type="submit"
                                       color="primary">{{ $t('Invia') }}</v-btn>
                            </template>
                            <template #append-inner
                                      v-else>
                                <v-btn rounded="10"
                                       icon="mdi-send"
                                       variant="text"
                                       color="primary"
                                       density="compact"></v-btn>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { xs } = useDisplay()
const $t = useI18n().t

const email = ref('')
const form = ref(null)
const loading = ref(false)

const method = useRepository().users.newsletterSubscribe

const subscribe = async () => {
    await form.value.validate()
    if (form.value.isValid) {
        const _email = email.value
        email.value =''
        const resp = await method(_email)
        if (resp.error)
            useMessages().error($t('Errore durante la sottoscrizione'))
        else
            useMessages().success($t('Sottoscrizione avvenuta con successo')) 
        // form.value.resetValidation()
    }
}



</script>