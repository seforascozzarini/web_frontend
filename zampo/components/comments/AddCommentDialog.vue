<template>
<v-card>
    <v-card-title>
        <p class="text-h5 text-primary font-weight-bold py-3">{{ $t('Aggiungi il tuo commento') }}</p>
    </v-card-title>

    <v-card-text>

            <v-textarea auto-grow variant="outlined" v-model="comment"></v-textarea>

            <div class="d-flex flex-row justify-end align-center">

                <v-btn color="error" class="me-3" @click="props.onclose()">{{ $t('Annulla') }}</v-btn>
                <v-btn color="primary" :disabled="!valid" @click="submit()">{{ $t('Aggiungi') }}</v-btn>
            </div> 
 
    </v-card-text>

</v-card>

</template>

<script setup>
const props = defineProps({ 
    callback: {
        type: Function,
        required: true
    },
    onclose: {
        type: Function,
        required: true
    }
})


const comment = ref('')
const valid = computed(() => comment.value.trim().length > 0)

const submit = () => {
    props.callback(comment.value.trim())
}

</script>