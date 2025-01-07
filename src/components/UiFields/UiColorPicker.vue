<template>
    <div
        ref="colorPicker"
        class="ui-color-picker position-relative cursor-pointer"
        :class="{ 'pe-none': disabled }"
    >
        <UiTextField
            :id="id"
            :label="label"
            :size="size"
            :required="required"
            :disabled="disabled"
            :clearable="false"
            :error="error"
            :transparent="transparent"
            :placeholder="placeholder"
            mask="\#******"
            :input-attrs="<InputHTMLAttributes>{ 'data-inputmask-placeholder': '' }"
            aria-label="color pick"
            :value="inputValue"
            @input="inputValue = $event"
            @click-append="isOpenPalette = !isOpenPalette"
        >
            <template
                v-if="$slots.default"
                #prepend-icon
            >
                <slot />
            </template>

            <template #append-icon>
                <button
                    type="button"
                    aria-label="set color"
                    class="ui-color-button d-inline-flex br-5 cursor-pointer"
                    :style="{ backgroundColor: isValidHexColorRegExp.test(inputValue) ? inputValue : 'transparent' }"
                />
            </template>
        </UiTextField>

        <Transition :name="reverse ? 'ui-color-picker-fade-reverse' : 'ui-color-picker-fade'">
            <div
                v-if="isOpenPalette && validPalette.length"
                class="ui-palette w-100 br-20 border-gray position-absolute right-0 border-box cursor-default overflow-hidden"
                :class="{ reverse }"
                :style="{ maxHeight: maxHeight ? `${maxHeight}px` : 'unset' }"
            >
                <UiScroll
                    :max-height="maxHeight"
                    :horizontal-offset="15"
                    :padding-scrollbar="30"
                >
                    <ul class="p-30 m-0 list-style-none d-flex justify-content-center flex-wrap gap-10">
                        <li
                            v-for="(colorItem, index) in validPalette"
                            :key="index"
                            class="d-inline-flex"
                        >
                            <button
                                type="button"
                                aria-label="set color"
                                class="ui-color-button d-inline-flex br-5 cursor-pointer"
                                :style="{ backgroundColor: colorItem }"
                                @click="setColor(colorItem)"
                            />
                        </li>
                    </ul>
                </UiScroll>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { type UiFieldProps, UiTextFieldSize } from '~/components/types/ui-input'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiScroll from '~/components/UiScroll.vue'
import { defaultPaletteColors } from '~/constants/palette'

interface Props extends UiFieldProps {
    size?: UiTextFieldSize
    error?: boolean
    transparent?: boolean
    palette?: string[]
    value?: string
    reverse?: boolean
    maxHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: UiTextFieldSize.LARGE,
    placeholder: '#',
    palette: () => defaultPaletteColors,
    value: ''
})

const emit = defineEmits<(event: 'input', val: string) => void>()

const isValidHexColorRegExp = /^#[0-9A-F]{6}$/i

const { palette, value } = toRefs(props)

const validPalette = computed(() => palette.value.filter(color => isValidHexColorRegExp.test(color)))

const colorPicker = ref<HTMLElement>()
const isOpenPalette = ref(false)

onClickOutside(colorPicker, () => {
    if (isOpenPalette.value) {
        isOpenPalette.value = false
    }
})

const inputValue = ref('')

const changeColor = () => {
    emit('input', inputValue.value)
}

watch(
    value,
    () => {
        if (isValidHexColorRegExp.test(value.value)) {
            inputValue.value = value.value
        }
    },
    { immediate: true }
)

watch(inputValue, () => {
    if (isValidHexColorRegExp.test(inputValue.value)) {
        changeColor()
    }
})

const setColor = (color: string) => {
    inputValue.value = color
    isOpenPalette.value = false
}
</script>

<style lang="scss" scoped>
.ui-palette {
    max-width: 365px;
    background: var(--ui-dropdown-bg);
    box-shadow: var(--ui-dropdown-shadow);
    top: calc(100% + 10px);
    z-index: 3;

    &.reverse {
        top: unset;
        bottom: calc(100% + 10px);
    }
}

.ui-color-button {
    width: 25px;
    height: 25px;
    border: 1px solid var(--ui-color-palette-border);
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.1);
    }
}

.ui-color-picker-fade-enter-active,
.ui-color-picker-fade-leave-active,
.ui-color-picker-fade-reverse-enter-active,
.ui-color-picker-fade-reverse-leave-active {
    transition: all ease 0.5s;
}

.ui-color-picker-fade-enter-from,
.ui-color-picker-fade-leave-to,
.ui-color-picker-fade-reverse-enter-from,
.ui-color-picker-fade-reverse-leave-to {
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
}

.ui-color-picker-fade-reverse-enter-from,
.ui-color-picker-fade-reverse-leave-to {
    transform: translateY(-20px);
}
</style>
