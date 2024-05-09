<template>
    <div v-if="!xs" class="container d-flex flex-column justify-center align-center"
         :style="{ padding: xs ? '20px 5px 20px 5px' : '100px 0px 100px 0px' }">

        <v-card class="h-100"
                :style="{width: lgAndDown?'90%':'75%'}"
                elevation="3"
                style="border-radius: 38px!important;">
            <div class="d-flex flex-row w-100  justify-end h-100" >

                <div class="h-100 pa-5 w-100" :style="{'max-width': mobile?'100%':'60%'}">
                    <!-- MAIN SLOT -->
                    <slot />
                </div>


                <!-- SIDE BAR WITH LOGO -->
                <div v-if="!mobile"
                     class="bg-secondary h-100 d-flex flex-column justify-center align-center"
                     style="width: 40%;"
                     >

                    <v-img src="@/assets/images/logo/logo_white.svg"
                           width="60%"></v-img>

                </div>


            </div>
        </v-card>
    </div>

    <v-sheet v-else class="d-flex flex-column" color="secondary">
        <v-img class="mx-auto mt-15" src="@/assets/images/logo/logo_white.svg"
                           width="60%"></v-img>
        <v-sheet class="container-mobile   h-100 mt-5 px-3 pt-6">
            <slot />
        </v-sheet>

    </v-sheet>

</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile, xs, lgAndDown } = useDisplay();

const cardClasses = computed(() => {
    return {
        'w-100': mobile,
        // 'w-75': !mobile,
        'mx-15': mobile,
    }

})

</script>


<style scoped>
.container {
    background-image: url('@/assets/images/auth_background.png');
    min-width: 100vw;
    min-height: 100vh;
    background-position: center top;
    background-size: 100% auto;


}
.container-mobile {
 border-radius: 38px 38px 0px 0px;   
 
 
}

</style>