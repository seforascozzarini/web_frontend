<template>
    <div class="postion-relative">

        <v-layout class=""
                  style="min-height: 100vh;">


            <v-navigation-drawer v-if="mobile"
                                 color="primary"
                                 class="position-fixed w-50"
                                 v-model="drawer"
                                 :class="{ 'w-100': xs }"
                                 disable-resize-watcher
                                 disable-route-watcher>
                <side-bar :drawer-func="() => drawer = false"></side-bar>
            </v-navigation-drawer>


            <app-bar :class="{ navbar: homepage && !mobile }"
                     :drawer-func="() => drawer = true"></app-bar>
            <v-main>
                <v-sheet v-if="showSearch"
                         class="position-absolute mx-auto"
                         style="z-index: 9999; top: 235px; left: 0; right: 0; width: 800px; border-radius: 60px !important;">
                    <search-bar></search-bar>
                </v-sheet>

                <v-sheet color="background"
                         :class="{ 'mt-15': !homepage && !mobile, }">
                    <v-container fluid  class="pa-0">

                        <slot />
                    </v-container>
                </v-sheet>
            </v-main>


                <v-footer class="position-absolute footer pa-0"
                app
                :color="useSiteStore().footerBackground" >
                
                <footer-content></footer-content>
            </v-footer>



        </v-layout>

        <common-alert class="common-alert"></common-alert>
    </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile, xs } = useDisplay()

const drawer = ref(false)

const homepage = computed(() => {
    return useRoute().path === '/'
})

const showSearch = computed(() => {
    return useRoute().name === 'explore' && ! mobile.value
})

// const onScroll = (e) => {
//     console.log(window.scrollY)
//     if (window.scrollY > 100) {
//         console.log(drawer.value)
//         drawer.value = true
//     } else {
//         drawer.value = false
//     }
// }
</script>

<style>
.navbar {
    border-radius: 0px 0px 40px 40px !important;
}



</style>