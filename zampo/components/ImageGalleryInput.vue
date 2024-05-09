<template>
    <v-input type="file"
             :validation-value="files"
             class="w-100"
             @dragover.prevent="dragover"
             @dragleave.prevent="dragleave"
             @drop="drop"
             v-model="files"
             @update:model-value="update()"
             style="cursor: pointer;">
        <v-sheet border
                 rounded="lg"
                 style="position: relative;"
                 :style="{ 'min-height': props.height + 'px!important' }"
                 :class="{ dragging: isdragging }"
                 class="w-100">

            <v-btn @click="openExplorer()"
                   color="secondary"
                   icon="mdi-cloud-upload position-absolute"
                   style="right: 10px; bottom: 10px;position: absolute; z-index: 15;"></v-btn>

            <div v-if="!hasImages"
                 class="d-flex flex-column align-center justify-center h-100">
                <v-icon color="grey"
                        size="100">mdi-cloud-upload</v-icon>
                <p class="text-grey">{{ $t('Carica Immagini') }} (max {{ props.max }})</p>
            </div>

            <v-slide-group v-else
                           class="mx-3 postion-relative">

                <v-slide-group-item v-for="(image, i) in images"
                                    :key="i"
                                    class="d-flex align-center justify-center me-3">

                    <v-hover>

                        <template #default="{ isHovering, props: _props }">
                            <v-sheet :height="props.height"
                                     :class="ma - 2"
                                     :width="props.height"
                                     v-bind="_props"
                                     elevation="1"
                                     rounded="lg"
                                     class="d-flex flex-column align-center justify-center my-3 pa-2 me-3 border-opacity-50 position-relative">

                                <v-img :src="image.src"
                                       alt=""
                                       width="100%" />

                                <v-overlay activator="parent"
                                           contained
                                           open-on-hover
                                           absolute
                                           color="error"
                                           class="align-center justify-center">
                                    <v-btn color="error"
                                           icon="mdi-delete"
                                           size="80"
                                           @click="removeFile(i)"
                                           variant="text">
                                        <v-icon size="80">mdi-delete</v-icon>
                                    </v-btn>
                                </v-overlay>
                            </v-sheet>
                        </template>
                    </v-hover>

                </v-slide-group-item>
            </v-slide-group>


        </v-sheet>
    </v-input>
</template>


<script setup>
const props = defineProps({
    modelValue: {
        type: Array,
    },
    max: {
        type: Number,
        default: 4
    },
    loading: {
        type: Boolean,
        default: false
    },
    height: {
        type: Number,
        default: 250
    }
})

const emits = defineEmits(['update:modelValue'])
// const emits = defineEmits(['modelValue'])

const update = () => {
    emits('update:modelValue', files.value)
}

const $t = useI18n().t

const images = ref([])
const files = ref(props.modelValue || [])

const hasImages = computed(() => {
    return images.value.length > 0
})


const initFiles = () => {
    for (const file of files.value) {
        const image = new Image()
        if (file.type === 'file')
            image.src = URL.createObjectURL(file.value)
        else
            image.src = file.value
        image.onload = () => {
            images.value.push(image)
        }
        image.onerror = () => {
            useMessages().error(`${$t('Il file non è un\'immagine valida')}: ${file.name}`)
        }
    }
}
initFiles()

const addFiles = (toAdd) => {
    toAdd = Array.from(toAdd)
    const count = files.value.length + toAdd.length
    if (count > props.max) {
        useMessages().error(`${$t('Puoi caricare un massimo di')} ${props.max} ${$t('immagini')}`)
        return
    }

    for (const i of toAdd) {
        // if the file is already in the list skip it
        if (files.value.find(f => f.name === i.name)) {
            useMessages().warning(`${$t('Hai già caricato questa immagine')}: ${i.name}`)
            continue
        }
        // check if the file is a valid image
        const image = new Image()
        image.src = URL.createObjectURL(i)
        image.onload = () => {
            files.value.push({ type: 'file', value: i })
            emits('update:modelValue', files.value)
            images.value.push(image)

        }
        image.onerror = () => {
            useMessages().error(`${$t('Il file non è un\'immagine valida')}: ${i.name}`)
        }

    }
}


const removeFile = (index) => {
    files.value.splice(index, 1)
    images.value.splice(index, 1)
    emits('update:modelValue', files.value)
}


// DRAG HANDLERS
const isdragging = ref(false)
const dragover = (e) => {
    if (props.loading) return
    isdragging.value = true
}
const dragleave = (e) => {
    if (props.loading) return
    isdragging.value = false
}
const drop = (e) => {
    if (props.loading) return
    e.preventDefault()
    e.stopPropagation()
    isdragging.value = false
    addFiles(e.dataTransfer.files)
}

// EXPLORER HANDLER
const openExplorer = () => {
    if (props.loading) return
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/png, image/jpeg'
    input.onchange = (e) => {
        addFiles(e.target.files)
        input.remove()
    }
    input.click()
}


</script>

<style>
.dragging {
    filter: brightness(.8)
}
</style>