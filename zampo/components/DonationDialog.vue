<template>

    <v-card>
        <v-card-title class="pt-3 text-h6 font-weight-bold text-primary">{{ $t('Fai una Donazione') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="">
            <v-form validate-on="submit"
                    ref="form"
                    @submit.prevent="next"
                    v-if="step == 1">

                <v-text-field :label="$t('Importo')"
                              v-model="amount"
                              variant="outlined"
                              density="comfortable"
                              prefix="€"
                              :rules="[useValidators().required(), useValidators().minNumber(1)]"
                              type="number"></v-text-field>

                <v-text-field :label="$t('Email')"
                              v-model="email"
                              variant="outlined"
                              density="comfortable"
                              :rules="[useValidators().email()]"></v-text-field>
                <p class="text-grey text-caption">
                    {{ $t('Per effettuare una donazione anonima puoi non inserire la tua email') }}.</p>
                <v-btn block
                       rounded="lg"
                       type="submit"
                       class="mt-10">{{ $t('Avanti') }}</v-btn>

            </v-form>

            <div v-else>
                <p class="text-h6 font-weight-bold text-grey text-center">{{ $t('Hai deciso di donare') }}</p>
                <p class="text-h3 font-weight-bold text-primary text-center mt-3">€{{ amount }}</p>
                <p class="text-grey text-center mt-4 mb-6">{{ $t('Selezione il Metodo di Pagamento') }}</p>

                <div  
                     style="width:100%;"
                     id="paypal-checkout" />
            </div>
            <v-btn block
                   rounded="lg"
                   variant="outlined"
                   @click="close()"
                   class="mt-3">{{ $t('Chiudi') }}</v-btn>
        </v-card-text>
    </v-card>


</template>


<script setup>
const props = defineProps({

    onclose: {
        type: Function,
        required: true

    },

})

const $t = useI18n().t

const step = ref(1)
const form = ref(null)
const email = ref('')
const amount = ref(1)

const close = () => {
    props.onclose()
}

const next = async () => {
    await form.value.validate()
    if (!form.value.isValid) return
    step.value = 2
    await new Promise(resolve => setTimeout(resolve, 100))
    usePaypalButton({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: amount.value,
                        },
                    },
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING',
                },
            });
        },
        // element: '#paypal-checkout', => default
        onApprove: async (data, actions) => {
            const errorMsg = $t('Errore durante il pagamento')
            try {
                const details = await actions.order?.capture();
                console.log({ details })    
                const body = {
                    payment_info: details,
                    email: email.value,
                    amount: amount.value,
                    method: 1,
                }
                const method = useRepository().payments.donation
                const resp = await method(body)
                if(resp.error){
                    console.log({resp})
                    useMessages().error(errorMsg)
                    props.onclose()
                    return
                }
                useMessages().success($t('Donazione effettuata con successo'))


            } catch (error) {
                useMessages().error(errorMsg)
            }
            props.onclose()
        },
    })
}


</script>

