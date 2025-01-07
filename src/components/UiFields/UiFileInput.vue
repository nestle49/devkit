<template>
    <div
        class="file-input position-relative cursor-pointer"
        :class="{ 'pe-none': disabled }"
        @click="open()"
    >
        <UiTextField
            :id
            :label
            :mode="UiTextFieldMode.FILE"
            :size
            :required
            :disabled
            :clearable="!!files"
            :error
            :transparent
            :placeholder
            aria-label="file input"
            :value="filesName ? filesName : ''"
            @click-append="files ? reset() : open()"
        >
            <template
                v-if="$slots.default"
                #prepend-icon
            >
                <slot />
            </template>

            <template
                v-if="!files"
                #append-icon
            >
                <IconAttachment class="pe-none us-none" />
            </template>
        </UiTextField>
    </div>
</template>

<script lang="ts" setup>
import { type UiFieldProps, UiTextFieldMode, UiTextFieldSize } from '~/components/types/ui-input'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import IconAttachment from '~/icons/IconAttachment.vue'

interface Props extends UiFieldProps {
    maxFiles?: number
    size?: UiTextFieldSize
    multiple?: boolean
    error?: boolean
    accept?: string
    transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    maxFiles: 10,
    size: UiTextFieldSize.LARGE,
    accept: 'image/jpeg, image/jpg, image/png'
})

const emit = defineEmits<(event: 'input', val: File[] | null) => void>()

const { maxFiles, multiple, accept } = toRefs(props)

const { files, open, reset } = useFileDialog({ multiple: multiple.value, accept: accept.value })

const filesName = computed(() => {
    if (!files.value) {
        return ''
    }

    return [...files.value]
        .slice(0, maxFiles.value)
        .map(file => file.name)
        .join(' / ')
})

watch(files, () => {
    emit('input', files.value ? [...files.value].slice(0, maxFiles.value) : null)
})
</script>

<style lang="scss" scoped>
$tf: '.text-field';

.file-input {
    &:hover,
    &:focus {
        :deep(#{$tf}) {
            &:not(#{$tf}--disabled):not(#{$tf}--error) {
                color: var(--ui-file-input-color-hover);
                text-decoration-color: var(--ui-file-input-color-hover);
            }
            &#{$tf}--error {
                text-decoration-color: var(--ui-accent);
            }
        }
    }
}
</style>
