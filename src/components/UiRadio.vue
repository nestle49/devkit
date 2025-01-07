<template>
    <div
        class="radio-button position-relative d-flex align-items-center z-index-1"
        :class="{ checked }"
    >
        <input
            :id="id"
            type="radio"
            class="radio d-none"
            :name="name"
            :checked="checked"
            :value="value"
            @change="change"
        />

        <label
            :for="id"
            class="label cursor-pointer d-inline-flex align-items-center border-box us-none ease cursor-pointer"
            :class="[
                `label--${mode}`,
                { 'label--transparent': transparent },
                { 'label--disabled pe-none': disabled },
                { 'opacity-50': disabled && (mode === UiRadioMode.DEFAULT || checked) }
            ]"
        >
            <span
                v-if="mode === UiRadioMode.DEFAULT"
                class="icon position-relative d-inline-flex justify-content-center align-items-center border-box br-50 ease pe-none"
            >
                <span class="d-flex bg-secondary opacity-0 br-50 ease pe-none" />
            </span>

            <span
                v-if="$slots.default"
                class="slot fs-14 ease pe-none"
                :class="[{ 'text-nowrap': !wrap }, mode === UiRadioMode.DEFAULT ? 'lh-140 fw-400' : 'lh-120 fw-500']"
                :style="{ marginLeft: `${mode === UiRadioMode.DEFAULT ? margin : 0}px` }"
            >
                <slot />
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { UiRadioMode } from '~/components/types/ui-radio'

interface Props {
    id: string
    name?: string
    value: string
    checked?: boolean
    disabled?: boolean
    transparent?: boolean
    mode?: UiRadioMode
    wrap?: boolean
    margin?: number
}

withDefaults(defineProps<Props>(), {
    mode: UiRadioMode.DEFAULT,
    wrap: true,
    margin: 7
})

const emit = defineEmits<(event: 'input', val: string) => void>()

const change = (event: Event) => {
    emit('input', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
.icon {
    min-width: 18px;
    width: 18px;
    height: 18px;
    border: 1px solid var(--ui-gray-4);
    background: var(--ui-radio-bg);

    &--transparent {
        background: transparent;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--ui-secondary);
        transform: scale(0.2);
        transition: all 0.2s ease;
    }

    &::before {
        opacity: 0.05;
        z-index: -2;
    }

    &::after {
        opacity: calc(1 / 19);
        z-index: -1;
    }

    & > span {
        width: 10px;
        height: 10px;
    }
}

.label {
    $self: &;

    &--button {
        min-height: 37px;
        min-width: 70px;
        padding: 9px 14px;
        color: var(--ui-radio-button-color);
        border: 1px solid var(--ui-radio-button-border);
        border-radius: var(--ui-radio-border-radius, 10px);
        justify-content: center;
        background: var(--ui-radio-button-bg);

        & .slot {
            margin: 0;
        }

        &:hover,
        &:active {
            border-color: var(--ui-radio-button-border-hover);
            box-shadow: var(--ui-radio-button-shadow);
            background: var(--ui-radio-button-bg-hover);

            & .slot {
                color: var(--ui-radio-button-color-hover);
            }
        }

        &#{$self}--disabled {
            border-color: var(--ui-gray-4);
            background: var(--ui-radio-button-bg-hover);
            box-shadow: none;

            & .slot {
                color: var(--ui-gray-4);
            }
        }

        &#{$self}--transparent {
            background: transparent;
        }
    }

    &:hover {
        .icon {
            &::before {
                transform: scale(1);
            }
        }
    }

    &:active {
        .icon {
            border-color: var(--ui-radio-icon);

            &::after {
                transform: scale(1);
            }
        }
    }
}

.radio {
    &:checked {
        & + .label {
            $self: &;

            & > .icon {
                border-color: var(--ui-radio-icon);

                & > span {
                    opacity: 1;
                }
            }

            &--button {
                background: var(--ui-radio-button-bg-active);
                color: var(--ui-radio-button-color-active);
                border-color: var(--ui-radio-button-border-active);

                .slot {
                    color: var(--ui-radio-button-color-active);
                }

                &:hover,
                &:active {
                    box-shadow: none;
                    color: var(--ui-radio-button-color);
                    background: var(--ui-radio-button-bg-active);

                    .slot {
                        color: var(--ui-radio-button-color-active);
                    }
                }

                &#{$self}--disabled {
                    .slot {
                        color: var(--ui-radio-button-color-active);
                    }
                }
            }
        }
    }
}
</style>
