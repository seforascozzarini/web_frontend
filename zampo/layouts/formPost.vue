<template>
        <v-container fluid
                     class="pa-0 h-100 position-relative"
                     style="z-index:20" v-if="!mobile">
            <v-row no-gutters
                   class="h-100">
                <v-col cols="8"
                       class=""
                       style="background-color: #EEF3F9;"></v-col>
                <v-col class="bg-secondary h-100"></v-col>
            </v-row>
            <div class="content">
                <slot />
            </div>
            <common-alert class="common-alert"></common-alert>
        </v-container>

        <v-container v-else fluid class="pa-0 h-100 position-relative bg-secondary">
        <slot/>

        </v-container>

</template>

<script setup>
import { useDisplay } from 'vuetify';
 

const { mobile } = useDisplay()</script>

<style scoped>
.content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 100px;
}
</style>