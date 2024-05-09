<template>
    <v-form validate-on="submit"
            ref="form"
            class="d-flex flex-column justify-space-between h-100"
            @submit.prevent="submit">
        <div>
            <image-gallery-input class="mb-2"
                                 v-model="store.formData.images"
                                 :rules="[validators.min(1, $t('Devi selezionarne almeno'))]"></image-gallery-input>

            <!-- TYPE -->
            <v-select density="compact"
                      :rules="[validators.required()]"
                      variant="outlined"
                      class="mb-1"
                      v-model="store.formData.pet_type"
                      :items="petTypeSelect"
                      :label="$t('Tipo')"></v-select>
            <!-- NAME -->
            <v-text-field density="compact"
                          :rules="[validators.max(100)]"
                          variant="outlined"
                          class="mb-1"
                          v-model="store.formData.pet_name"
                          :label="$t('Nome')"></v-text-field>
            <!-- SEX -->
            <v-select density="compact"
                      :rules="[validators.required()]"
                      variant="outlined"
                      class="mb-1"
                      v-model="store.formData.gender"
                      :items="defaults.petGenderSelect.filter(item => item.value !== '')"
                      :label="$t('Sesso')"></v-select>
            <!-- AGE -->
            <p class="text-grey text-body-2 mb-1 mt-3">{{ $t('Età') }}</p>
            <v-range-slider v-model="store.formData.age"
                            color="secondary"
                            :rules="[validators.required()]"
                            track-color="black"
                            thumb-label
                            :max="30"
                            :min="0"
                            :step="1"
                            hide-details
                            class="align-center mb-10"></v-range-slider>
            <!-- MICROCHIP -->
            <v-select density="compact"
                      :rules="[validators.required()]"
                      variant="outlined"
                      class="mb-1"
                      v-model="store.formData.microchip"
                      :items="defaults.petMicrochipSelect.filter(item => item.value !== '')"
                      :label="$t('Microchip')"></v-select>
            <!-- STERILIZED -->
            <v-select density="compact"
                      :rules="[validators.required()]"
                      variant="outlined"
                      class="mb-1"
                      v-model="store.formData.sterilised"
                      :items="defaults.petSterilizedSelect.filter(item => item.value !== '')"
                      :label="$t('Sterilizzato/a')"></v-select>
            <!-- SPECIFIC MARKS -->
            <v-textarea density="compact"
                        :rules="[validators.max(500, $t('Massimo caratteri:'))]"
                        variant="outlined"
                        class="mb-1"
                        no-resize
                        v-model="store.formData.specifc_marks"
                        :label="$t('Segni particolari')"></v-textarea>
        </div>

        <div :class="btnClasses">
            <v-btn rounded="md"
                   :block="smAndDown"
                   @click="store.prevStep()"
                   variant="outlined"
                   class="me-auto text-uppercase">{{ $t('Indietro') }}</v-btn>
            <v-btn color="secondary"
                   rounded="md"
                   type="submit"
                   width="300"
                   :class="{ 'mt-3': smAndDown }"
                   :block="smAndDown"
                   class="ms-auto text-uppercase">{{ $t('Continua') }}</v-btn>
        </div>

    </v-form>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const props = defineProps({
    type: String
})

const { smAndDown } = useDisplay()

const store = props.type === 'create' ? usePostCreateStore() : usePostEditStore()
const validators = useValidators()
const defaults = usePostDefaults()

const $t = useI18n().t
const petTypeSelect = defaults.petTypeSelect.filter(item => item.value !== '')
const form = ref(null)



const submit = async () => {
    const valid = await form.value.validate()
    if (valid.valid) {


        store.nextStep()
    }
}

const btnClasses = computed(() => {
    const classes = ['d-flex']
    if (smAndDown.value)
        classes.push(...['flex-column', 'w-100'])
    else
        classes.push('flex-row')
    return classes
})

</script>