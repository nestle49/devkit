<template>
    <button
        class="tab us-none cursor-pointer d-inline-block fs-14 fw-500"
        :disabled="disabled"
        type="button"
        :aria-label="ariaLabel"
        :class="[
            `tab--${mode}`,
            {
                active,
                disabled,
                last
            }
        ]"
        @click="emit('click')"
    >
        <div class="tab__wrapper text-nowrap">
            <slot />
        </div>
    </button>
</template>

<script lang="ts" setup>
import { UiTabMode } from '~/components/types/ui-tab'

interface Props {
    mode?: UiTabMode
    active?: boolean
    disabled?: boolean
    last?: boolean
    ariaLabel?: string
    gap?: string
}

withDefaults(defineProps<Props>(), {
    mode: UiTabMode.DEFAULT,
    ariaLabel: 'set tab',
    gap: '16px'
})

const emit = defineEmits<(event: 'click') => void>()
</script>

<style lang="scss" scoped>
.tab {
    $self: &;

    &--default {
        @mixin hover-and-active-state {
            box-shadow: none;
            background: var(--ui-default-tab-hover-background, var(--ui-secondary));
            color: var(--ui-light);
        }

        #{$self}__wrapper {
            padding: 10px 15px;
            border-radius: 40px;
            background: var(--ui-default-tab-background, var(--ui-light));
            box-shadow: var(--ui-tab-shadow, var(--ui-shadow-button));
            transition: all 0.2s ease-in-out;
        }

        &:hover {
            #{$self}__wrapper {
                @include hover-and-active-state;
            }
        }

        &#{$self}.active {
            #{$self}__wrapper {
                @include hover-and-active-state;
            }
        }

        &#{$self}.disabled {
            pointer-events: none;
            opacity: 0.5;

            #{$self}__wrapper {
                box-shadow: none;
            }
        }
    }

    &--border {
        border: 1px solid var(--ui-line);
        border-radius: var(--ui-border-tab-border-radius, 13px);
        padding: 5px;

        @mixin hover-and-active-state-bordered {
            color: var(--ui-border-tab-hover-color, var(--ui-secondary));
            background: var(--ui-border-tab-hover-background, var(--ui-light));
            box-shadow: var(--ui-tab-shadow, var(--ui-shadow-button));
            opacity: 1;
        }

        #{$self}__wrapper {
            padding: 11px 15px;
            border-radius: var(--ui-border-tab-border-radius, 13px);
            transition: all 0.2s ease-in-out;
            opacity: 0.5;
        }

        &:hover {
            #{$self}__wrapper {
                @include hover-and-active-state-bordered;
            }
        }

        &#{$self}.active {
            #{$self}__wrapper {
                @include hover-and-active-state-bordered;
            }
        }

        &#{$self}.disabled {
            pointer-events: none;
            border-color: currentColor;
            opacity: 0.5;

            #{$self}__wrapper {
                opacity: 1;
            }
        }
    }

    &--text {
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out;

        &#{$self}.active {
            color: var(--ui-secondary);
        }

        &#{$self}.disabled {
            pointer-events: none;

            #{$self}__wrapper {
                opacity: 0.5;
            }
        }

        &:not(:last-child) {
            &::after {
                content: '';
                width: 4px;
                height: 4px;
                display: block;
                background-color: var(--ui-secondary);
                border-radius: 100%;
                margin: auto v-bind('gap');
            }
        }
    }
}
</style>
