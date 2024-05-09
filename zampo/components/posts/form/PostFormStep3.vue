<template>
    <v-form validate-on="submit"
            ref="form"
            class="d-flex flex-column justify-space-between h-100">
        <div>
            <!-- TEXT -->
            <v-textarea density="compact"
                        :rules="[validators.min(100, $t('Minimo caratteri:'))]"
                        variant="outlined"
                        class="mb-1"
                        no-resize
                        v-model="store.formData.text"
                        :label="$t('Testo Annuncio')"></v-textarea>

            <p class="font-weight-bold mb-3">{{ $t('Come Contattarti') }}</p>

            <!-- TELEPHONE -->
            <v-text-field density="compact"
                          variant="outlined"
                          class="mb-1"
                          type="number"
                          v-model="store.formData.contacts.phone"
                          :label="$t('Telefono')"></v-text-field>
            <!-- EMAIL -->
            <v-text-field density="compact"
                          variant="outlined"
                          class="mb-1"
                          :rules="[validators.required(), validators.email()]"
                          v-model="store.formData.contacts.email"
                          :label="$t('Email')"></v-text-field>


        </div>

        <div class="d-flex flex-row justify-space-between"
             :class="btnClasses">
            <v-btn rounded="md"
                   @click="store.prevStep()"
                   variant="outlined"
                   :block="smAndDown"
                   class="me-auto">{{ $t('Indietro') }}</v-btn>

            <div :class="smAndDown ? [] : ['d-flex', 'flex-row']">
                <v-btn :disabled="loading"
                       :loading="loading"
                       rounded="md"
                       variant="outlined"
                       @click="saveDraft()"
                       :class="{ 'mt-3': smAndDown }"
                       :block="smAndDown"
                       class="text-uppercase me-2">{{ $t('Salva Bozza') }}</v-btn>
                <v-btn color="secondary"
                       :disabled="loading"
                       :loading="loading"
                       rounded="md"
                       @click="save()"
                       width="250"
                       :class="{ 'mt-3': smAndDown }"
                       :block="smAndDown"
                       class="ms-auto text-uppercase">{{ $t('Continua') }}</v-btn>
            </div>
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
const postTypeItems = [
    { title: $t('Ho perso il mio animale'), value: 1 },
    { title: $t('Ho trovato un animale'), value: 2 },
]

const form = ref(null)



const loading = ref(false)

const saveDraft = async () => {
    await submit(true)
}

const save = async () => {
    await submit(false)
}


const submit = async (draft) => {
    const valid = await form.value.validate()
    if (valid.valid) {

        loading.value = true
        await store.save(draft)
        loading.value = false
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