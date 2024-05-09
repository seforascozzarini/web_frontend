<template>
  <v-form validate-on="submit"
          ref="form"
          @submit.prevent="submit">
    <!-- EMAIL -->
    <v-text-field :label="$t('Email')"
                  variant="outlined"
                  density="comfortable"
                  :placeholder="$t('Inserisci la tua email')"
                  active
                  class="mb-5"
                  v-model="formData.email"
                  :rules="[validators.required(), validators.email()]"></v-text-field>

    <hidden-text-field :label="$t('Password')"
                       variant="outlined"
                       density="comfortable"
                       :placeholder="$t('Inserisci la tua password')"
                       active
                       class="mb-5"
                       v-model="formData.password"
                       :error="error"
                       :loading="loading"
                       max-errors="10"
                       :rules="[validators.required(), ...validators.passwordRules]"
                       @update:modelValue="form.validate()"></hidden-text-field>

    <hidden-text-field :label="$t('Conferma password')"
                       variant="outlined"
                       density="comfortable"
                       :placeholder="$t('Inserisci nuovamente la tua password')"
                       active
                       class="mb-5"
                       :error="error"
                       :loading="loading"
                       :rules="[validators.required(), passwordRepeatRule]"></hidden-text-field>

    <div class="d-flex flex-row align-center">
      <v-checkbox-btn color="secondary"
                      v-model="formData.newsletter"
                      style="max-width: 45px!important;">
        <template #label></template>
      </v-checkbox-btn>

      <p>{{ $t('Iscrivimi alla Newsletter') }} </p>
    </div>

    <div class="d-flex flex-row align-center">
      <v-checkbox-btn color="secondary"
                      v-model="privacy"
                      style="max-width: 45px!important;">
        <template #label></template>
      </v-checkbox-btn>

      <p>{{ $t('Accetto') }} <span @click.stop
              class="ms-1 text-primary font-weight-bold clickable "> {{ $t('Termini e Condizioni') }}</span></p>
    </div>


    <v-alert v-if="error"
             type="error"
             class="mt-3">{{ errorMsg }}</v-alert>

    <v-btn color="secondary"
           rounded="10"
           block
           type="submit"
           :disabled="!privacy"
           class="mt-5 text-uppercase">{{ $t('Avanti') }}</v-btn>


  </v-form>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { lgAndDown, xs } = useDisplay()
const privacy = ref(false)

const props = defineProps({
  formData: {
    type: Object,
  },
  onSubmit: {
    type: Function,
    required: true,
  }
})

const emit = defineEmits(['update:formData'])
const formData = ref(props.formData)
const form = ref(null)

watch(formData, (newVal) => {
  emit('update:formData', newVal)
}, { deep: true })


const validators = useValidators()
const error = ref(false)
const errorMsg = ref('')
const loading = ref(false)

const defaults = usePostDefaults()
const repo = useRepository().users

const $t = useI18n().t
const passwordRepeatRule = (v) => v === formData.value.password || $t('Le password non coincidono')

const submit = async () => {
  const valid = await form.value.validate()
  if (valid.valid) {

    const { addressToCoordinates } = useMapsUtils()
    const data = { ...formData.value }
    try {
      loading.value = true
      // build position from address
      const coordinates = await addressToCoordinates(data.address)
      data.location = {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat]
      }
      data.address = coordinates.address
      // radius conversion - to meters
      data.radius = defaults.searchRadiusByIndex(data.radius).value * 1000
      // create user
      const resp = await repo.create(data)
      if (resp.error) {
        error.value = true
        if (resp.data?.email === 'already_exists')
          errorMsg.value = $t('L\'email inserita è già in uso')
        else
          errorMsg.value = $t('Si è verificato un errore')
        loading.value = false
        return
      }
      props.onSubmit()
    } catch (e) {
      error.value = true
      errorMsg.value = $t('google_maps_error')
    } finally {
      loading.value = false
    }

  }
}

</script>
