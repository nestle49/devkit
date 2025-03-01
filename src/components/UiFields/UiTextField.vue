<template>
    <div class="ui-text-field border-box">
        <fieldset
            class="ui-text-field__wrapper position-relative p-0 m-0 border-box"
            :class="[
                mode,
                size,
                {
                    'pe-none': disabled,
                    focused,
                    error,
                    label,
                    empty: !value,
                    transparent,
                    disabled: isDisabled
                }
            ]"
            :style="{ maxWidth: maxWidth ? `${maxWidth}px` : 'unset' }"
        >
            <legend
                v-if="label"
                class="ui-text-field__legend d-flex lh-160 fs-12"
                :class="[
                    size,
                    mode,
                    {
                        error,
                        focused,
                        disabled: isDisabled,
                        empty: !value
                    }
                ]"
            >
                <span class="text text-nowrap truncate overflow-hidden">
                    {{ label }}
                </span>

                <span
                    v-if="required"
                    class="required danger"
                >
                    &nbsp;*
                </span>
            </legend>

            <div
                class="ui-text-field__container d-flex h-100"
                :class="[
                    mode,
                    {
                        'append-icon': clearable || $slots['append-icon'],
                        'align-items-center': $slots.chips,
                        empty: !value,
                        label,
                        focused,
                        error,
                        disabled: isDisabled
                    }
                ]"
            >
                <span
                    v-if="$slots['prepend-icon']"
                    class="input-icon prepend-icon position-absolute pe-none us-none h-100 d-inline-flex justify-content-center align-items-center"
                >
                    <slot name="prepend-icon" />
                </span>

                <template v-if="$slots.chips">
                    <TransitionGroup
                        name="ui-group-list"
                        tag="ul"
                        class="chips-list position-absolute w-100 list-style-none p-0 m-0 border-box append-icon"
                        :class="[
                            size,
                            {
                                empty: !value,
                                label,
                                'prepend-icon': $slots['prepend-icon']
                            }
                        ]"
                        appear
                    >
                        <slot name="chips" />
                    </TransitionGroup>
                </template>

                <!--                    v-inputmask="!!mask"-->
                <input
                    v-if="!$slots.chips || !value"
                    ref="field"
                    v-autofocus="autofocus"
                    :data-inputmask-mask="mask"
                    class="ui-text-field__input h-100 w-100 p-0 overflow-hidden truncate ease outline-none border-box fs-14 fw-400 lh-160 montserrat truncate border-none bg-transparent"
                    :class="[
                        size,
                        mode,
                        isDropdown && 'pe-none',
                        isFile && 'cursor-pointer text-decoration-underline pe-none',
                        {
                            empty: !value,
                            'text-center': centered,
                            error,
                            focused,
                            label,
                            clearable: isCanBeCleaned,
                            disabled: isDisabled
                        },
                        {
                            'prepend-icon': $slots['prepend-icon'],
                            'append-icon': clearable || $slots['append-icon']
                        }
                    ]"
                    v-bind="{ ...attrs, ...inputAttrs, ...nativeAttrs }"
                    @input="change"
                />

                <button
                    v-if="$slots['append-icon'] || isCanBeCleaned || loading"
                    type="button"
                    :aria-label="isCanBeCleaned ? 'clearable' : ariaLabel"
                    class="input-icon append-icon position-absolute top-0 right-0 h-100 d-flex align-items-center cursor-pointer"
                    :disabled="disabled"
                    :style="{ pointerEvents: appendPointerEvents }"
                    @click.stop="clickAppend"
                >
                    <UiLoader
                        v-if="loading"
                        class="button__loader"
                        size="22px"
                        width="1px"
                    />

                    <slot
                        v-else
                        name="append-icon"
                    >
                        <IconClose class="pe-none us-none" />
                    </slot>
                </button>
            </div>
        </fieldset>
    </div>
</template>

<script lang="ts" setup>
// import { vInputmask } from '@foodsoul/maska'
import type { InputHTMLAttributes } from 'vue'

import { type UiFieldProps, UiTextFieldMode, UiTextFieldSize, UiTextFieldType } from '~/components/types/ui-input'
import UiLoader from '~/components/UiLoader.vue'
import { vAutofocus } from '~/directives/autofocus'
import IconClose from '~/icons/IconClose.vue'

interface Props extends UiFieldProps {
    mode?: UiTextFieldMode
    size?: UiTextFieldSize
    type?: UiTextFieldType
    value?: string
    mask?: string
    clearable?: boolean
    centered?: boolean
    applyDisabledStyles?: boolean
    error?: boolean
    transparent?: boolean
    loading?: boolean
    inputAttrs?: InputHTMLAttributes
    appendPointerEvents?: 'auto' | 'none'
    autofocus?: boolean
    maxWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
    mode: UiTextFieldMode.TEXT,
    size: UiTextFieldSize.LARGE,
    type: UiTextFieldType.TEXT,
    value: '',
    mask: '',
    clearable: true,
    applyDisabledStyles: true,
    inputAttrs: (): InputHTMLAttributes => ({}),
    appendPointerEvents: 'auto'
})
const emit = defineEmits<{ (event: 'input', val: string): void; (event: 'click-append'): void }>()
const nativeAttrs = useAttrs()
const field = ref<HTMLElement>()
const { focused } = useFocus(field)

const isText = computed(() => props.mode === UiTextFieldMode.TEXT)
const isFile = computed(() => props.mode === UiTextFieldMode.FILE)
const isSearch = computed(() => props.mode === UiTextFieldMode.SEARCH)
const isDropdown = computed(() => props.mode === UiTextFieldMode.DROPDOWN)
const isDisabled = computed(() => props.disabled && props.applyDisabledStyles)

const attrs = computed<InputHTMLAttributes>(() => ({
    required: props.required,
    placeholder: props.placeholder,
    disabled: isDropdown.value ? true : props.disabled,
    id: props.id,
    value: props.value,
    type: props.type
}))

const isCanBeCleaned = computed(() => {
    if (!props.clearable || props.disabled) {
        return false
    }

    if (props.value && (isText.value || isSearch.value)) {
        return true
    }

    return isFile.value
})

const change = (event: Event) => {
    emit('input', (event.target as HTMLInputElement).value)
}

const clickAppend = () => {
    if (isCanBeCleaned.value) {
        emit('input', '')
    }
    emit('click-append')
}
</script>

<style lang="scss" scoped>
$icon-size: var(--icon-size, 22px);
$legend-padding: 5px;
$large-radius: var(--ui-text-field-large-border-radius, 15px);
$medium-radius: var(--ui-text-field-large-border-radius, 13px);
$small-radius: var(--ui-text-field-large-border-radius, 10px);
$large-padding-field: 25px;
$medium-padding-field: 20px;
$small-padding-field: 15px;
$large-padding-legend: clamp(20px, calc(var(--ui-text-field-large-border-radius, 13px) + 7px), 27px);
$medium-padding-legend: clamp(15px, calc(var(--ui-text-field-large-border-radius, 8px) + 7px), 22px);
$small-padding-legend: clamp(10px, calc(var(--ui-text-field-large-border-radius, 3px) + 7px), 17px);
$large-prepend-icon-indention: 25px;
$medium-prepend-icon-indention: 20px;
$small-prepend-icon-indention: 15px;

@mixin icon-color($color) {
    .input-icon {
        &.prepend-icon {
            fill: $color;
        }

        &.append-icon {
            stroke: $color;
            fill: $color;
        }
    }
}

@mixin style-by-size($radius, $height, $padding, $padding-legend, $prepend-icon-indention) {
    border-radius: $radius;
    height: $height;

    $gap: 10px;

    & .ui-text-field__container,
    & .ui-text-field__input {
        border-radius: $radius;
    }

    .prepend-icon {
        left: $prepend-icon-indention;
    }

    .ui-text-field__container {
        gap: $gap;

        & .chips-list,
        & .ui-text-field__input {
            padding-left: $padding;
            padding-right: $padding;

            &.prepend-icon {
                padding-left: calc($padding + $icon-size + $gap);
            }

            &.append-icon {
                padding-right: calc($padding + $icon-size + $gap);
            }
        }
    }

    .input-icon.append-icon {
        padding-left: 5px;
        padding-right: $padding;
    }

    .ui-text-field__legend {
        margin-left: $padding-legend;
    }
}

.ui-text-field {
    $self: &;

    &__wrapper {
        border: 1px solid transparent;
        background: var(--ui-text-field-bg);

        &.label {
            transition: border-color 0.4s ease;

            #{$self}__legend {
                position: relative;
                height: 0;
                overflow: visible;
                transform: translateY(-10px);
                color: var(--ui-secondary);
                padding-inline: $legend-padding;

                .text {
                    height: 20px;
                    transition: opacity 0.15s ease;
                    max-width: 130px;
                }

                .text,
                .required {
                    opacity: 0;
                }
            }

            &.focused,
            &:not(.empty) {
                transition: border-color 0.15s ease;
                border-color: var(--ui-text-field-border-color);

                &.error {
                    border-color: var(--ui-accent);
                }

                &.disabled {
                    border-color: rgb(var(--ui-gray-4-rgb) / 0.7);
                }

                &.search {
                    border-color: var(--ui-search-border);
                }

                #{$self}__legend .text,
                #{$self}__legend .required {
                    transition: opacity 0.4s ease;
                    opacity: 1;
                }
            }
        }

        @include icon-color(var(--ui-text-field-icon));

        &.large {
            @include style-by-size($large-radius, 60px, $large-padding-field, $large-padding-legend, $large-prepend-icon-indention);
        }

        &.medium {
            @include style-by-size($medium-radius, 50px, $medium-padding-field, $medium-padding-legend, $medium-prepend-icon-indention);
        }

        &.small {
            @include style-by-size($small-radius, 42px, $small-padding-field, $small-padding-legend, $small-prepend-icon-indention);
        }

        &.error {
            @include icon-color(var(--ui-accent));

            & #{$self}__legend {
                color: var(--ui-accent);
            }
        }

        &.disabled {
            background: var(--ui-text-field-disabled-bg);

            @include icon-color(var(--ui-gray-4));

            & #{$self}__legend {
                color: rgb(var(--ui-gray-4-rgb) / 0.7);
            }
        }

        &.search {
            box-shadow: var(--ui-search-shadow);
            background: var(--ui-search-bg);

            #{$self}__legend {
                color: var(--ui-secondary);
            }

            &.error #{$self}__legend {
                color: var(--ui-accent);
            }

            &.disabled #{$self}__legend {
                color: rgb(var(--ui-gray-4-rgb) / 0.7);
            }
        }

        &.transparent {
            background: transparent;
        }
    }

    &__container {
        outline: 1px solid var(--ui-text-field-border-color-placeholder-shown);

        &.focused {
            outline-color: var(--ui-text-field-border-color);
        }

        &.error {
            outline-color: var(--ui-accent);
        }

        &.disabled {
            outline-color: rgb(var(--ui-gray-4-rgb) / 0.7);
        }

        &.search {
            outline-color: var(--ui-search-border);
        }

        &.label {
            transition: outline-color 0.4s ease;

            &.focused,
            &:not(.empty) {
                transition: outline-color 0.15s ease;
                outline-color: transparent;
            }

            &.search {
                outline-color: var(--ui-search-border);
            }
        }
    }

    &__input {
        $input: &;

        &::placeholder {
            font-weight: 400;
            font-size: 14px;
            line-height: 1.6;
            color: var(--ui-text-field-placeholder);
            transition:
                color 0.2s ease,
                opacity 0.2s ease;
            opacity: 0.4;
        }

        &:focus::placeholder {
            opacity: 0;
        }

        &.search {
            color: var(--ui-search-color);

            &:focus,
            &:hover {
                &:not(#{$input}.disabled, #{$input}.error) {
                    color: var(--ui-search-color-hover);
                }
            }
        }

        &.text {
            color: var(--ui-text-field-color);

            &:hover,
            &:focus {
                &:not(#{$input}.disabled):not(#{$input}.error) {
                    color: var(--ui-text-field-color-hover);
                }
            }
        }

        &.file {
            text-decoration-color: transparent;

            &::placeholder {
                text-decoration: underline;
                opacity: 1;
            }

            &:not(.disabled, .error) {
                color: var(--ui-file-input-color);

                &::placeholder {
                    color: var(--ui-file-input-placeholder);
                }
            }
        }

        &.dropdown {
            color: var(--ui-dropdown-input-color);

            &:hover {
                color: var(--ui-dropdown-input-color-hover);
            }

            &::placeholder {
                color: var(--ui-dropdown-input-placeholder);
                opacity: 1;
            }
        }

        &.error {
            color: var(--ui-accent);
        }

        &.disabled {
            color: var(--ui-text-field-disabled);
        }
    }
}

:deep(svg) {
    width: $icon-size;
    height: $icon-size;
}

:deep(.button__loader .loader__circle) {
    border-top-color: var(--ui-text-field-icon);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
}

input[type='number'] {
    appearance: textfield;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    box-shadow: none;
    background-clip: text !important;
}

.chips-list {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    &.large {
        max-width: calc(100% - $large-prepend-icon-indention);
    }

    &.medium {
        max-width: calc(100% - $medium-prepend-icon-indention);
    }

    &.small {
        max-width: calc(100% - $small-prepend-icon-indention);
    }
}
</style>
