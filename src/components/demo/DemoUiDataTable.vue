<template>
    <DemoWrapper>
        <h2>Ui Data Table</h2>

        <div class="settings">
            <UiCheckbox
                id="draggable"
                :value="isDraggable"
                @input="isDraggable = $event"
            >
                Draggable
            </UiCheckbox>
        </div>

        <UiDataTable
            :headers="isDraggable ? headers : headers.filter(h => h.key !== 'sort')"
            :rows="rows"
            row-key="id"
            :total="users.length"
            :colored-rows="coloredRows"
            :draggable="isDraggable"
            @change-rows="rows = $event"
            @page-change="onPageChange"
        >
            <template
                v-if="isDraggable"
                #row(sort)
            >
                <UiIcon
                    name="move"
                    :size="22"
                    class="fill-secondary"
                />
            </template>

            <template #row(action_1)="{ row, currentPage }">
                <UiButton
                    :size="UiButtonSize.SMALL"
                    :type="UiButtonType.TEXT"
                    uppercase
                    @click="deleteRow(row, currentPage)"
                >
                    Delete
                </UiButton>
            </template>

            <template #row(action_2)="{ row, toggleDetails }">
                <UiButton
                    :size="UiButtonSize.SMALL"
                    :type="UiButtonType.TEXT"
                    uppercase
                    @click="toggleDetails(row)"
                >
                    Show / Hide details
                </UiButton>
            </template>

            <template #row(first_name)="{ row }">
                {{ row.first_name.toUpperCase() }}
            </template>

            <template #row(email)="{ row }">
                <span class="break-all">
                    {{ row.email }}
                </span>
            </template>

            <template #details="{ row }">
                <div class="details-wrap d-flex flex-column gap-15">
                    There should be detailed information for user `{{ row.first_name }} {{ row.last_name }}`
                </div>
            </template>

            <template #action>
                <UiButton class="table-action"> Action Button </UiButton>
            </template>

            <template #empty> Empty </template>
        </UiDataTable>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { type TableHeader, type TableOnPageChangeParams, UiDataTableRowColor, type UiRowColor } from '~/components/types/ui-table'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiIcon from '~/components/UiIcon.vue'
import UiDataTable from '~/components/UiTable/UiDataTable.vue'
import { type User, users } from '~/mock/users'

const headers: TableHeader[] = [
    {
        key: 'sort',
        title: 'Сортировка',
        width: 130
    },
    {
        key: 'action_1',
        title: 'Action #1'
    },
    {
        key: 'action_2',
        title: 'Action #2'
    },
    {
        key: 'id',
        title: 'ID',
        width: 100
    },
    {
        key: 'first_name',
        title: 'First Name'
    },
    {
        key: 'last_name',
        title: 'Last Name'
    },
    {
        key: 'email',
        title: 'email'
    }
]

const isDraggable = ref(false)
const pageSize = 10
const rows = ref<User[]>(users.slice(0, pageSize))

const getPageRows = (page: number) => {
    const startIndex = (page - 1) * pageSize
    return users.slice(startIndex, startIndex + pageSize)
}

const onPageChange = (params: TableOnPageChangeParams) => {
    rows.value = getPageRows(params.currentPage)
}

const deleteRow = (row: User, currentPage: number) => {
    const index = users.findIndex(r => r.id === row.id)
    users.splice(index, 1)

    rows.value = getPageRows(currentPage)

    alert(`Item with id ${row.id} was deleted`)
}

const coloredRows = computed(() =>
    rows.value.map<UiRowColor>((el, index) => ({
        index,
        color: (() => {
            if (el.first_name.startsWith('N') || el.first_name.startsWith('A')) {
                return UiDataTableRowColor.SUCCESS
            } else if (el.first_name.startsWith('S') || el.first_name.startsWith('O')) {
                return UiDataTableRowColor.WARN
            } else if (el.first_name.startsWith('R') || el.first_name.startsWith('E')) {
                return UiDataTableRowColor.DANGER
            } else {
                return undefined
            }
        })()
    }))
)
</script>

<style lang="scss" scoped>
.settings {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
}

.details-wrap {
    padding: 11.5px 50px;
}

.break-all {
    word-break: break-all;
}

.fill-secondary {
    fill: var(--ui-secondary);
}

@media (width <= 767px) {
    .table-action {
        width: 100%;
    }
}
</style>
