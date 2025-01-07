<template>
    <li
        class="ui-chips d-inline-flex align-items-center fs-12 fw-500 lh-160"
        :class="size"
    >
        <slot />

        <button
            v-if="closable"
            type="button"
            aria-label="unselect"
            class="ui-chips__remove-button d-inline-flex cursor-pointer border-none p-0 m-0"
            @click.stop="emit('close')"
        >
            <IconSmallCross class="cross ml-5" />
        </button>
    </li>
</template>

<script lang="ts" setup>
import { UiTextFieldSize } from '~/components/types/ui-input'
import IconSmallCross from '~/icons/IconSmallCross.vue'

interface Props {
    closable?: boolean
    size?: UiTextFieldSize
}

withDefaults(defineProps<Props>(), {
    closable: false,
    size: UiTextFieldSize.LARGE
})

const emit = defineEmits<(event: 'close') => void>()
</script>

<style lang="scss" scoped>
.ui-chips {
    color: var(--ui-chips);
    background: var(--ui-chips-bg);
    border-radius: var(--ui-chips-border-radius);
    margin-right: 7px;

    &.large {
        padding: 8px 15px;
    }

    &.medium {
        padding: 6px 15px;
    }

    &.small {
        padding: 4px 15px;
    }
}

.cross {
    fill: var(--ui-chips-icon);
}
</style>
