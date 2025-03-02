<template>
    <div
        class="alert position-relative br-10 pt-16 pr-32 pb-16 pl-20"
        :class="mode"
    >
        <IconClose
            v-if="closable"
            class="alert__close position-absolute cursor-pointer"
            @click="$emit('close')"
        />

        <UiHeading
            v-if="$slots.title"
            :level="5"
            class="alert__title mb-16"
        >
            <slot name="title" />
        </UiHeading>

        <p class="alert__body m-0 fs-14">
            <slot />
        </p>

        <footer
            v-if="$slots.footer"
            class="alert__footer mt-16"
        >
            <slot name="footer" />
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { UiAlertMode } from '~/components/types/ui-alert'
import UiHeading from '~/components/UiHeading.vue'
import IconClose from '~/icons/IconClose.vue'

interface Props {
    mode?: UiAlertMode
    closable?: boolean
}

type Emits = (event: 'close') => void

withDefaults(defineProps<Props>(), {
    mode: UiAlertMode.PRIMARY,
    closable: false
})

defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.alert {
    $backgroundAlpha: 0.1;

    &__title {
        color: inherit;
    }

    &__close {
        right: 8px;
        top: 8px;
        fill: currentColor;
    }

    &.primary {
        color: var(--ui-accent);
        background: rgba(var(--ui-accent-rgb) / #{$backgroundAlpha});
    }

    &.secondary {
        color: var(--ui-secondary);
        background: rgba(var(--ui-secondary-rgb) / #{$backgroundAlpha});
    }

    &.danger {
        color: var(--ui-danger);
        background: rgba(var(--ui-danger-rgb) / #{$backgroundAlpha});
    }

    &.success {
        color: var(--ui-success);
        background: rgb(var(--ui-success-rgb) / #{$backgroundAlpha});
    }

    &.warn {
        color: var(--ui-warn);
        background: rgb(var(--ui-warn-rgb) / #{$backgroundAlpha});
    }
}
</style>
