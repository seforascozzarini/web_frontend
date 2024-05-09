<template>
    <v-btn variant="text"
           class="me-2"
           density="compact"
           :color="color"
           @click="click"
           :icon="action.icon"></v-btn>
</template>

<script setup>
const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    callback: {
        type: Function,
        required: true
    }
})

const { ACTIONS } = useCommentsDefaults()
const action = ACTIONS[props.type]

const $t = useI18n().t

const color = computed(() => {
    return   props.comment[action.userKey] === 0? 'grey': action.color
})

const click = async () => {
    const repo = useRepository().comments
    const resp = await repo.action(props.comment.id, action.value)
    if (resp.error){
        useMessages().error($t('Errore. Impossibile contattare il server.'))
        return
    }
    props.callback()
}

</script>