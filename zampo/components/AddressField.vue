<template>
    <v-autocomplete :items="items"
                    @update:search="updateItems">
        <template #prepend-inner>
            <slot name="prepend-inner"></slot>
        </template>
    </v-autocomplete>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        default: ''
    },
})

const items = ref([])
const key = computed(() => {
    return `address_autocomplete_${props.id}`
})

if (sessionStorage.getItem(key.value)) {
    items.value = JSON.parse(sessionStorage.getItem(key.value))
}
const setItems = (value) => {
    sessionStorage.setItem(key.value, JSON.stringify(value))
}


const displaySuggestions = function (predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
        return;
    }
    items.value = []
    predictions.forEach((prediction) => {
        items.value.push({ title: prediction.description, value: prediction.place_id })
    });
    setItems(items.value)
};

const updateItems = async (value) => {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: value, componentRestrictions: { country: ['it'] } }, displaySuggestions);
}


</script>