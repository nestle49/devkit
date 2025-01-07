<template>
    <div
        :style="styles"
        :class="classes"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { Position } from '~/components/types/ui-position'

const props = defineProps<{
    position: Position
    color: CSSProperties['color']
    size: CSSProperties['height'] | CSSProperties['width']
}>()

const directions = {
    [Position.LEFT]: Position.RIGHT,
    [Position.RIGHT]: Position.LEFT,
    [Position.BOTTOM]: Position.TOP,
    [Position.TOP]: Position.BOTTOM
}

const styles = computed<CSSProperties>(() => ({
    width: props.position === Position.LEFT || props.position === Position.RIGHT ? props.size : '',
    height: props.position === Position.TOP || props.position === Position.BOTTOM ? props.size : '',
    zIndex: props.position === Position.TOP || props.position === Position.LEFT ? 1 : 0,
    background: `linear-gradient(to ${directions[props.position]}, ${props.color} 30%, transparent)`
}))

const classes = computed<string[]>(() => [
    props.position,
    'ui-gradient position-absolute d-flex',
    props.position === Position.TOP ? 'justify-content-center' : '',
    props.position === Position.BOTTOM ? 'justify-content-center align-items-end' : '',
    props.position === Position.LEFT ? 'align-items-center' : '',
    props.position === Position.RIGHT ? 'align-items-center justify-content-end' : ''
])
</script>

<style scoped lang="scss">
.ui-gradient {
    &.top {
        top: -1px;
        left: 0;
        right: 0;
    }

    &.right {
        top: 0;
        right: -1px;
        bottom: 0;
    }

    &.bottom {
        left: 0;
        right: 0;
        bottom: -1px;
    }

    &.left {
        top: 0;
        left: -1px;
        bottom: 0;
    }
}
</style>
