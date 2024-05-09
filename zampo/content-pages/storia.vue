<template>


    <v-container fluid
                 @click="console.log(content)"
                 :class="{ 'm-content': !mobile }"
                 class="mb-15">

        <div ref="content">

            <p class="mt-5 mb-2">Sfruttando la tecnologia in nostro possesso, la nostra passione per l'informatica e la
                solidarietà di
                tutti coloro che amano gli animali nasce il primo portale in Italia dedicato al ritrovamento di animali
                smarriti.</p>

            <p class="mb-2">Siamo un gruppo di giovani ragazzi e ragazze, professionisti nel campo dell’informatica, che
                oltre a
                questa passione, condivide
                l’amore per gli animali. </p>

            <p class="mb-2">Un giorno, uno di noi smarrisce il proprio animale. Pubblichiamo quindi vari annunci sui
                social, sul web
                e anche su alcune bacheche al fine di cercare di ritrovare l’animale. In particolare, l’annuncio creato
                su un gruppo Facebook ha fatto sì che una volontaria
                dell’ENPA riuscisse a mettersi in contatto con il padrone dell’animale smarrito.</p>

            <p class="mb-5">Non c’è nulla da dire: la forza e la solidarietà della community è riuscita a fare in modo
                che \
                l’animale smarrito tornasse a casa!</p>

            <img width="100%"
                 class="rounded-xl"
                 src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/storia/image_2.png" />

            <p class="mb-2 mt-4">Questa situazione spiacevole ha innescato nella nostra mente l’idea di trovare una soluzione migliore ed
                al passo con i tempi che permettesse di ritrovare gli animali smarriti in maniera veloce ed efficace.
            </p>

            <p class="mb-2">Le nostre esperienze accumulate negli anni e lo smarrimento di un nostro animale domestico vissuto sulla
                nostra pelle, ci hanno sensibilizzato all'argomento, portandoci a cercare una soluzione tecnologica, ed
                alla portata di tutti, ad un tema di questo genere.</p>

            <p class="mb-2">Pensiamo che le soluzioni a disposizione fino ad ora siano molto dispersive: si copia e incolla
                l’annuncio da un gruppo social all’altro, sperando che più gente possibile possa vedere il contenuto e
                possa interagirvi per far sì che il post rimanga tra i primi visibili nella pagina.</p>
            <p class="mb-2">

                Al fine di evitare di avere annunci sparsi in diversi siti web o in diverse pagine social, ma
                soprattutto di non rischiare che questo si perda o scompaia all’interno di queste ultime, per via del
                numero di annunci simili o degli algoritmi utilizzati, abbiamo pensato di creare una alternativa: un
                unico portale dedicato alla ricerca di animali smarriti e ritrovati in modo da aiutare tutti coloro che
                si trovano in una situazione analoga a quella da noi vissuta.
                L’obiettivo, una volta diffuso, è che il portale sia l’unico punto di riferimento per chi smarrisce o
                trova un animale, facendo sì che chiunque perda o trovi un animale possa postare l’annuncio sul portale
                e che il padrone possa consultare un solo sito per ritrovare il proprio animale.
            </p>

            <p class="mb-2">Il portale vuole agevolare la persona che ha smarrito il suo migliore amico a diffondere la notizia in un
                portale dove molti altri utenti, sensibili alla causa, saranno a disposizione per aiutarla a ritrovarlo.
                Insieme alla community questo portale diventa uno strumento efficace nel ritrovamento di animali
                smarriti.</p>

        </div>




    </v-container>


</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const content = ref('')

</script>