
<template>
    <post-form-template type="edit"></post-form-template>
</template>

<script setup>
import { useDisplay } from 'vuetify';
definePageMeta({
    layout: 'form-post',
}); 

// onUnmounted(() => {
//     usePostEditStore().reset()  
// })

</script>