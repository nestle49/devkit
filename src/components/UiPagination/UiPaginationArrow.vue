<script setup lang="ts">
import { UiButtonColorMode, type UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { PaginationDirection } from '~/components/types/ui-pagination-arrow'
import UiButton from '~/components/UiButton/UiButton.vue'
import IconPrev from '~/icons/IconPrev.vue'

const props = defineProps<{
    type: PaginationDirection
    isSmall: boolean
    size: UiButtonSize
    activePage: number
    countPages: number
}>()

defineEmits<(event: 'change', val: number) => void>()

const isPrev = computed(() => props.type === PaginationDirection.PREV)

const classes = computed(() => ({
    'pe-none': isPrev.value ? props.activePage === 1 : props.activePage === props.countPages,
    'mr-15': isPrev.value && !props.isSmall,
    'ml-15': !isPrev.value && !props.isSmall,
    'm-0': props.isSmall
}))

const prevOrNextNumber = computed(() => {
    if (isPrev.value) {
        return props.activePage > 1 ? props.activePage - 1 : 1
    }

    return props.activePage < props.countPages ? props.activePage + 1 : props.activePage
})
</script>

<template>
    <li :class="classes">
        <UiButton
            :size="size"
            :type="UiButtonType.DEFAULT"
            :color-mode="UiButtonColorMode.NEUTRAL"
            :aria-label="type"
            square
            @click="$emit('change', prevOrNextNumber)"
        >
            <IconPrev
                class="pe-none us-none"
                :class="isPrev ? 'rotate-0' : 'rotate-180'"
            />
        </UiButton>
    </li>
</template>
