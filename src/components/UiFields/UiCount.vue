<template>
    <div class="ui-count border-box position-relative border-box">
        <fieldset
            class="ui-count__wrapper position-relative ease p-0 m-0 border-box"
            :class="[
                mode,
                {
                    disabled,
                    error: isError,
                    focused,
                    label,
                    empty: !value,
                    transparent
                }
            ]"
        >
            <legend
                v-if="label"
                class="ui-count__legend d-flex fs-12"
                :class="[
                    mode,
                    {
                        error: isError,
                        focused,
                        disabled,
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

            <template v-if="!isDefault">
                <button
                    type="button"
                    aria-label="decrease count"
                    class="quantity-button decrease position-absolute h-100 d-flex justify-content-center align-items-center"
                    :class="{ small: isSmall, 'cursor-pointer': !disabled }"
                    @click="decreaseCount"
                >
                    <IconMinus class="pe-none us-none" />
                </button>

                <UiButton
                    :color-mode="UiButtonColorMode.SECONDARY"
                    :size="isSmall ? UiButtonSize.SMALL : UiButtonSize.MEDIUM"
                    square
                    :disabled="disabled"
                    aria-label="increase count"
                    class="quantity-button increase position-absolute"
                    :class="{ small: isSmall, 'cursor-pointer': !disabled }"
                    @click="increaseCount"
                >
                    <IconPlus class="pe-none us-none" />
                </UiButton>
            </template>

            <input
                ref="field"
                type="number"
                :step="step"
                :min="min"
                :max="max"
                class="ui-count__input us-none montserrat text-center d-flex justify-content-center w-100 h-100 outline-none border-box ease border-none bg-transparent truncate overflow-hidden"
                :class="[mode, { disabled, error: isError, 'pe-none': !isDefault }]"
                :value="valueOrEmpty"
                :placeholder="placeholder"
                :disabled="disabled"
                @keyup="change"
                @keydown="preventExcludeCharacters"
            />
        </fieldset>
    </div>
</template>

<script lang="ts" setup>
import { UiButtonColorMode, UiButtonSize } from '~/components/types/ui-button'
import type { UiCountChangeType } from '~/components/types/ui-count'
import { UiCountMode } from '~/components/types/ui-count'
import UiButton from '~/components/UiButton/UiButton.vue'
import IconMinus from '~/icons/IconMinus.vue'
import IconPlus from '~/icons/IconPlus.vue'

interface Props {
    value?: number
    min?: number
    max?: number
    step?: number
    label?: string
    required?: boolean
    mode?: UiCountMode
    disabled?: boolean
    placeholder?: string
    transparent?: boolean
}

type Emits = (event: 'change', value: number, type: UiCountChangeType) => void

const props = withDefaults(defineProps<Props>(), {
    value: 1,
    min: 1,
    max: 999,
    step: 1,
    mode: UiCountMode.DEFAULT,
    placeholder: '0'
})

const emit = defineEmits<Emits>()

const isError = computed(
    () => Number.isNaN(props.value) || !Number.isInteger(props.value) || props.value < props.min || props.value > props.max
)

const valueOrEmpty = computed(() => (!props.value ? undefined : props.value))

const change = (event: Event) => {
    const targetVal = (event.target as HTMLInputElement).valueAsNumber

    if (Number.isNaN(targetVal)) {
        return
    }

    emit('change', Math.abs(Math.floor(targetVal)), 'manual')
}

const decreaseCount = () => {
    if (props.value - props.step < props.min) {
        return
    }
    emit('change', props.value - props.step, 'decreased')
}

const increaseCount = () => {
    if (props.value + props.step > props.max) {
        return
    }
    emit('change', props.value + props.step, 'increased')
}

const preventExcludeCharacters = (event: KeyboardEvent) => {
    const excludeCharacters = [',', '.', 'e', '-', '+']

    if (excludeCharacters.includes(event.key)) {
        event.preventDefault()
    }
}

const isDefault = computed(() => props.mode === UiCountMode.DEFAULT)
const isSmall = computed(() => props.mode === UiCountMode.SMALL)

const field = ref<HTMLElement>()
const { focused } = useFocus(field)
</script>

<style lang="scss" scoped>
$default-left-margin: clamp(10px, var(--ui-count-default-border-radius, 10px), 25px);
$medium-left-margin: clamp(15px, var(--ui-count-medium-border-radius, 15px), 25px);

.ui-count {
    $self: &;

    &__input {
        appearance: none;
        color: var(--ui-count-text-color, inherit);
        outline: 1px solid var(--ui-text-field-border-color-placeholder-shown);
        border-radius: var(--ui-text-field-large-border-radius, 15px);

        &::placeholder {
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6;
            color: var(--ui-count-text-color, inherit);
            opacity: 0.5;
            transition: opacity 0.2s ease;
        }

        &:focus::placeholder {
            opacity: 0;
        }

        &:hover {
            color: var(--ui-secondary);
        }

        &.disabled {
            color: var(--ui-gray-4);
        }

        &.medium {
            padding-right: 15px;
            border-radius: var(--ui-count-medium-border-radius, 13px);

            &.disabled {
                outline-color: var(--ui-secondary-light);
            }
        }

        &.small {
            padding-right: 11px;

            &.disabled {
                outline-color: var(--ui-secondary-light);
            }
        }

        &.medium,
        &.small {
            font-weight: 600;
            line-height: 1.2;

            &::placeholder {
                font-weight: 600;
            }
        }

        &.default {
            border-radius: var(--ui-count-default-border-radius, 10px);

            &.disabled {
                background: rgb(var(--ui-gray-light-rgb) / 0.3);
                outline-color: rgb(var(--ui-gray-4-rgb) / 0.7);
            }
        }

        &.error {
            color: var(--ui-accent);
        }
    }

    &__wrapper {
        background: var(--ui-count-background, var(--ui-light-secondary));
        border: 1px solid transparent;
        width: 110px;
        height: 41px;

        .quantity-button {
            width: 50px;

            &.small.button--square {
                width: 41px;
                height: 41px;
            }

            &.increase {
                top: -1px;
                right: -1px;
            }

            &.decrease {
                top: 0;
                left: -1px;

                :deep(svg) {
                    height: 20px;
                    width: 20px;
                    transform: translateY(1px);
                    fill: var(--ui-secondary);
                }
            }
        }

        &.focused {
            & .ui-count__input {
                outline-color: var(--ui-text-field-border-color);
            }
        }

        &.disabled .quantity-button.decrease :deep(svg) {
            fill: var(--ui-gray-4);
        }

        &.small {
            border-radius: var(--ui-count-small-border-radius, 10px);
            width: 120px;

            & .ui-count__input {
                border-radius: var(--ui-count-small-border-radius, 10px);
            }
        }

        &.label {
            transition: border-color 0.4s ease;

            #{$self}__legend {
                position: relative;
                height: 0;
                overflow: visible;
                transform: translateY(-8px);
                color: var(--ui-secondary);
                padding-inline: 5px;
                margin-left: 10px;

                &.default {
                    margin-left: $default-left-margin;
                }

                &.medium {
                    margin-left: $medium-left-margin;
                }

                &.small {
                    margin-left: $default-left-margin;
                }

                .text {
                    height: 20px;
                    transition: opacity 0.15s ease;
                    max-width: 50px;
                }

                .text,
                .required {
                    opacity: 0;
                }

                &.disabled {
                    color: var(--ui-gray-4);
                }

                &.error {
                    color: var(--ui-accent);
                }
            }

            & .ui-count__input {
                transition: outline-color 0.4s ease;
            }

            &.focused,
            &:not(.empty) {
                transition: border-color 0.15s ease;
                border-color: var(--ui-text-field-border-color);

                & .ui-count__input {
                    transition: outline-color 0.15s ease;
                    outline-color: transparent !important;
                }

                #{$self}__legend .text,
                #{$self}__legend .required {
                    transition: opacity 0.4s ease;
                    opacity: 1;
                }

                &.default {
                    &.error {
                        border-color: var(--ui-accent);
                    }

                    &.disabled {
                        background: rgb(var(--ui-gray-light-rgb) / 0.3);
                    }
                }

                &.medium,
                &.small {
                    &.disabled {
                        border-color: var(--ui-secondary-light);
                    }
                }
            }
        }

        &.medium {
            border-radius: var(--ui-count-medium-border-radius, 13px);
            width: 129px;
            height: 50px;
        }

        &.default {
            background: var(--ui-count-background, var(--ui-light-secondary));
            border-radius: var(--ui-count-default-border-radius, 10px);

            &.error {
                color: var(--ui-accent);

                & .ui-count__input {
                    outline-color: var(--ui-accent);
                }
            }
        }

        &.transparent {
            background: transparent;
        }
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
}

input[type='number'] {
    appearance: textfield;
}
</style>
