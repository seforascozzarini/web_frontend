<template>
    <div class="d-flex flex-row align-center">

        <v-sheet :color="color"
                 style="border-radius: 100%;"
                 class="pa-3 me-3">
            <v-icon :color="iconColor"
                    icon="mdi-check"
                    size="35"></v-icon>
        </v-sheet>
        <p class="text-h5 font-weight-bold"
           :class="textclass">{{ props.text }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    step: Number,
    text: String,
    type: String
})

const store = props.type === 'create'? usePostCreateStore(): usePostEditStore()
const active = computed(() => store.currentStep === props.step)
const done = computed(() => store.currentStep > props.step)

const color = computed(() => (active.value || done.value) ? 'secondary' : 'grey')

const textclass = computed(() => (active.value || done.value) ? ['text-primary'] : ['text-grey'])

const iconColor = computed(() => {
    if (active.value) return 'secondary'
    if (done.value) return 'white'
    return 'grey'
})
    .value
</script>