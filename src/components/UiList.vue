<template>
    <Component
        :is="mode"
        class="list d-flex flex-column border-box list-style-none m-0 p-0"
    >
        <slot />
    </Component>
</template>

<script lang="ts" setup>
import { UiListMode, UiListProvideKeys } from '~/components/types/ui-list'

interface Props {
    mode?: UiListMode
}

const props = withDefaults(defineProps<Props>(), {
    mode: UiListMode.UNORDERED
})

provide(UiListProvideKeys.MODE, toRef(props, 'mode'))
</script>

<style lang="scss" scoped>
.list {
    gap: 20px;
    counter-reset: list;
}
</style>
