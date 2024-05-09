<template>
    <div class="h-100 w-100 d-flex flex-column align-center justify-center">

        <p v-if="!loading"
           class="text-center text-h4 font-weight-bold w-100 text-primary mt-3 ">
            {{ $t('Il tuo account è stato attivato!') }}
        </p>
        <p v-if="!loading"
           class="text-center font-weight-bold w-100 text-grey mt-3 mb-10">
            {{ $t('Addesso potrai effettuare il login e contribuire attivamente alla community di Zampo.') }}
        </p>


        <v-skeleton-loader v-if="loading"
                           class="w-100"
                           type="heading"></v-skeleton-loader>
        <v-skeleton-loader v-if="loading"
                           class="w-100"
                           type="subtitle"></v-skeleton-loader>

        <v-btn :loading="loading"
               color="secondary"
               class="w-100 text-uppercase"
               @click="navigateTo('/auth/login')"
               rounded="10">{{ $t('Effettua il login') }}</v-btn>
        <v-btn :loading="loading"
               color="secondary"
               class="w-100 text-uppercase mt-3"
               @click="navigateTo('')"
               rounded="10">{{ $t('Vai alla Home') }}</v-btn>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'auth'
})


const loading = ref(false)

const $t = useI18n().t

const activate = async () => {
    loading.value = true
    const repo = useRepository().users

    try {
        const resp = await repo.activate(useRoute().params.token)
        if (resp.error) {
            throw showError({
                message: resp.data,
                statusCode: resp.status,
                statusMessage: resp.statusText,
            })
        }
    } catch (e) {
        throw showError({
            fatal: true,
            statusCode: 400,
            statusMessage: $t('Impossibile attivare l\'account'),
        })

    } finally {
        loading.value = false
    }
}

activate()

</script>