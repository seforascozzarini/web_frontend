<template>


    <v-container fluid
                 @click="console.log(content)"
                 :class="{ 'm-content': !mobile }"
                 class="mb-15">

        <div ref="content">

            <p class="text-h3  font-weight-bold text-primary text-center">Il primo portale in Italia dedicato al
                ritrovamento di animali smarriti</p>


            <p class="mb-3 mt-5 text-grey">L’applicativo nasce da un’esigenza concreta maturata di persone che un giorno
                si sono trovate a cercare
                il proprio animale senza sapere dove trovarlo. E se lo avesse trovato qualcuno che non sa che ha già una
                casa? Cosa potrebbe consultare per capire chi sia il suo padrone e cosa fare?</p>

            <p class="mb-15 text-grey">Partendo proprio da questa esigenza, Zampo vuole essere la piattaforma italiana
                di
                riferimento, in modo
                da inglobare tutti gli annunci sparsi in rete, tra siti e social network, e ponendosi come obiettivo di
                far riabbracciare ogni animale smarrito con il proprio migliore amico.</p>

            <p class="font-weight-bold text-h4 text-primary text-center">Le Nostre Caratteristiche</p>

            <v-container fluid
                         class="pa-0 mt-5">
                <v-row>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <v-card rounded="xl"
                                elevation="10"
                                class="pa-5">
                            <v-card-text class="text-center">

                                <v-sheet color="secondary"
                                         width="fit-content"
                                         class="pa-4 mx-auto"
                                         rounded="xl">
                                    <v-icon size="40">mdi-star</v-icon>

                                </v-sheet>

                                <p class="text-primary font-weight-bold text-h5 text-primary mt-10">Più informazioni,
                                    più
                                    possibilità di ritrovare il tuo animale</p>

                                <p class="text-start text-grey mt-10">Zampo mette la tecnologia a disposizione delle
                                    persone per fare in modo che ogni padrone possa riabbracciare il proprio animale. Ti
                                    guideremo in fase di creazione del tuo annuncio, così da inserire quante più
                                    informazioni possibili, mentre l’algoritmo di ricerca farà una scansione delle
                                    informazioni e le metterà a confronto con altri annunci simili al tuo, tenendo in
                                    particolare considerazione le segnalazioni più vicine a te.</p>

                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <v-card rounded="xl"
                                elevation="10"
                                class="pa-5 h-100">
                            <v-card-text class="text-center">

                                <v-sheet color="secondary"
                                         width="fit-content"
                                         class="pa-4 mx-auto"
                                         rounded="xl">
                                    <v-icon size="40">mdi-eye</v-icon>

                                </v-sheet>

                                <p class="text-primary font-weight-bold text-h5 text-primary mt-10">Il tuo annuncio
                                    sempre visibile</p>

                                <p class="text-start text-grey mt-10">Evitiamo di creare molteplici annunci sparsi in
                                    diversi siti web o in diverse pagine social, ma soprattutto non vogliamo rischiare
                                    che l'annuncio si perda o scompaia all'interno di quest'ultime, per via del numero
                                    di annunci analoghi o degli algoritmi utilizzati. Con Zampo il tuo annuncio resterà
                                    sempre visibile e non vi sarà nessun algoritmo che lo nasconda o che lo faccia
                                    sprofondare all'interno della piattaforma.</p>

                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <v-card rounded="xl"
                                elevation="10"
                                class="pa-5 h-100">
                            <v-card-text class="text-center ">

                                <v-sheet color="secondary"
                                         width="fit-content"
                                         class="pa-4 mx-auto"
                                         rounded="xl">
                                    <v-icon size="40">mdi-map-marker</v-icon>

                                </v-sheet>

                                <p class="text-primary font-weight-bold text-h5 text-primary mt-10">La tua zona di
                                    interesse</p>

                                <p class="text-start text-grey mt-10">Il profilo racchiude le tue informazioni di base,
                                    che potrai modificare in qualsiasi momento. Potrai visualizzare i dati di accesso e
                                    cambiarli a piacimento, inoltre sarà possibile specificare il tuo indirizzo di
                                    residenza e/o domicilio ed un raggio di ricerca preferito, in modo da creare una
                                    zona di particolare interesse per te e mostrarti in primo battuta gli annunci degli
                                    animali smarriti o ritrovati nella tua zona. Sarà anche possibile ricevere una
                                    notifica ogni volta che viene inserito un nuovo annuncio relativo alla tua area.</p>

                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <v-card rounded="xl"
                                elevation="10"
                                class="pa-5 h-100">
                            <v-card-text class="text-center">

                                <v-sheet color="secondary"
                                         width="fit-content"
                                         class="pa-4 mx-auto"
                                         rounded="xl">
                                    <v-icon size="40">mdi-home</v-icon>

                                </v-sheet>

                                <p class="text-primary font-weight-bold text-h5 text-primary mt-10">Finalmente a Casa
                                </p>

                                <p class="text-start text-grey mt-10">Zampo vuole anche raccontare di quelle storie
                                    finite con il ritrovamento dell’animale domestico. Una sezione dedicata raccoglie
                                    tutti questi racconti con il fine di riportare ad altri quanto la piattaforma sia
                                    stata uno strumento chiave nel ritrovamento dell’animale e ringraziare la community
                                    che lo ha reso possibile.</p>

                            </v-card-text>
                        </v-card>
                    </v-col>


                </v-row>
            </v-container>
            <div style="min-height: 310px; margin-top: 100px;">

                <v-sheet style="position:absolute; width: 100vw; height: 100%; left: 0; margin-top: 10px"
                         color="accent"
                         class="pt-10">

                    <v-container fluid>
                        <v-row>
                            <v-col cols="12"
                                   sm="12"
                                   xs="12"
                                   md="8"
                                   lg="8"
                                   xl="8">
                                <p class="text-primary text-center font-weight-bold text-primary text-h5">Un'unica
                                    piattaforma a tua disposizione</p>
                                <p class="text-center text-grey mb-5 mt-5">Puoi avere tutte le funzionalità della
                                    piattaforma
                                    a portata di mano in qualsiasi
                                    momento, scaricando l'applicazione per dispositivi mobile, disponibile sia per iOS
                                    che Android.</p>
                                <p class="text-center text-grey mb-5">Non perderti alcuna notifica o annuncio, scarica
                                    l'app Zampo dagli Store!</p>

                                <div class="d-flex flex-row align-center justify-center mt-10">

                                    <img width="150"
                                         class="me-3"
                                         src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/zampo-intro/Frame_2497.png" />
                                    <img width="150"
                                         class=""
                                         src="https://zampo.s3.amazonaws.com/media/content/assets/zampo-intro/Frame_2498.png" />
                                </div>
                            </v-col>

                            <v-col class="d-xs-none d-sm-none d-md-block d-lg-block d-xl-block text-center">
                                <v-img width="240px"
                                     class="mx-auto"
                                     src="https://zampo.s3.amazonaws.com/media/content/assets/zampo-intro/image_3.png" />


                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </div>


        </div>




    </v-container>


</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const content = ref('')

</script>