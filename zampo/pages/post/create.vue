
<template>
       <post-form-template type="create"></post-form-template>

</template>

<script setup>
import { useDisplay } from 'vuetify';
definePageMeta({
    layout: 'form-post',
});

const { smAndDown } = useDisplay()

onUnmounted(() => {
    usePostCreateStore().reset()  
})

</script>