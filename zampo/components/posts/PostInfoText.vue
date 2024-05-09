<template>
    <div>
        <p>{{ props.label }}</p>
        <v-sheet class="border border-opacity-25 text-grey pa-3 rounded">
            <v-skeleton-loader class="text" v-if="props.loading" type="text"></v-skeleton-loader>
            <p v-else> {{ props.value }}</p>
        </v-sheet>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    value: String,
    loading: {
        type: Boolean,
        default: false,
    },
})
</script>