<template>
  <div class="h-100 d-flex flex-column">

    <v-btn color="primary"
           variant="text"
           prepend-icon="mdi-arrow-left"
           @click="$router.back()"
           class="font-weight-bold text-h6 me-auto">{{ $t('Indietro') }}</v-btn>

    <v-form validate-on="submit"
            class="center mt-15"
            :class="{ 'mx-10': !xs }"
            @submit.prevent="sendEmail()"
            v-model="form">

      <p class="text-center font-weight-bold text-h4 text-primary">{{ $t('Recupera la tua password') }}</p>
      <p class="text-center font-weight-bold text-grey mt-3 mb-10">
        {{ $t("Inserisci l'email con cui hai effettuato la registrazione e ti verrà inviata una email con le istruzione per reimpostare la password") }}

      </p>

      <v-text-field :label="$t('Indirizzo email')"
                    variant="outlined"
                    density="comfortable"
                    :placeholder="$t('Inserisci il tuo indirizzo email')"
                    active
                    class="mb-5"
                    v-model="email"
                    :error="store.error"
                    :loading="store.loading"
                    :rules="[validators.required(), validators.email()]"></v-text-field>



      <v-alert type="error"
               class="text-start mt-3"
               v-if="store.error">{{ store.errorMessage }}</v-alert>

      <v-btn color="secondary"
             block
             type="submit"
             rounded="10"
             class="mt-5 text-uppercase">{{ $t('Avanti') }}</v-btn>




    </v-form>
    <p class="mt-auto text-center font-weight-bold text-grey">{{ $t('Non hai ancora un account?') }}
      <span @click="navigateTo('/auth/signup/')"
            class="clickable text-secondary text-decoration-underline">{{ $t('Registrati') }}</span>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
import { useDisplay } from 'vuetify';


const { mobile, xs } = useDisplay();

const form = ref(null)
const email = ref('')

const validators = useValidators()

const store = useAuthStore()
store.setState('start-ps-reset')
const sendEmail = async () => {
  if (!form.value) return
  const resp = await store.sendPasswordReset(email.value)
  if (resp.success) return navigateTo('/auth/reset-password/')
}
</script>