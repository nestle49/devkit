<template>
    <li
        class="list-item d-flex"
        :class="[`list-item--${mode}`]"
    >
        <div class="list-item__content d-inline-block">
            <span
                v-if="mode === UiListMode.UNORDERED"
                class="list-item__prepend d-inline-flex"
            >
                <slot name="prepend-icon">
                    <IconHeart />
                </slot>
            </span>

            <slot />
        </div>
    </li>
</template>

<script lang="ts" setup>
import { UiListMode, UiListProvideKeys } from '~/components/types/ui-list'
import IconHeart from '~/icons/IconHeart.vue'

const mode = inject(UiListProvideKeys.MODE)
</script>

<style lang="scss" scoped>
.list-item {
    $self: &;
    $iconSize: 10px;

    &--ol {
        &::before {
            color: var(--ui-list-color-mode);
            font-weight: 700;
            counter-increment: list;
            content: counter(list, decimal-leading-zero) ' /';
            margin-right: 5px;
            font-variant-numeric: tabular-nums;
            display: inline-block;
            white-space: nowrap;
        }
    }

    &--ul {
        #{$self}__prepend {
            margin: 0 15px 0 0;
            transform: translateY(-1px);
            fill: #f96857;
            width: $iconSize;
            height: $iconSize;
            min-width: $iconSize;

            :deep(svg) {
                width: 100%;
                height: 100%;
            }
        }
    }

    &__content {
        white-space: normal;
        vertical-align: top;
    }
}
</style>
