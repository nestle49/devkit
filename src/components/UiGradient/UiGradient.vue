<template>
    <div
        ref="gradientWrapper"
        class="ui-gradient-element position-relative"
    >
        <Transition name="ui-fade-slow">
            <UiBaseGradient
                v-if="isGradientBeforeShow"
                :color="color"
                :size="size"
                :position="position.before"
                :class="[isClickable ? 'cursor-pointer' : 'pe-none']"
                @click="isOverflow.y ? (y -= stepToScroll) : (x -= stepToScroll)"
            >
                <template v-if="isClickable">
                    <IconArrowDown
                        :fill="iconColor"
                        :style="arrowBeforeStyles"
                    />
                </template>
            </UiBaseGradient>
        </Transition>

        <slot />

        <Transition name="ui-fade-slow">
            <UiBaseGradient
                v-if="isGradientAfterShow"
                :color="color"
                :size="size"
                :position="position.after"
                :class="[isClickable ? 'cursor-pointer' : 'pe-none']"
                @click="isOverflow.y ? (y += stepToScroll) : (x += stepToScroll)"
            >
                <template v-if="isClickable">
                    <IconArrowDown
                        :fill="iconColor"
                        :style="arrowAfterStyles"
                    />
                </template>
            </UiBaseGradient>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { Position } from '~/components/types/ui-position'
import UiBaseGradient from '~/components/UiGradient/UiBaseGradient.vue'
import IconArrowDown from '~/icons/IconArrowDown.vue'

const props = withDefaults(
    defineProps<{
        isOnlyAfter?: boolean
        isOnlyBefore?: boolean
        isClickable?: boolean
        stepToScroll?: number
        boundaryToShowGradient?: number
        color: CSSProperties['color']
        iconColor?: CSSProperties['color']
        size: CSSProperties['height'] | CSSProperties['width']
    }>(),
    {
        stepToScroll: 100,
        boundaryToShowGradient: 0,
        iconColor: 'var(--ui-secondary)'
    }
)

const TOP_ARROW = 180
const RIGHT_ARROW = -90
const BOTTOM_ARROW = 0
const LEFT_ARROW = 90

const gradientWrapper = ref<HTMLElement>()
const hiddenGradients = ref<Set<Position>>(new Set())

const { width, height } = useElementSize(gradientWrapper)
const elWidth = refDebounced(width, 500)
const elHeight = refDebounced(height, 500)

const scrolledElement = computed(
    () =>
        gradientWrapper.value?.querySelector<HTMLElement>('.simplebar-content-wrapper') ??
        gradientWrapper.value?.querySelector<HTMLElement>('.dragscroll')
)

const { x, y, arrivedState } = useScroll(scrolledElement, { behavior: 'smooth' })

const isOverflow = computed(() => ({
    x: !!elWidth.value && !!gradientWrapper.value?.querySelector('.simplebar-scrollable-x'),
    y: !!elHeight.value && !!gradientWrapper.value?.querySelector('.simplebar-scrollable-y')
}))

const position = computed(() => ({
    before: isOverflow.value.y ? Position.TOP : Position.LEFT,
    after: isOverflow.value.y ? Position.BOTTOM : Position.RIGHT
}))

const identifyHiddenGradients = () => {
    if (!scrolledElement.value) {
        return
    }

    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = scrolledElement.value

    if (isOverflow.value.y) {
        if (scrollTop < props.boundaryToShowGradient) {
            hiddenGradients.value.add(Position.TOP)
        } else if (scrollTop > props.boundaryToShowGradient) {
            hiddenGradients.value.delete(Position.TOP)
        }

        clientHeight + scrollTop < scrollHeight - props.boundaryToShowGradient
            ? hiddenGradients.value.delete(Position.BOTTOM)
            : hiddenGradients.value.add(Position.BOTTOM)
    }

    if (isOverflow.value.x) {
        if (scrollLeft < props.boundaryToShowGradient) {
            hiddenGradients.value.add(Position.LEFT)
        } else if (scrollLeft > props.boundaryToShowGradient) {
            hiddenGradients.value.delete(Position.LEFT)
        }

        clientWidth + scrollLeft < scrollWidth - props.boundaryToShowGradient
            ? hiddenGradients.value.delete(Position.RIGHT)
            : hiddenGradients.value.add(Position.RIGHT)
    }
}

watch([x, y], identifyHiddenGradients)

const arrowBeforeStyles = computed(() => ({ transform: `rotate(${isOverflow.value.y ? TOP_ARROW : LEFT_ARROW}deg)` }))
const arrowAfterStyles = computed(() => ({ transform: `rotate(${isOverflow.value.y ? BOTTOM_ARROW : RIGHT_ARROW}deg)` }))

const isGradientBeforeShow = computed(() => {
    if (props.isOnlyAfter) {
        return false
    }

    return isOverflow.value.y
        ? !arrivedState[Position.TOP] && !hiddenGradients.value.has(Position.TOP)
        : isOverflow.value.x && !arrivedState[Position.LEFT] && !hiddenGradients.value.has(Position.LEFT)
})

const isGradientAfterShow = computed(() => {
    if (props.isOnlyBefore) {
        return false
    }

    return isOverflow.value.y
        ? !arrivedState[Position.BOTTOM] && !hiddenGradients.value.has(Position.BOTTOM)
        : isOverflow.value.x && !arrivedState[Position.RIGHT] && !hiddenGradients.value.has(Position.RIGHT)
})
</script>
