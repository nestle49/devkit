<template>
    <DemoWrapper>
        <h2>Ui Count</h2>

        <div class="d-flex gap-20 mb-20">
            <UiCheckbox
                id="ui-count-visible-label"
                :value="isWithLabel"
                @input="isWithLabel = $event"
            >
                isWithLabel
            </UiCheckbox>

            <UiCheckbox
                id="ui-count-required-label"
                :value="isRequired"
                @input="isRequired = $event"
            >
                isRequired
            </UiCheckbox>
        </div>
        <div class="count-grid d-grid">
            <UiCount
                :label="currentLabel"
                :required="isRequired"
                :value="countDefaultActive"
                placeholder="0"
                :min="0"
                @change="value => (countDefaultActive = value)"
            />
            <UiCount
                :label="currentLabel"
                :required="isRequired"
                :mode="UiCountMode.MEDIUM"
                :value="countDefaultMediumActive"
                placeholder="0"
                @change="value => (countDefaultMediumActive = value)"
            />
            <UiCount
                :label="currentLabel"
                :required="isRequired"
                :mode="UiCountMode.SMALL"
                :value="countDefaultSmallActive"
                placeholder="0"
                @change="value => (countDefaultSmallActive = value)"
            />

            <UiCount
                :label="currentLabel"
                :required="isRequired"
                disabled
                :value="0"
                :min="0"
            />
            <UiCount
                :label="currentLabel"
                :required="isRequired"
                disabled
                :value="1"
                :mode="UiCountMode.MEDIUM"
            />
            <UiCount
                :label="currentLabel"
                :required="isRequired"
                disabled
                :mode="UiCountMode.SMALL"
                :value="0"
            />

            <UiCount
                :label="currentLabel"
                :required="isRequired"
                :min="10"
                :value="countDefaultError"
                @change="value => (countDefaultError = value)"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiCountMode } from '~/components/types/ui-count'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiCount from '~/components/UiFields/UiCount.vue'

const isWithLabel = ref(false)
const isRequired = ref(false)
const countDefaultActive = ref(0)
const countDefaultMediumActive = ref(0)
const countDefaultSmallActive = ref(0)

const countDefaultError = ref(0)
const currentLabel = computed(() => (isWithLabel.value ? 'Lorem' : ''))
</script>

<style lang="scss" scoped>
.count-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
}
</style>
