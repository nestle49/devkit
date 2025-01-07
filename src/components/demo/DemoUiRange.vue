<template>
    <DemoWrapper>
        <h2>Ui Range</h2>

        <label for="exampleInputRangeWithoutSlots">Custom label</label>

        <br /><br />

        <UiRange
            id="exampleInputRangeWithoutSlots"
            :min="500"
            :max="10000"
            :step="100"
            :start-value="inputRangeWithoutSlotsVal"
            @input-start="inputRangeWithoutSlotsVal = $event"
        />

        <br /><br />

        <UiRange
            id="exampleInputRange"
            :min="500"
            :max="10000"
            :step="100"
            :start-value="inputRangeVal"
            @input-start="inputRangeVal = $event"
        >
            <template #label>
                <span class="fs-14 fw-500 lh-160">Searching radius:</span>
            </template>

            <template #current-start>
                <span class="fs-14 fw-400 lh-140 secondary">
                    {{ inputRangeVal < 1000 ? `${inputRangeVal} m` : `${inputRangeVal / 1000} km` }}
                </span>
            </template>

            <template #legend>
                <span class="indigo text-nowrap fs-14 fw-400 lh-140 ls-05">From 500 m</span>
                <span class="indigo text-nowrap fs-14 fw-400 lh-140 ls-05">To 10 km</span>
            </template>
        </UiRange>

        <br /><br /><br />

        <UiRange
            id="exampleInputRangeWithTwoThumbs"
            :min="0"
            :max="100"
            :step="1"
            :start-value="inputRangeValStart"
            :end-value="inputRangeValEnd"
            @input-start="inputRangeValStart = $event"
            @input-end="inputRangeValEnd = $event"
        >
            <template #current-start>
                <span class="fs-14 fw-400 lh-140 secondary">{{ inputRangeValStart }}</span>
            </template>

            <template #current-end>
                <span class="fs-14 fw-400 lh-140 secondary">{{ inputRangeValEnd }}</span>
            </template>

            <template #legend>
                <span class="indigo text-nowrap fs-14 fw-400 lh-140 ls-05">From 0</span>
                <span class="indigo text-nowrap fs-14 fw-400 lh-140 ls-05">To 100</span>
            </template>
        </UiRange>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiRange from '~/components/UiRange.vue'

const inputRangeWithoutSlotsVal = ref(4750 + 250)
const inputRangeVal = ref(4750 + 250)
const inputRangeValStart = ref(8)
const inputRangeValEnd = ref(50)
</script>
