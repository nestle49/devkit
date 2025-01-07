<template>
    <div class="ui-textarea border-box position-relative">
        <fieldset
            class="ui-textarea__wrapper position-relative border-box d-flex p-0 m-0"
            :class="{
                focused,
                label,
                error,
                empty: !value,
                disabled,
                transparent
            }"
            :style="{ height }"
        >
            <legend
                v-if="label"
                class="ui-textarea__legend d-flex lh-160 fs-12 ml-20"
                :class="{
                    error,
                    focused,
                    disabled,
                    empty: !value
                }"
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

            <span
                v-if="$slots.default"
                class="ui-textarea__icon position-absolute pe-none us-none d-inline-flex justify-content-center align-items-center"
                :class="{ disabled, error }"
            >
                <slot />
            </span>

            <textarea
                :id="id"
                ref="field"
                :value="value"
                :required="required"
                :disabled="disabled"
                :placeholder="placeholder"
                :maxlength="maxLength"
                class="ui-textarea__field fs-14 fw-400 lh-160 w-100 border-box outline-none montserrat bg-transparent border-none"
                :class="{
                    'disabled pe-none': disabled,
                    error,
                    'prepend-icon': $slots.default
                }"
                @keyup="change"
            />
        </fieldset>
    </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import type { UiFieldProps } from '~/components/types/ui-input'

interface Props extends UiFieldProps {
    value?: string
    error?: boolean
    transparent?: boolean
    maxLength?: number
    height?: CSSProperties['height']
}

withDefaults(defineProps<Props>(), {
    value: '',
    maxLength: 200,
    height: '150px'
})

const emit = defineEmits<(event: 'input', val: string) => void>()

const change = (event: Event) => {
    emit('input', (event.target as HTMLTextAreaElement).value)
}

const field = ref<HTMLElement>()
const { focused } = useFocus(field)
</script>

<style lang="scss" scoped>
.ui-textarea {
    $self: &;

    &__field {
        &::-webkit-scrollbar {
            display: none;
        }

        outline: 1px solid var(--ui-text-field-border-color-placeholder-shown);
        border-radius: var(--ui-text-field-large-border-radius, 15px);
        resize: none;
        padding: 20px 25px 20px calc(var(--ui-text-field-large-border-radius, 20px) + 5px);
        color: var(--ui-text-field-color);

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

        &:hover,
        &:focus {
            &:not(.disabled, .error) {
                color: var(--ui-text-field-color-hover);
            }
        }

        &.error {
            color: var(--ui-accent);
        }

        &.disabled {
            color: var(--ui-text-field-disabled);
        }

        &.prepend-icon {
            padding-left: 57px;
        }
    }

    &__wrapper {
        border: 1px solid transparent;
        border-radius: var(--ui-text-field-large-border-radius, 15px);
        background: var(--ui-text-field-bg);
        height: v-bind('height');

        &.focused {
            & .ui-textarea__field {
                outline-color: var(--ui-text-field-border-color);
            }
        }

        &.error {
            &::after {
                outline-color: var(--ui-accent);
            }

            & .ui-textarea__field {
                outline-color: var(--ui-accent);
            }

            & #{$self}__legend {
                color: var(--ui-accent);
            }
        }

        &.disabled {
            background: var(--ui-text-field-disabled-bg);

            & .ui-textarea__field {
                outline-color: rgb(var(--ui-gray-4-rgb) / 0.7);
            }

            & #{$self}__legend {
                color: rgb(var(--ui-gray-4-rgb) / 0.7);
            }
        }

        &.transparent {
            background: transparent;
        }

        &.label {
            height: v-bind('height');
            transition: border-color 0.4s ease;

            #{$self}__legend {
                position: relative;
                height: 0;
                overflow: visible;
                transform: translateY(-10px);
                color: var(--ui-secondary);
                padding-inline: 5px;
                margin-left: var(--ui-text-field-large-border-radius, 20px);

                .text {
                    height: 20px;
                    transition: opacity 0.15s ease;
                    max-width: 135px;
                }

                .text,
                .required {
                    opacity: 0;
                }
            }

            & .ui-textarea__field {
                transition: outline-color 0.4s ease;
            }

            &.focused,
            &:not(.empty) {
                transition: border-color 0.15s ease;
                border-color: var(--ui-text-field-border-color);

                & .ui-textarea__field {
                    transition: outline-color 0.15s ease;
                    outline-color: transparent;
                }

                #{$self}__legend .text,
                #{$self}__legend .required {
                    transition: opacity 0.4s ease;
                    opacity: 1;
                }

                &.error {
                    border-color: var(--ui-accent);
                }

                &.disabled {
                    border-color: rgb(var(--ui-gray-4-rgb) / 0.7);
                }

                &.search {
                    border-color: var(--ui-search-border);
                }
            }
        }
    }

    &__icon {
        top: 20px;
        left: 25px;
        height: 22px;
        fill: var(--ui-text-field-icon);

        &.error {
            fill: var(--ui-accent);
        }

        &.disabled {
            fill: var(--ui-gray-4);
        }
    }
}
</style>
