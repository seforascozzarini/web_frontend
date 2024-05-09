<template>
    <v-card v-if="!smAndDown"
            variant="flat"
            image="@/assets/images/no_post_banner.svg"
            height="378px">
        <v-card-text class="d-flex flex-column h-100 justify-center align-end me-10">
            <v-sheet width="30%" class="text-center">
                <p class="text-h4 font-weight-bold text-primary">{{ $t('Nessun Anncuncio Disponibile') }}</p>
                <p class=" text-grey">{{ $t('Non sembrano esserci annunci di questo tipo al momento. Riprova di nuovo più tardi o creane uno subito.') }}</p>
            </v-sheet>
        </v-card-text>
    </v-card>
    <v-card v-else
            variant="flat"
            color="#F0F0F0"
            height="378px">
        <v-card-text class="d-flex flex-column align-center justify-center h-100 px-3">
            <div class="text-center">
                <p class="text-h4 font-weight-bold text-primary">{{ $t('Nessun Anncuncio Disponibile') }}</p>
                <p class=" text-grey">{{ $t('Non sembrano esserci annunci di questo tipo al momento. Riprova di nuovo più tardi o creane uno subito.') }}</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile, smAndDown } = useDisplay()


</script>