<template>

    <v-container fluid
                 :class="{ 'm-content': !mobile }">
        <v-row>
            <v-col cols="4">
                <v-img class="rounded-lg"
                       src="@/assets/images/support_us.png"></v-img>
            </v-col>
            <v-col>
                <p class="text-h5 font-weight-bold text-primary">
                    {{ $t('Ci sono molti modi in cui puoi supportare direttamente il nostro team ed il progetto di Zampo.') }}</p>

                <p class="text-grey mt-3">
                    {{ $t('Abbiamo diverse idee per il futuro, ognuna con lo scopo di migliorare la ricerca del tuo nimale e quindi rendendo questa brutta esperienza il più breve possibile.') }}
                </p>

                <!-- <p class="text-h5 mb-4 font-weight-bold text-primary mt-10">
                    {{ $t('Aiutaci a Crescere') }}
                </p>

                <v-btn prepend-icon="mdi-share-variant" size="x-large" rounded="md" variant="outlined" @click="window.navigator.share({url:'www.zampo.it'})">{{$t('Condividi')}}</v-btn> -->


                <p class="text-h5 font-weight-bold text-primary mt-10">
                    {{ $t('Donazioni') }}
                </p>
                <p class="text-grey mt-3">
                    {{ $t('Puoi anche diventare uno dei nostri migliori supporter effettuando una donazione.') }}</p>

                <v-dialog width="auto"
                          v-model="dialog">

                    <template v-slot:activator="{ props }">
                        <v-btn color="primary"
                               class="mt-5"
                               size="x-large"
                                 rounded="md"
                               prepend-icon="mdi-hand-coin"
                               variant="outlined"
                               v-bind="props"
                               >{{ $t('Fai una Donazione') }}</v-btn>
                    </template>

                    <donation-dialog :onclose="()=>dialog = false"></donation-dialog>

                </v-dialog>

            </v-col>
        </v-row>
    </v-container>



</template>


<script setup>
import { useDisplay } from 'vuetify';

const dialog = ref(false)   

const { mobile } = useDisplay()
const $t = useNuxtApp().$i18n.t
console.log(useNuxtApp())
useSiteStore().setPageInfo($t('Sostienici'), $t('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quam quidem similique obcaecati neque iusto voluptatem provident autem. Rem, soluta. Fugiat eveniet quas repudiandae nihil ullam velit deserunt alias quisquam.'))


</script>