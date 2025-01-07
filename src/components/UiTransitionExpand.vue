<template>
    <Transition
        name="expand"
        @enter="wrapper($event, onEnter)"
        @after-enter="wrapper($event, onAfterEnter)"
        @leave="wrapper($event, onLeave)"
    >
        <slot v-if="$slots.default" />
    </Transition>
</template>

<script setup lang="ts">
const wrapper = (element: Element, func: (element: HTMLElement) => void): void => {
    if (element instanceof HTMLElement) {
        func(element)
    }
}

const onEnter = (element: HTMLElement) => {
    element.style.width = getComputedStyle(element).width
    element.style.position = 'absolute'
    element.style.visibility = 'hidden'
    element.style.height = 'auto'

    const height = getComputedStyle(element).height

    element.style.width = ''
    element.style.position = ''
    element.style.visibility = ''
    element.style.height = '0'

    // Force repaint to make sure the
    // animation is triggered correctly.
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(element).height

    // Trigger the animation.
    // We use `requestAnimationFrame` because we need
    // to make sure the browser has finished
    // painting after setting the `height`
    // to `0` in the line above.
    requestAnimationFrame(() => {
        element.style.height = height
    })
}

const onAfterEnter = (element: HTMLElement) => {
    element.style.height = 'auto'
}

const onLeave = (element: HTMLElement) => {
    element.style.height = getComputedStyle(element).height

    // Force repaint to make sure the
    // animation is triggered correctly.
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(element).height

    requestAnimationFrame(() => {
        element.style.height = '0'
    })
}
</script>

<style>
.expand-enter-active,
.expand-leave-active {
    overflow: hidden;
    transition: block-size var(--expand-transition-duration, 0.25s) ease;
}

.expand-enter-from,
.expand-leave-to {
    block-size: 0;
}
</style>

<style scoped>
* {
    backface-visibility: hidden;
    perspective: 1000px;
    transform: translateZ(0);
    will-change: block-size;
}
</style>
