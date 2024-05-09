<template>

    <v-dialog v-model="deleteDialog"
              max-width="600px">
        <v-card>
            <v-card-title class="mt-3">
                <p class="font-weight-bold text-primary">{{ $t('Sei sicuro di voler eliminare il post?') }}</p>
            </v-card-title>
            <v-divider class="mt-3"></v-divider>
            <v-card-text>
                {{ $t('Questa azione non può essere annullata') }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error"
                       @click="deleteDialog = false">{{ $t('Annulla') }}</v-btn>
                <v-btn color="primary"
                       @click="deletePost()">{{ $t('Elimina') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</template>

<script setup>
const props = defineProps({
    postId: Number,
    onsuccess: Function,
    modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue'])

const _deleteDialog = ref(null)
const deleteDialog = computed({
    get(){ return props.modelValue??_deleteDialog.value},
    set(val) {
        _deleteDialog.value = val
        emits('update:modelValue', val)
    }
})

const $t = useI18n().t

const deletePost = async () => {
    const repo = useRepository().posts
    const resp = await repo.remove(props.postId)
    if(resp.error){
        useMessages().error($t('Errore durante l\'eliminazione del post'))
        deleteDialog.value = false
        return
    }
    useMessages().success($t('Post eliminato con successo'))
    deleteDialog.value = false
    props.onsuccess()
}

</script>