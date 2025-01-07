<template>
    <ul
        v-if="countPages > 1"
        class="d-flex m-0 p-0 list-style-none gap-5"
    >
        <UiPaginationArrow
            :is-small="isSmall"
            :size="currentSize"
            :count-pages="countPages"
            :active-page="activePage"
            :type="PaginationDirection.PREV"
            @change="changePage($event)"
        />

        <template
            v-for="index in countPages"
            :key="index"
        >
            <UiPaginationDots
                :is-small="isSmall"
                :size="currentSize"
                :index="index"
                :active-page="activePage"
                :count-pages="countPages"
            />

            <UiPaginationItem
                :is-small="isSmall"
                :size="currentSize"
                :index="index"
                :active-page="activePage"
                :count-pages="countPages"
                @click="changePage(index)"
            />
        </template>

        <UiPaginationArrow
            :is-small="isSmall"
            :size="currentSize"
            :count-pages="countPages"
            :active-page="activePage"
            :type="PaginationDirection.NEXT"
            @change="changePage($event)"
        />
    </ul>
</template>

<script lang="ts" setup>
import { UiButtonSize } from '~/components/types/ui-button'
import { PaginationDirection } from '~/components/types/ui-pagination-arrow'
import UiPaginationArrow from '~/components/UiPagination/UiPaginationArrow.vue'
import UiPaginationDots from '~/components/UiPagination/UiPaginationDots.vue'
import UiPaginationItem from '~/components/UiPagination/UiPaginationItem.vue'

interface Props {
    isSmall?: boolean
    activePage?: number
    count?: number
    pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
    isSmall: undefined,
    activePage: 1,
    count: 0,
    pageSize: 10
})

const emit = defineEmits<(event: 'change-page', val: number) => void>()

const [debounce, breakpoint] = [500, 768]

const { activePage, count, pageSize } = toRefs(props)

const { width } = useWindowSize()
const windowWidth = refDebounced(width, debounce)

const isSmall = computed(() => props.isSmall ?? windowWidth.value < breakpoint)
const currentSize = computed(() => (isSmall.value ? UiButtonSize.SMALL : UiButtonSize.MEDIUM))

const countPages = computed(() =>
    count.value % pageSize.value === 0 ? count.value / pageSize.value : (count.value - (count.value % pageSize.value)) / pageSize.value + 1
)

const changePage = (pageNumber: number) => {
    emit('change-page', pageNumber)
}
</script>
