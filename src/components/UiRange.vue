<template>
    <div class="input-range position-relative z-index-1">
        <label
            v-if="$slots.label"
            class="d-flex title"
        >
            <slot name="label" />
        </label>

        <div class="tracker-bg position-relative">
            <div
                class="tracker position-absolute left-0 top-0 z-index-n1 pe-none us-none"
                :style="{ width: `${trackerWidth}px`, left: endValue !== undefined ? `${offsetTrackerStart}px` : 0 }"
            />

            <div
                v-if="$slots['current-start']"
                class="current position-absolute d-flex justify-content-center pe-none us-none"
                :style="{ left: `${offsetTrackerStart}px` }"
            >
                <label
                    :for="id"
                    class="text-nowrap position-absolute"
                >
                    <slot name="current-start" />
                </label>
            </div>

            <div
                v-if="$slots['current-end']"
                class="current position-absolute d-flex justify-content-center pe-none us-none"
                :style="{ left: `${offsetTrackerEnd}px` }"
            >
                <label
                    :for="`${id}-end-thumb`"
                    class="text-nowrap position-absolute"
                >
                    <slot name="current-end" />
                </label>
            </div>

            <input
                :id="id"
                ref="inputRange"
                class="w-100"
                :class="{ 'pe-none': endValue !== undefined }"
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :value="startValue"
                @input="inputValue($event)"
                @change="changeValue($event)"
            />

            <input
                v-if="endValue !== undefined"
                :id="`${id}-end-thumb`"
                class="w-100 position-absolute left-0 pe-none"
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :value="endValue"
                @input="inputValue($event, ValueTypesList.END)"
                @change="changeValue($event, ValueTypesList.CHANGE_END)"
            />

            <span
                class="input-range__bg input-range__bg--start"
                :style="{ left: `${offsetTrackerStart}px` }"
            />
            <span
                v-if="endValue !== undefined"
                class="input-range__bg input-range__bg--end"
                :style="{ left: `${offsetTrackerEnd}px` }"
            />
        </div>

        <div
            v-if="$slots.legend"
            class="legend d-flex justify-content-between"
        >
            <slot name="legend" />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    id: string
    min?: number
    max?: number
    step?: number
    startValue?: number
    endValue?: number
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 10,
    step: 1,
    startValue: 0
})

// eslint-disable-next-line no-use-before-define
const emit = defineEmits<(event: ValueTypesList, val: number) => void>()

enum ValueTypesList {
    START = 'input-start',
    END = 'input-end',
    CHANGE_START = 'change-start',
    CHANGE_END = 'change-end'
}

const inputValue = (event: Event, type = ValueTypesList.START) => {
    const eventName = type === ValueTypesList.START ? ValueTypesList.START : ValueTypesList.END
    emit(eventName, (event.target as HTMLInputElement).valueAsNumber)
}

const changeValue = (event: Event, type = ValueTypesList.CHANGE_START) => {
    const eventName = type === ValueTypesList.CHANGE_START ? ValueTypesList.CHANGE_START : ValueTypesList.CHANGE_END
    emit(eventName, (event.target as HTMLInputElement).valueAsNumber)
}

const inputRange = ref<HTMLElement | null>(null)
const { width } = useElementSize(inputRange)

const pixelsInOnePercent = computed(() => (width.value - 18) / 100) // 18 is the width thumb

const offsetTrackerStart = computed(() => {
    const activePercents = (props.startValue - props.min) / (Math.abs(props.max - props.min) / 100)
    return activePercents * pixelsInOnePercent.value + 9 // 6 is width thumb divide 2
})

const offsetTrackerEnd = computed(() => {
    if (props.endValue !== 0 && !props.endValue) {
        return props.max
    }
    const activePercents = (props.endValue - props.min) / (Math.abs(props.max - props.min) / 100)
    return activePercents * pixelsInOnePercent.value + 9 // 6 is width thumb divide 2
})

const trackerWidth = computed(() => {
    if (!props.endValue) {
        return offsetTrackerStart.value
    }

    return offsetTrackerEnd.value - offsetTrackerStart.value
})

const { startValue, endValue } = toRefs(props)

watch(startValue, () => {
    if (endValue.value !== 0 && !endValue.value) {
        return
    }

    if (startValue.value > endValue.value) {
        emit(ValueTypesList.END, startValue.value)
    }
})

watch(
    () => endValue.value,
    () => {
        if (endValue.value !== 0 && !endValue.value) {
            return
        }

        if (startValue.value > endValue.value) {
            emit(ValueTypesList.START, endValue.value)
        }
    }
)
</script>

<style scoped lang="scss">
@mixin thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-top: -6px;
    background: var(--ui-light);
    border: 0.5px solid rgba(0 0 0 / 0.04);
    box-shadow:
        4px 4px 7px rgba(0 0 0 / 0.07),
        6px 6px 36px rgba(0 0 0 / 0.06);
    cursor: pointer;
    user-select: none;
    pointer-events: all;
    transition: transform 0.5s ease-out;
}

@mixin track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-radius: 3px;
    border: none;
    box-shadow: none;
    user-select: none;
}

.input-range {
    &__bg {
        content: '';
        position: absolute;
        z-index: -1;

        &--start,
        &--end {
            &::before,
            &::after {
                position: absolute;
                content: '';
                left: 0;
                border-radius: 50%;
                background: var(--ui-range);
                transition: transform 0.2s ease;
                top: 12px;
                margin: -20px 0 0 -20px;
                width: 40px;
                height: 40px;
                transform: scale(0.2);
            }

            &::before {
                z-index: -2;
                opacity: 0.05;
            }

            &::after {
                z-index: -1;
                opacity: calc(1 / 19);
            }
        }
    }
}

input[type='range'] {
    appearance: none;
    background: transparent;

    &::-webkit-slider-thumb {
        @include thumb;

        &:active {
            transform: scale(1.2);
        }
    }

    &::-moz-range-thumb {
        @include thumb;
    }

    &::-ms-thumb {
        @include thumb;
    }

    &::-webkit-slider-runnable-track {
        @include track;
    }

    &::-moz-range-track {
        @include track;
    }

    &::-ms-track {
        @include track;
    }

    &:first-of-type {
        &:hover ~ .input-range__bg--start::before {
            transform: scale(1);
        }

        &:active ~ .input-range__bg--start::after {
            transform: scale(1);
        }
    }

    &:not(:first-of-type) {
        height: 0;
        top: 12px;

        &:hover ~ .input-range__bg--end::before {
            transform: scale(1);
        }

        &:active ~ .input-range__bg--end::after {
            transform: scale(1);
        }
    }
}

.tracker {
    background: var(--ui-range);
    border-radius: 90px;
    height: 6px;
    top: 9px;
    opacity: 0.85;
}

.tracker-bg {
    line-height: normal;

    &::before {
        position: absolute;
        content: '';
        border-radius: 90px;
        height: 6px;
        top: 9px;
        width: 100%;
        background: #eaeaf9;
        z-index: -2;
    }
}

.current {
    top: -27px;
}

.legend {
    margin: 7px 0 0;
}

input {
    padding: 0;
    margin: 0;
}

label {
    margin: 0 0 37px;
}
</style>
