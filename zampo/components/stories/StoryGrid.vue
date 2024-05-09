<template>
    <v-container fluid>

        <!-- POSTS -->
        <v-row>
            <v-col v-if="props.stories.loading.value"
                   v-for="i in 12"
                   v-bind="cols">
                <v-post-skeleton-loader></v-post-skeleton-loader>
            </v-col>

            <v-col v-else
                   v-for="story in props.stories.stories.value"
                   :key="story.id"
                   cols="12"
                   v-bind="cols">
                <story-card :story="story"></story-card>
            </v-col>

        </v-row>


        <!-- PAGINATION -->
        <v-row class="mt-15"
               v-if="props.stories.pageCount.value > 1">
            <v-col>

                <v-pagination rounded="circle"
                              v-model="props.stories.page.value"
                              :length="props.stories.pageCount.value"
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
        default: true
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    stories: {
        type: Object,
        required: true
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



const update = () => {
    window.scrollTo(0, 0)
    props.stories.update()
}


</script>