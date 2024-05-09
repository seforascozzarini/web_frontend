<template>
  <v-form validate-on="submit"
          ref="form"
          @submit.prevent="submit">
    <!-- FIRST NAME -->
    <v-text-field :label="$t('Nome')"
                  variant="outlined"
                  density="comfortable"
                  :placeholder="$t('Inserisci il tuo nome')"
                  active
                  class="mb-5"
                  v-model="formData.first_name"
                  :rules="[validators.required()]"></v-text-field>

    <!-- LAST NAME -->
    <v-text-field :label="$t('Cognome')"
                  variant="outlined"
                  density="comfortable"
                  :placeholder="$t('Inserisci il tuo cognome')"
                  active
                  v-model="formData.last_name"
                  class="mb-5"
                  :rules="[validators.required()]"></v-text-field>

    <!-- ADDRESS -->
    <address-field :label="$t('Indirizzo')"
                   variant="outlined"
                   density="comfortable"
                   :placeholder="$t('Inserisci il tuo indirizzo di riferimento')"
                   active
                   class="mb-5"
                   v-model="formData.address"
                   key="signup"
                   :rules="[validators.required()]"></address-field>

    <!-- SEARCH RADIUS -->
    <p class="text-grey text-body-2">Raggio di ricerca</p>
    <v-slider :ticks="usePostDefaults().searchRadiusTicks"
              color="secondary"
              :show-ticks="xs ? false : 'always'"
              thumb-label="always"
              track-color="black"
              max="5"
              step="1"
              v-model="formData.radius"
              tick-size="4">
      <template v-slot:thumb-label="{ modelValue }">
        {{ usePostDefaults().searchRadiusByIndex(modelValue).value }}km
      </template>

      <template #tick-label="{ tick, index }">
        <p class="text-body-2"
           :class="{ 'text-caption': lgAndDown }">{{ tick.label }}</p>
      </template>
    </v-slider>



    <v-btn color="secondary"
           rounded="10"
           block
           type="submit"
           :loading="loading"
           class="mt-5 text-uppercase">{{ $t('Avanti') }}</v-btn>


  </v-form>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { lgAndDown, xs } = useDisplay()

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

const submit = async () => {
  const valid = await form.value.validate()
  if (valid.valid) {


    props.onSubmit()
  }
}

</script>
