<template>


    <v-container fluid
                 @click="console.log(content)"
                 :class="{ 'm-content': !mobile }"
                 class="mb-15">

        <div ref="content">

            <img width="100%"
                 class="rounded-xl"
                 src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/il-team/team-main.png" />

            <p class="mt-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis pariatur saepe eum
                exercitationem illum culpa ad magni
                accusantium sequi quasi dignissimos earum, iusto assumenda inventore. Voluptates neque repellat
                praesentium enim.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi necessitatibus modi placeat possimus?
                Laborum amet architecto accusamus unde maxime,
                provident dolorem sint omnis, vel accusantium rem quibusdam ipsa commodi inventore.
            </p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis pariatur saepe eum exercitationem illum
                culpa ad magni
                accusantium sequi quasi dignissimos earum, iusto assumenda inventore. Voluptates neque repellat
                praesentium enim.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi necessitatibus modi placeat possimus?
                Laborum amet architecto accusamus unde maxime,
                provident dolorem sint omnis, vel accusantium rem quibusdam ipsa commodi inventore.
            </p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis pariatur saepe eum exercitationem illum
                culpa ad magni
                accusantium sequi quasi dignissimos earum, iusto assumenda inventore. Voluptates neque repellat
                praesentium enim.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi necessitatibus modi placeat possimus?
                Laborum amet architecto accusamus unde maxime,
                provident dolorem sint omnis, vel accusantium rem quibusdam ipsa commodi inventore.
            </p>

            <v-container fluid
                         class="pa-0 mt-10">

                <v-row>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <img class="rounded-xl"
                             width="100%"
                             src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/il-team/001_img_person_1.png"
                             alt="">

                        <p class="mt-3 text-h6 font-weight-bold text-primary">Nome</p>
                        <p class="mt-1  text-grey">Ruolo</p>

                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <img class="rounded-xl"
                             width="100%"
                             src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/il-team/001_img_person_1.png"
                             alt="">

                        <p class="mt-3 text-h6 font-weight-bold text-primary">Nome</p>
                        <p class="mt-1  text-grey">Ruolo</p>

                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <img class="rounded-xl"
                             width="100%"
                             src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/il-team/001_img_person_1.png"
                             alt="">

                        <p class="mt-3 text-h6 font-weight-bold text-primary">Nome</p>
                        <p class="mt-1  text-grey">Ruolo</p>

                    </v-col>

                    <v-col cols="12"
                           xs="12"
                           sm="12"
                           md="6"
                           lg="6"
                           xl="6">
                        <img class="rounded-xl"
                             width="100%"
                             src="https://zampo.s3.eu-north-1.amazonaws.com/media/content/assets/il-team/001_img_person_1.png"
                             alt="">

                        <p class="mt-3 text-h6 font-weight-bold text-primary">Nome</p>
                        <p class="mt-1  text-grey">Ruolo</p>

                    </v-col>

                </v-row>

            </v-container>

        </div>




    </v-container>


</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const content = ref('')

</script>