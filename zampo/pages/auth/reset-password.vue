<template>
  <div v-if="!success"
       class="h-100 d-flex flex-column">

    <v-btn color="primary"
           variant="text"
           prepend-icon="mdi-arrow-left"
           @click="navigateTo('/auth/password-forgotten/')"
           class="font-weight-bold text-h6 me-auto">{{ $t('Indietro') }}</v-btn>

    <v-form validate-on="submit"
            class="center mt-15"
            :class="{ 'mx-10': !xs }"
            @submit.prevent="resetPassword()"
            ref="form">

      <p class="text-center font-weight-bold text-h4 text-primary">{{ $t('Reimposta la tua password') }}</p>
      <p class="text-center font-weight-bold text-grey mt-3">
        {{ $t("Compila il form inserendo la tua nuova password e il codice di 6 cifre che hai ricevuto per email.") }}
      </p>
      <p class="text-center font-weight-bold text-grey mb-10">
        {{ $t("Non hai ricevuto l'email?") }} <span class="clickable text-secondary text-decoration-underline"
              @click="navigateTo('/auth/password-forgotten/')">{{ $t('Invia di nuovo') }}</span>
      </p>

      <v-text-field :label="$t('Indirizzo email')"
                    variant="outlined"
                    density="comfortable"
                    :placeholder="$t('Inserisci il tuo indirizzo email')"
                    active
                    class="mb-5"
                    v-model="store.username"
                    disabled
                    :error="store.error"
                    :loading="store.loading"
                    :rules="[validators.required(), validators.email()]"></v-text-field>

      <hidden-text-field :label="$t('Password')"
                         variant="outlined"
                         density="comfortable"
                         :placeholder="$t('Inserisci la tua nuova password')"
                         er
                         active
                         class="mb-5"
                         v-model="password"
                         :error="store.error"
                         :loading="store.loading"
                         max-errors="10"
                         :rules="[validators.required(), ...validators.passwordRules]"
                         @update:modelValue="form.validate()"></hidden-text-field>

      <hidden-text-field :label="$t('Conferma password')"
                         variant="outlined"
                         density="comfortable"
                         :placeholder="$t('Inserisci nuovamente la tua nuova password')"
                         er
                         active
                         class="mb-5"
                         v-model="passwordRepeat"
                         :error="store.error"
                         :loading="store.loading"
                         :rules="[validators.required(), passwordRepeatRule]"></hidden-text-field>

      <p class="text-center text-grey">{{ $t('Inserisci il codice ricevuto per email') }}</p>
      <v-otp-input :loading="store.loading"
                   v-model="otp"
                   :rules="[validators.required()]"></v-otp-input>




      <v-alert type="error"
               class="text-start mt-3"
               v-if="store.error">{{ store.errorMessage }}</v-alert>

      <v-btn color="secondary"
             block
             type="submit"
             rounded="10"
             class="mt-5 text-uppercase">{{ $t('Avanti') }}</v-btn>




    </v-form>
    <p class="mt-auto text-center font-weight-bold text-grey">{{ $t('Non hai ancora un account?') }} <span
            @click="navigateTo('/auth/signup/')"
            class="clickable text-secondary text-decoration-underline">{{ $t('Registrati') }}</span></p>
  </div>

  <div v-else
       class="h-100 d-flex flex-column justify-center align-center">
    <p class="text-center font-weight-bold text-h4 text-primary">{{ $t('La tua password è stata cambiata con successo!')
      }}</p>

    <div class="w-75">
      <v-btn @click="navigateTo('/auth/login/')"
             color="secondary"
             block
             class="mt-15 ">{{ $t('Vai al login') }}</v-btn>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
import { useDisplay } from 'vuetify';


const { mobile, xs } = useDisplay();

const $t = useI18n().t

const store = useAuthStore()
store.setState('otp-ps-reset')
const form = ref(null)
const email = ref(store.getUsername())
const password = ref('')
const passwordRepeat = ref('')
const otp = ref('')

const validators = useValidators()
const passwordRepeatRule = (v) => v === password.value || $t('Le password non coincidono')

const success = ref(false)
const resetPassword = async () => {
  store.error = false
  const valid = await form.value.validate()
  if (!valid.valid) return
  const resp = await store.changePasswordOTP(email.value, password.value, otp.value)
  if (resp.success) success.value = true
}


</script>