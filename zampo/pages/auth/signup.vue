<template>
  <div class="h-100 d-flex flex-column">

    <v-btn color="primary"
           variant="text"
           prepend-icon="mdi-arrow-left"
           @click="back()"
           v-if="step !== 3"
           class="font-weight-bold text-h6 me-auto">{{ $t('Indietro') }}

    </v-btn>

    <div class="center mt-15 h-100"
         :class="{ 'mx-10': !xs }">

      <p v-if="step !== 3"
         class="text-center font-weight-bold text-h4 text-primary">{{ $t('Registrati') }}</p>
      <p v-if="step !== 3"
         class="text-center font-weight-bold text-grey mt-3 mb-10">
        {{ $t('Entra a far parte della community di Zampo. Le informazioni della tua posizione serviranno a migliorare la tua esperienza su Zampo.') }}
      </p>

      <signup-step1 v-if="step === 1"
                    v-model:formData="formData"
                    :on-submit="onSubmit"></signup-step1>
      <signup-step2 v-if="step === 2"
                    v-model:formData="formData"
                    :on-submit="onSubmit"></signup-step2>

      <div v-if="step === 3"
           class="d-flex flex-column align-center justify-center h-100 text-center w-100">

        <p class="text-h4 font-weight-bold text-primary">{{ $t('Il tuo account è stato creato con successo!') }}</p>
        <p class="text-grey font-weight-bold mt-5">{{ $t('A breve riceverei una email con le istruzioni necessarie per attivare il tuo account') }}</p>

        <v-btn color="secondary"
               class="text-uppercase mt-5 w-100"
               rounded="10"
               @click="navigateTo('/')">{{ $t('Torna alla home') }}</v-btn>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
import { useDisplay } from 'vuetify';


const { mobile, xs } = useDisplay();

const form = ref(null)
const formData = ref({
  first_name: '',
  last_name: '',
  address: '',
  radius: 0,
  location: {},
  email: '',
  password: '',
  newsletter: false,
})

const step = ref(1)
const onSubmit = () => {
  if (step.value < 3) {
    step.value += 1
  }
}

const back = () => {
  if (step.value > 1)
    step.value -= 1
  else
    useNuxtApp().$router.back()

}

</script>