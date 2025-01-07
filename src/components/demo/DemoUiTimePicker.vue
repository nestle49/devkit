<template>
    <DemoWrapper>
        <div>
            <UiHeading :level="6"> Time picker </UiHeading>

            <UiTimePicker
                v-model="selectedTime"
                :minutes-step="15"
                label="Select time"
                :start-time="{ hours: 10, minutes: 15 }"
                placeholder="Select time"
            />
        </div>

        <div>
            <UiHeading :level="6"> [independent] Time picker </UiHeading>

            <UiTimePicker
                v-model="selectedTime"
                :minutes-step="15"
                :start-time="{ hours: 10, minutes: 15 }"
                placeholder="Select time"
                independent
                class="time-picker__independent"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import type { ITime } from '~/components/types/ui-timepicker'
import UiTimePicker from '~/components/UiFields/UiTimePicker.vue'
import UiHeading from '~/components/UiHeading.vue'

const selectedTime = ref<ITime>()
</script>

<style lang="scss" scoped>
.time-picker__independent {
    display: inline-block;
}
</style>
