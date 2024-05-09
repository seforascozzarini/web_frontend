<template>
    <v-form  validate-on="submit"  @submit.prevent="submit"
            ref="form">
        <v-container fluid
                     class="">
            <v-row>
                <v-col>
                    <p class="text-primary font-weight-bold text-h6">{{ $t('Impostazioni') }}</p>
                </v-col>
            </v-row>

            <v-row>

                <v-col v-bind="cols">
                    <!-- FIRST NAME -->
                    <v-text-field variant="outlined"
                                  density="comfortable"
                                  :label="$t('Nome')"
                                  v-model="store.newUser.first_name">
                    </v-text-field>

                </v-col>
                <v-col v-bind="cols">
                    <!-- LAST NAME -->
                    <v-text-field variant="outlined"
                                  density="comfortable"
                                  :label="$t('Cognome')"
                                  v-model="store.newUser.last_name">
                    </v-text-field>

                </v-col>
                <v-col v-bind="cols">
                    <!-- EMAIL -->
                    <v-text-field variant="outlined"
                                  density="comfortable"
                                  :label="$t('Indirizzo email')"
                                  :readonly="true"
                                  v-model="store.user.email">
                    </v-text-field>

                </v-col>

                <v-col v-bind="cols">
                    <!-- NEWSLETTER -->
                    <v-switch color="secondary"
                    v-model="store.newUser.newsletter"
                              :label="$t('Iscrivimi alla newsletter')"></v-switch>

                </v-col>

                <v-col v-bind="cols">
                    <!-- ADDRESS -->
                    <address-field variant="outlined"
                                   @update:model-value="updateAddress"
                                   density="comfortable"
                                   :label="$t('Domicilio e/o residenza')"
                                   v-model="store.newUser.address"></address-field>

                    <!-- SEARCH RADIUS -->
                    <p class="text-grey text-body-2 mt-5">Raggio di ricerca</p>
                    <v-slider :ticks="usePostDefaults().searchRadiusTicks"
                              color="secondary"
                              :show-ticks="xs ? false : 'always'"
                              thumb-label="always"
                              track-color="black"
                              max="5"
                              step="1"
                              @update:model-value="updateMapContent"
                              v-model="store.newUser.radius"
                              tick-size="4">
                        <template v-slot:thumb-label="{ modelValue }">
                            {{ usePostDefaults().searchRadiusByIndex(modelValue).value }}km
                        </template>

                        <template #tick-label="{ tick, index }">
                            <p class="text-body-2"
                               :class="{ 'text-caption': lgAndDown }">{{ tick.label }}</p>
                        </template>
                    </v-slider>
                </v-col>

                <v-col v-bind="cols">
                    <div id="map"></div>

                </v-col>


            </v-row>

            <v-row class="mt-10">
                <v-col>
                    <v-btn color="secondary" @click="passwordDialog=true">{{ $t('Aggiorna la password') }}</v-btn>
                </v-col>
                <v-col cols="12"
                       xs="12"
                       sm="12"
                       md="2"
                       lg="2"
                       xl="1"
                       class="text-end">
                    <v-btn block
                           class="me-3"
                           variant="outlined"
                           @click="store.editMode = false">{{ $t('Indietro') }}</v-btn>
                </v-col>
                <v-col cols="12"
                       xs="12"
                       sm="12"
                       md="2"
                       lg="2"
                       xl="1"
                       class="text-end">
                    <v-btn block
                           type="submit"
                           color="secondary">{{ $t('Salva') }}</v-btn>
                </v-col>
            </v-row>

        </v-container>
    </v-form>


    <v-dialog v-model="passwordDialog">
        <account-change-password :closeFunction="() => passwordDialog = false"></account-change-password>
    </v-dialog>

</template>

<script setup>
const store = useAccountStore()
const { searchRadiusByIndex, radiusTickByValue } = usePostDefaults()
const { addressToCoordinates } = useMapsUtils()

const passwordDialog = ref(false)

const form = ref(null)
const submit = async () => {
    await form.value.validate()
    if (form.value.isValid) {
        await store.saveUser()
    }
}

const cols = {
    cols: 12,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6
}


const updateAddress = async (address) => {
    const location = await addressToCoordinates(address)
    store.newUser.location = {
        type: 'Point',
        coordinates: [location.lng, location.lat]
    }
    store.newUser.address = location.address
    await updateMapContent()

}

const coordinates = computed(() => {
    return {
        lat: store.newUser.location.coordinates[1],
        lng: store.newUser.location.coordinates[0]
    }
})

let map = null

onMounted(async () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates.value,
        zoom: 10,
        mapId: "4504f8b373565c3d0",
    });

    await nextTick()
    await updateMapContent()

})

let marker = null
let circle = null
const updateMapContent = async () => {

    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    if (marker) {
        marker.map = null
        circle.setMap(null)
    }
    const _map = map
    marker = new AdvancedMarkerElement({
        position: coordinates.value,
        map: _map,
        content: new PinElement({
            background: '#E49C12',
            borderColor: "#003459",
            glyphColor: "#003459",
        }).element,
    });


    const radius = searchRadiusByIndex(store.newUser.radius).value * 1000
    circle = new google.maps.Circle({
        strokeColor: "#003459",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#E49C12",
        fillOpacity: 0.35,
        map: _map,
        center: coordinates.value,
        radius: radius,
    });

    _map.fitBounds(circle.getBounds())

}


</script>

<style scoped>
#map {
    height: 400px;
    width: 100%;
}
</style>