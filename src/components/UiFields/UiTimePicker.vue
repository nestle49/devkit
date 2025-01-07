<template>
    <div
        class="time-picker"
        :class="{ disabled: disabled && independent }"
    >
        <Component
            :is="independent ? 'div' : UiPopover"
            :alignment="UiPopoverAlignment.BOTTOM_LEFT"
            :content-padding="16"
            :disabled="disabled"
        >
            <template #relative="{ shown }">
                <slot
                    name="trigger"
                    :formatted-value="formattedValue"
                >
                    <UiTextField
                        :placeholder="placeholder"
                        :value="formattedValue"
                        :mode="UiTextFieldMode.DROPDOWN"
                        :required="required"
                        :disabled="disabled"
                        :label="label"
                        :transparent="transparent"
                        :class="{ 'cursor-pointer': !disabled }"
                        append-pointer-events="none"
                    >
                        <template #append-icon>
                            <IconArrowDown
                                class="ease pe-none"
                                :class="{ 'flip-horizontally': shown }"
                            />
                        </template>
                    </UiTextField>
                </slot>
            </template>

            <template #[dynamicContentSlotName]="attrs">
                <div class="time-picker__dropdown d-flex flex-column">
                    <button
                        type="button"
                        aria-label="scroll up time"
                        class="time-picker__controller d-flex justify-content-center align-items-center p-0 cursor-pointer w-100"
                        @click.stop="y -= timeListStep"
                    >
                        <IconArrowUp class="pe-none us-none" />
                    </button>

                    <ul
                        ref="timeList"
                        class="time-picker__list position-relative border-box"
                    >
                        <li
                            v-for="(time, index) in availableTimes"
                            :key="index"
                            class="time-picker__item position-relative d-flex justify-content-center align-items-center z-index-1 fs-14 us-none cursor-pointer"
                            :class="{ active: time.hours === modelValue?.hours && time.minutes === modelValue?.minutes }"
                            @click="handleSelectTime({ hours: time.hours, minutes: time.minutes }, attrs?.close)"
                        >
                            {{ time.hours < 10 ? `0${time.hours}` : time.hours }}:{{
                                time.minutes < 10 ? `0${time.minutes}` : time.minutes
                            }}
                        </li>
                    </ul>

                    <button
                        type="button"
                        aria-label="scroll down time"
                        class="time-picker__controller d-flex justify-content-center align-items-center p-0 cursor-pointer w-100"
                        @click.stop="y += timeListStep"
                    >
                        <IconArrowDown class="pe-none us-none" />
                    </button>
                </div>
            </template>
        </Component>
    </div>
</template>

<script lang="ts" setup>
import { type UiFieldProps, UiTextFieldMode } from '~/components/types/ui-input'
import { UiPopoverAlignment } from '~/components/types/ui-popover'
import type { ITime } from '~/components/types/ui-timepicker'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiPopover from '~/components/UiPopover.vue'
import IconArrowDown from '~/icons/IconArrowDown.vue'
import IconArrowUp from '~/icons/IconArrowUp.vue'

export interface Props extends UiFieldProps {
    modelValue?: ITime
    startTime?: ITime
    endTime?: ITime
    minutesStep?: number
    independent?: boolean // Use component as solo element without popover
    transparent?: boolean
}

type Emits = (event: 'update:modelValue', time: ITime) => void

const props = withDefaults(defineProps<Props>(), {
    minutesStep: 5,
    startTime: () => ({
        hours: 0,
        minutes: 0
    }),
    endTime: () => ({
        hours: 23,
        minutes: 59
    })
})

const emit = defineEmits<Emits>()

const dynamicContentSlotName = computed(() => (props.independent ? 'default' : 'content'))

const timeList = ref<HTMLElement>()
const timeListStep = 30

const { y, isScrolling } = useScroll(timeList, { behavior: 'smooth' })

watch(isScrolling, () => {
    if (isScrolling.value) {
        return
    }

    const remainder = y.value % timeListStep

    if (!remainder) {
        return
    }

    y.value = y.value - remainder + (remainder > timeListStep / 2 ? timeListStep : 0)
})

const availableTimes = computed<ITime[]>(() => {
    const { minutesStep, startTime, endTime } = props
    const times: ITime[] = [{ hours: startTime.hours, minutes: startTime.minutes }]

    let lastTime = times.at(-1)!
    while (lastTime.hours <= endTime.hours) {
        if (lastTime.hours > endTime.hours) {
            break
        }

        if (lastTime.hours === endTime.hours && lastTime.minutes + minutesStep > endTime.minutes) {
            break
        }

        if (lastTime.minutes + minutesStep >= 60) {
            times.push({ hours: lastTime.hours + 1, minutes: lastTime.minutes + minutesStep - 60 })
            lastTime = times.at(-1)!
            continue
        }

        times.push({ hours: lastTime.hours, minutes: lastTime.minutes + minutesStep })
        lastTime = times.at(-1)!
    }

    return times
})

const formattedValue = computed(() => {
    if (!props.modelValue) {
        return
    }

    return `${props.modelValue.hours.toString().padStart(2, '0')}:${props.modelValue.minutes.toString().padStart(2, '0')}`
})

const handleSelectTime = (time: ITime, close?: () => void) => {
    emit('update:modelValue', { hours: time.hours, minutes: time.minutes })
    close && close()
}

watch(timeList, () => {
    if (!timeList.value) {
        return
    }

    const activeElement = timeList.value.querySelector('.active')

    if (!activeElement) {
        return
    }

    y.value = (activeElement as HTMLElement).offsetTop - timeListStep * 2 - 15 || 0
})
</script>

<style lang="scss" scoped>
$transition: all 0.3s ease-in-out;

.time-picker {
    $self: &;
    $itemHeight: 22px;
    $itemMargin: 8px;
    $itemBackgroundWidth: 64px;

    &__list {
        -ms-overflow-style: none;
        scrollbar-width: none;
        overflow: auto;
        margin: 0 auto;
        padding: 4px 0;
        max-height: calc(#{$itemHeight} * 5 + #{$itemMargin} * 4 + 8px);
        min-width: $itemBackgroundWidth;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__item {
        opacity: 0.6;
        height: $itemHeight;
        margin: 0 0 $itemMargin;
        transition: $transition;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0;

        &:last-of-type {
            margin: 0;
        }

        &::after {
            position: absolute;
            content: '';
            width: $itemBackgroundWidth;
            height: calc(#{$itemHeight} + 4px);
            border-radius: 15px;
            background: var(--ui-secondary);
            z-index: -1;
            opacity: 0;
            transition: $transition;
        }

        &:hover,
        &.active {
            opacity: 1;
            color: var(--ui-secondary);

            &::after {
                opacity: 0.2;
            }
        }
    }

    &__controller {
        height: 24px;
        fill: var(--ui-secondary);
    }

    &.disabled {
        opacity: 0.4;
        pointer-events: none;
        user-select: none;
    }
}
</style>
