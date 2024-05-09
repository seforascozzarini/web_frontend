<template>
    <v-container fluid>

        <!-- POSTS -->
        <v-row>
            <v-col v-if="store.loading"
                   v-for="i in 12"
                   v-bind="cols">
                <v-post-skeleton-loader></v-post-skeleton-loader>
            </v-col>

            <v-col v-else
                   v-for="post in store.posts"
                   :key="post.id"
                   cols="12"
                   v-bind="cols">
                <post-card :post="post" :is-owner="props.isOwner"/>
            </v-col>

        </v-row>


        <!-- PAGINATION -->
        <v-row class="mt-15"
               v-if="store.pageCount > 1">
            <v-col>

                <v-pagination rounded="circle"
                              v-model="store.page"
                              :length="store.pageCount"
                              :total-visible="5"
                              active-color="secondary"
                              variant="elevated"
                              @update:modelValue="update()">
                </v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps({
    full: {
        type: Boolean,
        default: false
    },
    isOwner: {
        type: Boolean,
        default: false
    }
})


const cols = computed(() => {
    if (props.full)
        return {
            cols: 12,
            xs: 12,
            sm: 6,
            md: 6,
            lg: 3,
            xl: 3
        }
    return {
        cols: 12,
        xs: 12,
        sm: 6,
        md: 6,
        lg: 4,
        xl: 4
    }
})

const store = usePostListStore()


const update = () => {
    window.scrollTo(0, 0)
    store.update()
}


</script>