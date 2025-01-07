<template>
    <SimpleBar
        :class-names="simpleBarClassNames"
        :options="{ autoHide: false }"
        class="w-100 position-relative"
        :style="{
            maxHeight: maxHeight ? `${maxHeight}px` : 'unset',
            maxWidth: maxWidth ? `${maxWidth}px` : 'unset',
            '--left': left ? `${horizontalOffset}px` : 'unset',
            '--right': left ? 'unset' : `${horizontalOffset}px`,
            '--top': top ? `${verticalOffset}px` : 'unset',
            '--bottom': top ? 'unset' : `${verticalOffset}px`,
            '--padding-scrollbar': `${paddingScrollbar}px`
        }"
    >
        <slot />
    </SimpleBar>
</template>

<script lang="ts" setup>
import 'simplebar-vue/dist/simplebar.min.css'

import SimpleBar from 'simplebar-vue'

interface Props {
    maxHeight?: number
    maxWidth?: number
    verticalOffset?: number
    horizontalOffset?: number
    paddingScrollbar?: number
    left?: boolean
    top?: boolean
    draggable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    verticalOffset: 0,
    horizontalOffset: 0,
    paddingScrollbar: 0,
    left: false,
    top: false,
    maxHeight: undefined,
    maxWidth: undefined,
    draggable: false
})

const simpleBarClassNames = computed(() => {
    if (props.draggable) {
        return {
            contentWrapper: 'dragscroll'
        }
    }

    return {}
})

onMounted(async () => {
    if (props.draggable) {
        const dragscroll = await import('dragscroll')
        dragscroll.reset()
    }
})
</script>

<style lang="scss" scoped>
$borderRadius: 90px;
$widthScrollbar: 3px;

:deep(.simplebar-track) {
    pointer-events: all;

    &.simplebar-vertical,
    &.simplebar-horizontal {
        border-radius: $borderRadius;
        background: var(--ui-scroll-bg, var(--ui-line));
    }

    &.simplebar-vertical {
        width: $widthScrollbar;
        /* stylelint-disable */
        left: var(--left);
        right: var(--right);
        top: var(--padding-scrollbar);
        bottom: var(--padding-scrollbar);
        /* stylelint-enable */
    }

    &.simplebar-horizontal {
        height: $widthScrollbar;
        /* stylelint-disable */
        top: var(--top);
        bottom: var(--bottom);
        left: var(--padding-scrollbar);
        right: var(--padding-scrollbar);
        /* stylelint-enable */

        & .simplebar-scrollbar {
            height: 100%;
            top: 0;
        }
    }
}

:deep(.simplebar-track.simplebar-vertical .simplebar-scrollbar::before),
:deep(.simplebar-track.simplebar-horizontal .simplebar-scrollbar::before) {
    opacity: 1;
    border-radius: $borderRadius;
    background: var(--ui-scroll, var(--ui-secondary));
}

:deep(.simplebar-track.simplebar-vertical .simplebar-scrollbar::before) {
    width: 100%;
    inset: 0;
}

:deep(.simplebar-track.simplebar-horizontal .simplebar-scrollbar::before) {
    inset: 0;
}

:deep(.dragscroll) {
    scrollbar-width: none; /* Firefox */
    height: 100% !important;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
