<script setup lang="ts">
import { UiButtonColorMode, type UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import UiButton from '~/components/UiButton/UiButton.vue'

const props = defineProps<{
    size: UiButtonSize
    isSmall: boolean
    index: number
    activePage: number
    countPages: number
}>()

const { index, activePage, countPages } = toRefs(props)

const secondPage = 2
const isCurrentPageSecond = computed(() => index.value === secondPage)
const beforeLastPage = computed(() => countPages.value - 1)
const isCurrentPageBeforeLastPage = computed(() => beforeLastPage.value === index.value)

const isMobileVisible = computed(() => {
    const middlePage = Math.floor(countPages.value / 2)
    const isPagesLessThanFourPagesOrEqual = countPages.value <= 4

    if (isPagesLessThanFourPagesOrEqual) {
        return false
    }

    if (isCurrentPageBeforeLastPage.value && activePage.value <= middlePage) {
        return true
    }

    return isCurrentPageSecond.value && activePage.value > middlePage
})

const isDesktopVisible = computed(() => {
    const [pageAfterActive, pageBeforeActive] = [activePage.value + 1, activePage.value - 1]
    const isPagesLessThanSevenPages = countPages.value < 7
    const isActivePageMoreThanThirdPage = activePage.value > 3

    if (isPagesLessThanSevenPages) {
        return false
    }
    if (isCurrentPageSecond.value && pageBeforeActive > secondPage && isActivePageMoreThanThirdPage) {
        return true
    }

    return isCurrentPageBeforeLastPage.value && pageAfterActive < beforeLastPage.value
})

const isVisible = computed(() => (props.isSmall ? isMobileVisible.value : isDesktopVisible.value))
</script>

<template>
    <li v-if="isVisible">
        <UiButton
            :size="size"
            :type="UiButtonType.DEFAULT"
            :color-mode="UiButtonColorMode.NEUTRAL"
            class="pe-none"
            aria-label="page"
            square
        >
            <span class="fs-14 fw-600 secondary us-none">...</span>
        </UiButton>
    </li>
</template>
