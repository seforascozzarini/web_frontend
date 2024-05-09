<template>


    <v-container fluid
                 @click="console.log(content)"
                 :class="{ 'm-content': !mobile }"
                 class="mb-15">

        <div ref="content">

            <p class="mt-5 mb-2 text-center font-weight-bold text-h6 text-primary">
                Tante aziende hanno già scelto di supportare il progetto
            </p>

            <p class="mb-5 text-center">Se sei interessato a scoprire come possiamo collaborare insieme dai un'occhiata a questa pagina</p>

            
            <img width="100%"
                 class="rounded-xl"
                 src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/sponsor/Screenshot_2023-12-22_at_10.33_1.png" />

           

        </div>




    </v-container>


</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const content = ref('')

</script>