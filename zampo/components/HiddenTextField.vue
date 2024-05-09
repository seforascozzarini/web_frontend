<template>
    <v-text-field :type="type">

        <template #append-inner>
            <v-btn variant="text" color="light_grey" :icon="icon" @click="visible = !visible"></v-btn>

        </template>
    </v-text-field>
</template>

<script setup>


const visible = ref(false)
const type = computed(() => visible.value ? 'text' : 'password')
const icon = computed(() => visible.value ? 'mdi-eye-off' : 'mdi-eye')
</script>