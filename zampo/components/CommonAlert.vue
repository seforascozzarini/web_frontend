<template>
    <div>
        <v-slide-x-transition group >
            
            <div v-for="msg in store.messages"
            class="mb-2"
            :key="msg.id">
            
            <v-alert class="position-relative" :style="style"
            closable
            :type="msg.type"
            :title="msg.title"
            :text="msg.text"
            @click:close="store.remove(msg.id)">
            <v-progress-linear v-if="msg.progress > -.05"
                class="position-absolute"
                :model-value="msg.progress * 100"
                height="10"></v-progress-linear>
            </v-alert>
        </div>
    </v-slide-x-transition>
</div>
</template>

<script setup>
import { useDisplay } from 'vuetify';
const store = useMessages()
const {smAndDown} = useDisplay()
const style = computed(()=>{
    return {
        width: smAndDown.value ? '100vw' : '50vw',
        "padding-left": '30px' 
    }
})
</script>


