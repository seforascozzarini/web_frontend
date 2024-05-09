<template>
<v-text-field readonly v-model="text" :validation-value="current">

    <v-menu activator="parent" :close-on-content-click="false" v-model="open">

        <v-date-picker  v-model="_current" hide-header="">

            <template #actions>

                <v-btn @click="close">{{ $t('Esci') }}</v-btn>
                <v-btn @click="select">{{ $t('Seleziona') }}</v-btn>
            </template>
        </v-date-picker>
    </v-menu>

</v-text-field>
</template>

<script setup>
import { useDate } from 'vuetify';

const props = defineProps({
   modelValue: {
       type: Date,
   }
})

const emit = defineEmits(['update:modelValue'])

const date = useDate()
const $t = useI18n().t

const current = ref(props.modelValue??new Date())
const _current = ref(props.modelValue??new Date())
const open = ref(false)

const text = computed(() => {
    return date.format(new Date(current.value), 'normalDateWithWeekday')
})

const select = () => {
    current.value = _current.value
    emit('update:modelValue')
    open.value = false
}   

const close = () => {
    _current.value = current.value
    open.value = false
}

</script>