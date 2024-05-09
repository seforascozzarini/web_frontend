<template>
    <p class="text-grey font-weight-bold mt-3 mb-2">{{ $t('Annuncio') }}</p>
    <v-select v-bind="common"
              @update:model-value="update()"
              v-model="store.filters.type"
              :items="defaults.postTypeSelect"
              :label="$t('Tipo')"></v-select>


    <p class="text-grey font-weight-bold mt-5 mb-2">{{ $t('Posizione') }}</p>
    <div class="d-flex flex-row">

        <address-field v-bind="common"
                       @update:model-value="updateAddress"
                       v-model="store.filters.location.address"
                       :label="$t('Area di riferimento')"
                       key="main_filters_address">
            <template #prepend-inner
                      v-if="store.filters.location.detected">
                <v-tooltip location="top end"
                           :text="$t('Posizione approssimativa rilevata dal tuo indirizzo IP')">
                    <template #activator="{ props: __props }">
                        <v-icon v-bind="__props"
                                color="primary"
                                icon="mdi-information-box"></v-icon>
                    </template>
                </v-tooltip>
            </template>
        </address-field>
    </div>

    <p class="text-grey text-body-2 mb-1 mt-3">{{ $t('Raggio di ricerca') }}</p>
    <v-slider :ticks="usePostDefaults().searchRadiusTicks"
              @update:model-value="update()"
              color="primary"
              :show-ticks="xs ? false : 'always'"
              thumb-label
              track-color="black"
              max="5"
              step="1"
              v-model="radius"
              hide-details=""
              tick-size="4">
        <template v-slot:thumb-label="{ modelValue }">
            {{ usePostDefaults().searchRadiusByIndex(modelValue).value }}km
        </template>

        <template #tick-label="{ tick, index }">
            
        </template>
    </v-slider>

    <p class="text-grey font-weight-bold mt-5 mb-2">{{ $t('Informazioni Animale') }}</p>
    <!-- PET TYPE -->
    <v-select v-bind="common"
              @update:model-value="update()"
              :label="$t('Tipo')"
              v-model="store.filters.pet_type"
              :items="defaults.petTypeSelect"></v-select>
    <!-- GENDER -->
    <v-select v-bind="common"
              @update:model-value="update()"
              v-model="store.filters.gender"
              class="mt-5"
              :label="$t('Sesso')"
              :items="defaults.petGenderSelect"></v-select>
    <!-- AGE -->
    <p class="text-grey text-body-2 mb-1 mt-3">{{ $t('Età') }}</p>
    <v-range-slider @update:model-value="update()"
                    v-model="store.filters.age"
                    color="primary"
                    track-color="black"
                    thumb-label
                    :max="30"
                    :min="0"
                    :step="1"
                    hide-details
                    class="align-center"></v-range-slider>

    <!-- MICROCHIP -->
    <v-select v-bind="common"
              @update:model-value="update()"
              v-model="store.filters.microchip"
              class="mt-5"
              :label="$t('Microchip')"
              :items="defaults.petMicrochipSelect"></v-select>
    <!-- STERILISED -->
    <v-select v-bind="common"
              @update:model-value="update()"
              v-model="store.filters.sterilised"
              class="mt-5"
              :label="$t('Sterilizzato')"
              :items="defaults.petSterilizedSelect"></v-select>
    <!-- ORDERBY -->
    <p  v-if="props.showOrderby" class="text-grey font-weight-bold mt-5 mb-2">{{ $t('Ordina i risultati') }}</p>
    <v-select 
    v-if="props.showOrderby"
    v-bind="common"
              @update:model-value="update()"
              v-model="store.filters.orderby.field"
              class="mt-5"
              :label="$t('Ordina per')"
              :items="defaults.orderBy">
        <template #append>
            <v-btn variant="text"
                   :icon="store.filters.orderby.order === 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
                   density="compact"
                   class="btn-icon"
                   @click.stop="store.filters.orderby.order = store.filters.orderby.order === 'asc' ? 'desc' : 'asc'"
                   color="primary"></v-btn>
        </template>

    </v-select>
</template>

<script setup>
const props = defineProps({
    autoUpdate: {
        type: Boolean,
        default: false
    },
    showOrderby: {
        type: Boolean,
        default: false
    }
})

const common = {
    variant: 'outlined',
    density: 'compact',
    hideDetails: true,
}

const defaults = usePostDefaults()
const store = usePostListStore()

const update = () => {
    if (props.autoUpdate) {
        store.update()
    }
}

const radius = computed({
    get: () => defaults.radiusTickByValue(store.filters.radius),
    set: (value) => store.filters.radius = defaults.searchRadiusByIndex(value).value,
})

const updateAddress = async (value) => {
    if (props.autoUpdate) {
        store.filters.location.detected = false
        await store.update()
    }
}

</script>