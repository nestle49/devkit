<template>
    <div
        ref="dataTable"
        class="ui-table"
    >
        <UiScroll
            class="ui-table__wrapper"
            :vertical-offset="-25"
            :style="{
                maxWidth: maxWidth ? `${maxWidth}px` : '100%'
            }"
        >
            <div>
                <table
                    class="ui-data-table w-100"
                    :class="{ 'overflow-hidden': !!maxWidth }"
                    :style="{
                        minWidth: minWidth ? `${minWidth}px` : 'unset'
                    }"
                >
                    <thead>
                        <tr>
                            <th
                                v-for="header in headers"
                                :key="header.key"
                                class="montserrat fs-14 fw-500 lh-120"
                                :style="{ width: getHeaderWidth(header) }"
                            >
                                <slot
                                    :name="`header(${header.key})`"
                                    v-bind="{ header, currentPage }"
                                >
                                    <template v-if="header.title">
                                        {{ header.title }}
                                    </template>
                                </slot>
                            </th>
                        </tr>
                    </thead>

                    <tbody
                        v-if="rows.length"
                        ref="tableBody"
                        @dragstart="onDragStart"
                        @dragend="onDragEnd"
                    >
                        <tr
                            v-for="(row, rowIndex) of rows"
                            :key="row.id"
                            class="ui-table__row"
                        >
                            <td :colspan="headers.length">
                                <table class="ui-table__inner">
                                    <tbody>
                                        <tr :class="coloredRows?.[rowIndex]?.color ? `ui-row-${coloredRows[rowIndex].color}` : ''">
                                            <td
                                                v-for="header in headers"
                                                :key="`${rowIndex}${header.key}${row[header.key]}`"
                                                :class="{
                                                    'text-center': centered,
                                                    handle: header.key === 'sort',
                                                    'cursor-default': !draggable
                                                }"
                                                class="montserrat fs-14 fw-400 lh-120"
                                                :style="{ width: getHeaderWidth(header) }"
                                            >
                                                <slot
                                                    :name="`row(${header.key})`"
                                                    v-bind="{ row, rowIndex, currentPage, toggleDetails }"
                                                >
                                                    {{ row[header.key] }}
                                                </slot>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <UiTransitionExpand>
                                    <div
                                        v-if="areDetailsOpened(row)"
                                        class="ui-table__details position-sticky left-0"
                                        :style="{ maxWidth: `${dataTableWidth - 2}px` }"
                                    >
                                        <slot
                                            name="details"
                                            v-bind="{ row, rowIndex, currentPage, toggleDetails }"
                                        />
                                    </div>
                                </UiTransitionExpand>
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-else-if="$slots.empty">
                        <tr class="ui-table__row">
                            <td
                                :colspan="headers.length"
                                class="ui-table__empty montserrat fs-14 fw-400 lh-120 d-flex justify-content-center align-items-center position-sticky left-0"
                                :style="{ width: `${dataTableWidth - 2}px` }"
                            >
                                <slot name="empty" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </UiScroll>

        <div
            v-if="$slots.action || (total && total > pageSize)"
            class="table-nav w-100 d-flex justify-content-between flex-1"
            :class="{ 'table-overflow': isTableOverflow }"
        >
            <slot name="action" />

            <UiPagination
                v-if="total && total > pageSize"
                :active-page="currentPage"
                :count="total"
                :page-size="pageSize"
                @change-page="currentPage = $event"
            />
        </div>
    </div>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import { useSortable } from '@vueuse/integrations/useSortable'

import type { TableHeader, TableOnPageChangeParams, UiRowColor } from '~/components/types/ui-table'
import UiScroll from '~/components/UiScroll.vue'
import UiTransitionExpand from '~/components/UiTransitionExpand.vue'
import { useUiDragScroll } from '~/composables/useUiDragScroll'

interface Props {
    headers: TableHeader[]
    rows: T[]
    rowKey: keyof T
    /**
     * Total number of elements in table
     */
    total?: number
    pageSize?: number
    maxWidth?: number
    minWidth?: number
    centered?: boolean
    draggable?: boolean
    coloredRows?: UiRowColor[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Emits = {
    (event: 'change-rows', newRows: T[]): void
    (event: 'page-change', params: TableOnPageChangeParams): void
    (event: 'drag-start'): void
    (event: 'drag-end'): void
}

const props = withDefaults(defineProps<Props>(), {
    pageSize: 10,
    maxWidth: undefined,
    minWidth: undefined,
    centered: true
})

const emit = defineEmits<Emits>()

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
const UiPagination = defineAsyncComponent(() => import('~/components/UiPagination/UiPagination.vue'))

const openedDetailsRowKeys = ref<T[Props['rowKey']][]>([])

const { container: dataTable, element: tableBody } = useUiDragScroll()

const { width: dataTableWidth } = useElementSize(dataTable)

// eslint-disable-next-line vue/no-setup-props-destructure, vue/no-setup-props-reactivity-loss
const sortable = useSortable(tableBody, () => props.rows, {
    handle: '.handle',
    animation: 150,
    disabled: !props.draggable
})

const isTableOverflow = ref(false)

// eslint-disable-next-line vue/no-setup-props-destructure, vue/no-setup-props-reactivity-loss
const { currentPage } = useOffsetPagination({
    total: props.total,
    page: 1,
    pageSize: () => props.pageSize,
    onPageChange: page => {
        emit('page-change', page)
    }
})

const onDragStart = () => {
    emit('drag-start')
}

const onDragEnd = () => {
    emit('drag-end')
}

const areDetailsOpened = (row: T) => openedDetailsRowKeys.value.includes(row[props.rowKey])

const toggleDetails = (row: T) => {
    if (areDetailsOpened(row)) {
        const idx = openedDetailsRowKeys.value.findIndex(r => r === row[props.rowKey])
        openedDetailsRowKeys.value.splice(idx, 1)
        return
    }

    openedDetailsRowKeys.value.push(row[props.rowKey])
}

const getHeaderWidth = (header: TableHeader) => {
    if (header.width) {
        return typeof header.width === 'string' ? header.width : `${header.width}px`
    }

    return 'auto'
}

useMutationObserver(
    dataTable,
    () => {
        isTableOverflow.value = !!dataTable.value?.querySelector<HTMLElement>('.simplebar-scrollable-x')
    },
    {
        attributes: true,
        childList: true,
        subtree: true
    }
)

watch(
    () => props.rows,
    () => {
        /** Useful when deleting rows in table */
        if (props.rows.length === 0 && currentPage.value > 1) {
            currentPage.value -= 1
        }

        if (openedDetailsRowKeys.value.length) {
            openedDetailsRowKeys.value = openedDetailsRowKeys.value.filter(key => props.rows.some(row => row[props.rowKey] === key))
        }
    }
)

watch(currentPage, () => {
    openedDetailsRowKeys.value = []
})

watch(
    () => props.draggable,
    () => {
        sortable.option('disabled', !props.draggable)
    }
)
</script>

<style lang="scss" scoped>
@mixin table-data-style {
    color: var(--ui-table-body-color);
    border-right: 1px solid var(--ui-table-body-border-color);
    border-bottom: 1px solid var(--ui-table-body-border-color);
    height: 42px;
    padding: 4px 12px;
    box-sizing: border-box;

    &:last-of-type {
        border-right: none;
    }
}

.handle:not(.cursor-default) {
    cursor: move;
}

#draggable *:active {
    cursor: move;
}

.ui-data-table {
    :deep(.simplebar-content-wrapper),
    :deep(.simplebar-mask) {
        border-radius: 0;
        outline: none;
    }
}

.flip-list-move {
    transition: transform 0.5s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

table {
    border-spacing: 0;
    width: 100%;
    table-layout: fixed;

    thead {
        th {
            background: var(--ui-table-head-bg);
            color: var(--ui-table-head-color);
            border-right: 1px solid var(--ui-table-head-border-color);
            height: 42px;
            padding: 4px 20px;
            box-sizing: border-box;

            &:first-of-type {
                border-top-left-radius: 20px;
            }

            &:last-of-type {
                border-top-right-radius: 20px;
                border: none;
            }
        }
    }

    & tbody {
        & td {
            padding: 0;
        }

        & tr {
            & td {
                &:first-of-type {
                    border-left: none;
                }

                &:last-of-type {
                    border-right: none;
                }

                & .ui-table__inner {
                    td {
                        @include table-data-style;
                    }
                }
            }
        }
    }
}

.ui-table {
    :deep(.simplebar-content-wrapper),
    :deep(.simplebar-mask) {
        border-radius: 20px;
        box-sizing: border-box;
        overflow: auto;
        outline: 1px solid var(--ui-table-body-border-color);
    }

    &__wrapper {
        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;

        @media (width <= 767px) {
            :deep(.simplebar-track.simplebar-horizontal) {
                visibility: hidden !important;
            }
        }
    }

    &__details {
        border-bottom: 1px solid var(--ui-table-body-border-color);
        background: var(--ui-table-details-bg);
    }

    &__row {
        &:last-child {
            td {
                border-bottom: none;
            }
        }

        &:last-of-type {
            border-bottom: 1px solid var(--ui-table-body-border-color);

            & .ui-table__details {
                border-top: 1px solid var(--ui-table-body-border-color);
                border-bottom: none;
            }
        }
    }

    &__empty {
        @include table-data-style;

        height: 50px;
    }
}

.table-nav {
    margin: 30px 0 0;

    &.table-overflow {
        margin: 70px 0 0;
    }

    @media (width <= 767px) {
        &,
        &.table-overflow {
            margin-top: 35px;
            gap: 25px;
            flex-direction: column;
            align-items: center;
        }
    }
}

.table-background {
    background: var(--ui-table-body-bg);
}

@media (width <= 767px) {
    th {
        font-size: 12px;
        line-height: 1.2;
    }

    td {
        font-size: 12px;
        line-height: 1.6;
    }
}
</style>
