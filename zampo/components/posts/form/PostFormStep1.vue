<template>
    <v-form validate-on="submit"
            ref="form"
            class="d-flex flex-column justify-space-between h-100"
            @submit.prevent="submit">

        <div>
            <v-select v-model="store.formData.type"
                      variant="outlined"
                      class="mb-3"
                      :label="$t('Perchè stai creando questo annuncio?')"
                      :items="postTypeItems"
                      :rules="[validators.required()]"></v-select>
            <address-field v-model="store.formData.location"
                           variant="outlined"
                           class="mb-3"
                           :label="$t('Dove')"
                           id="post-create"
                           :rules="[validators.required()]"></address-field>
            <date-field v-model="store.formData.event_date"
                        variant="outlined"
                        :label="$t('Quando')"></date-field>
        </div>


        <div :class="smAndDown ? [] : ['d-flex', 'flex-row']">
            <v-btn :disabled="loading"
                   :loading="loading"
                   rounded="md"
                   variant="outlined"
                   @click="$router.back()"
                   :class="{ 'mt-3': smAndDown }"
                   :block="smAndDown"
                   class="text-uppercase me-2">{{ $t('Indietro') }}</v-btn>
            <v-btn color="secondary"
                   :disabled="loading"
                   :loading="loading"
                   rounded="md"
                   type="submit"
                   width="250"
                   :class="{ 'mt-3': smAndDown }"
                   :block="smAndDown"
                   class="ms-auto text-uppercase">{{ $t('Continua') }}</v-btn>
        </div>

    </v-form>

</template>

<script setup>
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay()


const props = defineProps({
    type: String
})

const store = props.type === 'create' ? usePostCreateStore() : usePostEditStore()
const validators = useValidators()

const $t = useI18n().t
const postTypeItems = [
    { title: $t('Ho perso il mio animale'), value: 1 },
    { title: $t('Ho trovato un animale'), value: 2 },
]

const form = ref(null)

const submit = async () => {
    const valid = await form.value.validate()
    if (form.value.isValid) {

        store.nextStep()
    }
}

</script>