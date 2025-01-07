<template>
    <div
        v-if="items.length"
        class="ui-table"
    >
        <div
            class="ui-table__wrapper"
            :class="{ 'overflow-auto': !!maxWidth }"
            :style="{ maxWidth: maxWidth ? `${maxWidth}px` : 'unset' }"
        >
            <table
                class="ui-table__data w-100"
                :class="{ 'overflow-hidden': !!maxWidth }"
            >
                <thead>
                    <tr>
                        <th
                            v-for="(_field, key, index) in items[0]"
                            :key="index"
                            class="montserrat fs-14 fw-500 lh-120"
                        >
                            <slot
                                :name="`header(${key})`"
                                v-bind="items[0]"
                            />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, itemIndex) in activePageItems"
                        :key="itemIndex"
                    >
                        <td
                            v-for="(_field, key, index) in item"
                            :key="index"
                            class="montserrat fs-14 fw-400 lh-120"
                            :class="{ 'text-center': centered }"
                        >
                            <slot
                                :name="`cell(${key})`"
                                v-bind="item"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            v-if="items.length > pageSize"
            class="ui-table__footer d-flex justify-content-between mt-30"
        >
            <slot name="action" />

            <UiPagination
                :active-page="activePage"
                :count="items.length"
                :page-size="pageSize"
                @change-page="activePage = $event"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TableItem } from '~/components/types/ui-table'

interface Props {
    items: TableItem[]
    pageSize?: number
    maxWidth?: number
    centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    pageSize: 10,
    maxWidth: undefined,
    centered: true
})

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
const UiPagination = defineAsyncComponent(() => import('~/components/UiPagination/UiPagination.vue'))

const { items, pageSize } = toRefs(props)

const activePage = ref(1)
const activePageItems = computed(() => {
    const offset = activePage.value === 1 ? 0 : 1
    const startIndex = (activePage.value - 1) * pageSize.value - offset

    return items.value.slice(startIndex, startIndex + pageSize.value)
})
</script>

<style lang="scss" scoped>
$phone: 512px;

.ui-table {
    &__wrapper {
        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    &__footer {
        @media (max-width: $phone) {
            margin-top: 10px;
            gap: 10px;
            flex-direction: column;
            align-items: center;
        }
    }
}

table {
    border-spacing: 0;

    thead {
        th {
            background: var(--ui-table-head-bg);
            color: var(--ui-table-head-color);
            border-right: 1px solid var(--ui-table-head-border-color);
            height: 42px;
            padding: 4px 20px;

            &:first-of-type {
                border-top-left-radius: 20px;
            }

            &:last-of-type {
                border-top-right-radius: 20px;
                border: none;
            }
        }
    }

    tbody {
        td {
            background: var(--ui-table-body-bg);
            color: var(--ui-table-body-color);
            border: 1px solid var(--ui-table-body-border-color);
            border-top: none;
            border-left: none;
            box-sizing: border-box;
            height: 42px;
            padding: 4px 20px;

            &:first-of-type {
                border-left: 1px solid var(--ui-table-body-border-color);
            }
        }

        tr {
            &:last-of-type {
                border: none;

                & td {
                    &:first-of-type {
                        border-bottom-left-radius: 20px;
                    }

                    &:last-of-type {
                        border-bottom-right-radius: 20px;
                    }
                }
            }
        }
    }
}
</style>
