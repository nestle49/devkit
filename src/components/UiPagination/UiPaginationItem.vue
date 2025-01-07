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

const firstPage = 1
const isCurrentPageActive = computed(() => index.value === activePage.value)
const isCurrentPageFirst = computed(() => index.value === firstPage)
const isCurrentPageLast = computed(() => index.value === countPages.value)

const isMobileVisible = computed(() => {
    const isFirstPageActive = activePage.value === firstPage
    const isSecondPage = index.value === 2
    const beforeLastPage = countPages.value - 1
    const isPagesLessThanFourPagesOrEqual = countPages.value <= 4

    if (isPagesLessThanFourPagesOrEqual || (isSecondPage && isFirstPageActive)) {
        return true
    }

    return index.value === beforeLastPage && activePage.value === countPages.value
})

const isDesktopVisible = computed(() => {
    const [pageAfterActive, pageBeforeActive] = [activePage.value + 1, activePage.value - 1]
    const [fifthFromLastPage, thirdFromLastPage] = [countPages.value - 5, countPages.value - 3]
    const [isCurrentPageLessThanSixPage, isActivePageLessThanFourthPage] = [index.value < 6, activePage.value < 4]

    if (isCurrentPageLessThanSixPage && isActivePageLessThanFourthPage) {
        return true
    }

    if (index.value > fifthFromLastPage && activePage.value > thirdFromLastPage) {
        return true
    }

    if (index.value === pageAfterActive && pageAfterActive < countPages.value) {
        return true
    }

    return index.value === pageBeforeActive && pageBeforeActive > firstPage
})

const isVisible = computed(() => {
    if (isCurrentPageFirst.value || isCurrentPageLast.value || isCurrentPageActive.value) {
        return true
    }

    return props.isSmall ? isMobileVisible.value : isDesktopVisible.value
})
</script>

<template>
    <li v-if="isVisible">
        <UiButton
            :size="size"
            :type="UiButtonType.DEFAULT"
            :color-mode="UiButtonColorMode.NEUTRAL"
            :class="{ 'pe-none': isCurrentPageActive }"
            aria-label="page"
            :active="isCurrentPageActive"
            square
        >
            <span class="fs-14 fw-600 secondary us-none">{{ index }}</span>
        </UiButton>
    </li>
</template>
