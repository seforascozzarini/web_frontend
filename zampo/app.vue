<template>
  <v-app style="min-height: 100vh;">  
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import { useLocale } from 'vuetify'

// changing vuetify locale base on i18n locale
const { current } = useLocale()
current.value = useNuxtApp().$i18n.locale.value
</script>