<template>
    <DemoWrapper>
        <h2>Ui Table</h2>

        <UiTable :items="fruits">
            <template #header(name)> Fruit </template>

            <template #header(count)> Count </template>

            <template #cell(name)="item">
                {{ item?.name }}
            </template>

            <template #cell(count)="item">
                {{ item?.count }}
            </template>

            <template #action>
                <UiButton
                    :size="UiButtonSize.LARGE"
                    :type="UiButtonType.TEXT"
                >
                    Скачать

                    <template #append-icon>
                        <UiIcon name="next" />
                    </template>
                </UiButton>
            </template>
        </UiTable>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiIcon from '~/components/UiIcon.vue'
import UiTable from '~/components/UiTable/UiTable.vue'
import fruits from '~/mock/fruits'
</script>
