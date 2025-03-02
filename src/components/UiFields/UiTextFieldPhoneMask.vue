<template>
    <UiTextField
        ref="wrapper"
        class="ui-text-field-phone-mask w-100"
        :class="[
            `ui-text-field-phone-mask__${size}`,
            {
                'pe-none': disabled,
                'ui-text-field-phone-mask__surface': isZIndexAssigned
            }
        ]"
        :value="phone"
        :mask="selectedPhoneFormat?.mask"
        :size
        :label
        :required
        :disabled
        :placeholder
        transparent
        @input="changePhone($event)"
        @focus="onFocus"
        @blur="onBlur"
        @click="isZIndexAssigned = true"
    >
        <template #prepend-icon>
            <div
                class="position-relative d-flex align-items-center justify-content-center w-100 h-100"
                @click="isZIndexAssigned = true"
            >
                <Transition name="ui-fade">
                    <UiDropdown
                        v-if="isZIndexAssigned && isPhoneFieldFocused && selectedPhoneFormat"
                        v-model:search-query="search"
                        :value="selectedPhoneFormat"
                        :select-label="e => phoneLabel(e)"
                        :select-value="e => e.country.flag"
                        :items="formats"
                        class="ui-text-field-phone-mask__dropdown"
                        :active-indexes="formats.findIndex(i => i.id === selectedPhoneFormat?.id)"
                        :max-height="300"
                        transparent
                        button
                        :search="{ type: 'inner', placeholder: searchPlaceholder }"
                        :opened="isMaskPickerShown && Boolean(selectedPhoneFormat)"
                        @input="$emit('change-mask', formats[$event])"
                        @focus="onFocus"
                        @update:opened="isMaskPickerShown = !isMaskPickerShown"
                        @mousedown.prevent="focusInputInsideDropdown"
                    >
                        <template #button>
                            {{ selectedPhoneFormat.country.flag }}
                        </template>
                    </UiDropdown>

                    <div
                        v-else
                        class="position-absolute top-0 left-0 right-0 bottom-0 d-flex align-items-center justify-content-center"
                    >
                        <slot name="prepend-icon" />
                    </div>
                </Transition>
            </div>
        </template>
    </UiTextField>
</template>

<script lang="ts" setup>
import type { Emits, Props } from 'components/types/ui-textfield-phone-mask'

import { UiTextFieldSize } from '~/components/types/ui-input'
import UiDropdown from '~/components/UiFields/UiDropdown.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'

const props = withDefaults(defineProps<Props>(), {
    size: UiTextFieldSize.LARGE,
    flagSize: '16px'
})
const emit = defineEmits<Emits>()

const phoneMaskFieldRef = ref<HTMLElement | null>()
const wrapper = ref<HTMLElement>()
const isZIndexAssigned = ref(false)

const isMaskPickerShown = ref(false)
const _preventBackspace = ref(false)
// eslint-disable-next-line vue/no-setup-props-reactivity-loss, vue/no-setup-props-destructure
const isPhoneFieldFocused = ref(props.autofocus)
const search = defineModel<string | undefined>('searchQuery')

const changePhone = (phone: string) => {
    emit('change-phone', phone)

    if (isPhoneFieldFocused.value && isMaskPickerShown.value) {
        phoneMaskFieldRef.value?.click()
        isMaskPickerShown.value = false
    }

    if (phone === '' && isPhoneFieldFocused.value) {
        _preventBackspace.value = true
    }
}

const onBlur = () => {
    if (isMaskPickerShown.value) {
        return
    }

    isMaskPickerShown.value = false
    isPhoneFieldFocused.value = false
    _preventBackspace.value = false
}

const onFocus = () => {
    isPhoneFieldFocused.value = true
}

const focusInputInsideDropdown = (e: Event) => {
    const target = e.target as HTMLElement

    if (!target.classList.contains('dropdown-search')) {
        return
    }

    const eventType = 'onfocusin' in target ? 'focusin' : 'focus'
    const isBubbles = 'onfocusin' in target
    const event = new Event(eventType, { bubbles: isBubbles, cancelable: true })

    target.focus()
    target.dispatchEvent(event)
}

onClickOutside(wrapper, () => (isZIndexAssigned.value = false))

onKeyStroke('Backspace', () => {
    if (_preventBackspace.value) {
        _preventBackspace.value = false
        return
    }

    if (isPhoneFieldFocused.value && props.phone === '' && !isMaskPickerShown.value) {
        phoneMaskFieldRef.value?.click()
        isMaskPickerShown.value = true
    }
})

watch(
    () => props.selectedPhoneFormat,
    () => {
        emit('reset-phone')
    }
)
</script>

<style lang="scss" scoped>
@mixin prepend-icon-style($class, $width, $translateX) {
    :deep(.ui-text-field__wrapper.#{$class} .ui-text-field__container .input-icon.prepend-icon) {
        width: $width;
        transform: translateX($translateX);
    }
}

.ui-text-field-phone-mask {
    :deep(.ui-text-field__wrapper.large .ui-text-field__container .input-icon.prepend-icon),
    :deep(.ui-text-field__wrapper.medium .ui-text-field__container .input-icon.prepend-icon),
    :deep(.ui-text-field__wrapper.small .ui-text-field__container .input-icon.prepend-icon) {
        left: 0;
        pointer-events: all;
    }

    &__large {
        @include prepend-icon-style(large, 57px, 8px);
    }

    &__medium {
        @include prepend-icon-style(medium, 52px, 6px);
    }

    &__small {
        @include prepend-icon-style(small, 47px, 3px);
    }

    &__surface {
        :deep(.input-icon.prepend-icon) {
            z-index: 3;
        }
    }

    :deep(.ui-text-field__wrapper.large .ui-text-field__container),
    :deep(.ui-text-field__wrapper.medium .ui-text-field__container),
    :deep(.ui-text-field__wrapper.small .ui-text-field__container) {
        padding-left: 0;

        &.append-icon {
            padding-right: 0;
        }
    }

    &__dropdown {
        :deep(.ui-text-field__container),
        :deep(.dropdown-list) {
            pointer-events: all;
        }
    }

    :deep(.ui-dropdown) {
        background: transparent;
        box-shadow: none;

        .button.button--neutral {
            background: transparent;
            box-shadow: none;
            border: none;

            &:not(.button--disabled):active {
                box-shadow: none;
            }

            .button__content {
                /* stylelint-disable-next-line */
                font-size: v-bind(flagSize);
                min-width: 22px;
                width: 22px;
            }
        }

        .button__ripple {
            box-shadow: none;
            display: none;
        }
    }
}
</style>
