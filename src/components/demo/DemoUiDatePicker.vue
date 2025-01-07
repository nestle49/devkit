<template>
    <DemoWrapper>
        <div>
            <UiHeading :level="6"> Date picker </UiHeading>

            <UiDatePicker
                v-model="selectedDate"
                label="Select date"
                placeholder="Select date"
            />
        </div>

        <div>
            <UiHeading :level="6"> [independent] Date picker </UiHeading>

            <UiDatePicker
                v-model="selectedDate"
                independent
            />
        </div>

        <div>
            <UiHeading :level="6"> With initial date </UiHeading>

            <UiDatePicker v-model="initialDate" />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiDatePicker from '~/components/UiFields/UiDatePicker.vue'
import UiHeading from '~/components/UiHeading.vue'

const selectedDate = ref<Dayjs>()
const initialDate = ref<Dayjs>(dayjs('2022-09-10'))
</script>
