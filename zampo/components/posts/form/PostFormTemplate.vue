
<template>
    <v-container fluid
                 class="h-100"
                 v-if="!mobile">

        <v-row class="h-100">
            <v-col cols="5">
                <p class="text-h4 text-primary font-weight-bold"
                   style="margin-bottom: 120px;">{{ $t('Crea Annuncio') }}</p>
                <post-form-step :type="props.type"
                                class="mb-8"
                                :step="1"
                                :key="store.currentStep"
                                :text="$t('Dove e Quando')"></post-form-step>
                <post-form-step :type="props.type"
                                class="mb-8"
                                :step="2"
                                :key="store.currentStep"
                                :text="$t('Animale')"></post-form-step>
                <post-form-step :type="props.type"
                                class=""
                                :step="3"
                                :key="store.currentStep"
                                :text="$t('Altre Info')"></post-form-step>

            </v-col>
            <v-col>

                <v-card class="h-100"
                        rounded="xl">
                    <v-card-text class="pa-15 h-100">

                        <post-form-step-1 :type="props.type"
                                          v-if="store.currentStep === 1"></post-form-step-1>
                        <post-form-step-2 :type="props.type"
                                          v-if="store.currentStep === 2"></post-form-step-2>
                        <post-form-step-3 :type="props.type"
                                          v-if="store.currentStep === 3"></post-form-step-3>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <div v-else
         class="h-100">

        <p class="text-h3 font-weight-bold text-center mt-15">{{ $t('Crea Annuncio') }}</p>

        <v-sheet class="h-100 mt-15 pa-15"
                 color="surface"
                 style="border-radius: 38px 38px 0 0;">
            <div style="max-height: 85%; height: 100%;">
                <post-form-step-1 :type="props.type"
                                  v-if="store.currentStep === 1"></post-form-step-1>
                <post-form-step-2 :type="props.type"
                                  v-if="store.currentStep === 2"></post-form-step-2>
                <post-form-step-3 :type="props.type"
                                  v-if="store.currentStep === 3"></post-form-step-3>
            </div>
        </v-sheet>

    </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {mobile} = useDisplay()

const props = defineProps({
    type: String
})


const store = props.type === 'create'? usePostCreateStore(): usePostEditStore()

store.init(useRoute().params.id)


</script>