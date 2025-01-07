<template>
    <div
        class="rating d-inline-block position-relative z-index-1"
        :class="{ readonly }"
        @mouseleave="hoveredItem = 0"
    >
        <ul class="rating__wrapper list-style-none p-0 m-0">
            <li>
                <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    :aria-label="`Set rating to ${star}`"
                    class="rating__item position-relative cursor-pointer ease"
                    :class="{ active: hoveredItem ? star <= hoveredItem : star <= score, 'pe-none': readonly }"
                    :disabled="readonly"
                    @mouseover="readonly ? score : (hoveredItem = star)"
                    @click="readonly ? null : emit('change', star)"
                >
                    <IconStar class="us-none pe-none" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import IconStar from '~/icons/IconStar.vue'

interface Props {
    score: number
    readonly?: boolean
}

withDefaults(defineProps<Props>(), {
    readonly: false
})
const emit = defineEmits<(event: 'change', val: number) => void>()

const hoveredItem = ref(0)
</script>

<style lang="scss" scoped>
.rating {
    $self: &;

    &__item {
        opacity: 0.4;

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -20px 0 0 -20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--ui-secondary);
            transform: scale(0.2);
            transition: all 0.2s ease;
        }

        &::before {
            opacity: 0.05;
            z-index: -2;
        }

        &::after {
            opacity: calc(1 / 19);
            z-index: -1;
        }

        &:hover {
            &::before {
                transform: scale(1);
            }
        }

        &:active {
            &::after {
                transform: scale(1);
            }
        }

        &:not(:last-child) {
            margin-right: 7px;
        }

        &.active {
            fill: var(--ui-secondary);
            opacity: 1;
        }
    }
}
</style>
