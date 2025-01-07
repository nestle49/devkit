<template>
    <DemoWrapper>
        <div>
            <UiHeading :level="6"> Date-time picker </UiHeading>

            <UiDateTimePicker
                v-model="selectedDateTime"
                label="Select date and time"
                :time-picker-settings="{ startTime: { hours: 10, minutes: 15 } }"
                placeholder="Select date and time"
            />
        </div>

        <div>
            <UiHeading :level="6"> [independent] Date-time picker </UiHeading>

            <UiDateTimePicker
                v-model="selectedDateTime"
                :time-picker-settings="{ startTime: { hours: 10, minutes: 15 } }"
                independent
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'

import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiDateTimePicker from '~/components/UiFields/UiDateTimePicker.vue'
import UiHeading from '~/components/UiHeading.vue'

const selectedDateTime = ref<Dayjs>()
</script>
