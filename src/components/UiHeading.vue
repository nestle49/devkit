<template>
    <Component
        :is="`h${level}`"
        class="heading fw-600"
        :class="`mode-${mode || level}`"
    >
        <slot />
    </Component>
</template>

<script lang="ts" setup>
import type { UiHeadingRange } from '~/components/types/ui-heading'

interface Props {
    level?: UiHeadingRange
    mode?: UiHeadingRange
}

withDefaults(defineProps<Props>(), {
    level: 2
})
</script>

<style lang="scss">
.heading {
    color: var(--ui-title-color);

    &.mode-1 {
        font-size: 35px;
    }

    &.mode-2 {
        font-size: 30px;
    }

    &.mode-3 {
        font-size: 25px;
    }

    &.mode-4 {
        font-size: 20px;
    }

    &.mode-5 {
        font-size: 18px;
    }

    &.mode-6 {
        font-size: 16px;
    }
}
</style>
