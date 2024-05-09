<template>
    <v-btn rounded="10"
           variant="outlined"
           color="primary">{{ $t('Ordina per') }} {{ selected.title }}

        <template #append>
            <v-btn :icon="icon"
                   variant="text"
                   density="compact"
                   class="btn-icon"
                   @click.stop="changeOrderByOrder()"
                   color="primary"></v-btn>
        </template>

        <v-menu activator="parent">
            <v-list>
                <v-list-item v-for="o in orderByValues"
                             @click="changeOrderBy(o.value)">{{ o.title }}</v-list-item>
            </v-list>
        </v-menu>


    </v-btn>
</template>

<script setup>
const store = usePostListStore()

const orderByValues = usePostDefaults().orderBy

const selected = computed(() => {
    return orderByValues.find(o => o.value === store.filters.orderby.field)
})

const icon = computed(() => {
    return store.filters.orderby.order === 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending'
})

const changeOrderBy = (field) => {
    store.filters.orderby.field = field
    store.update()
}

const changeOrderByOrder = () => {
    store.filters.orderby.order = store.filters.orderby.order === 'asc' ? 'desc' : 'asc'
    store.update()
}

</script>