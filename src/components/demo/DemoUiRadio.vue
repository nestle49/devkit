<template>
    <DemoWrapper>
        <h2>Ui Radio</h2>
        <pre>{{ radioVal ? radioVal : 'Empty' }}</pre>

        <div class="groups d-grid">
            <div class="group d-grid">
                <UiRadio
                    id="radioButton1"
                    name="group1"
                    value="firstRadio"
                    :checked="radioVal === 'firstRadio'"
                    @input="radioVal = $event"
                >
                    Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text
                    Text Text Text Text Text Text Text Text
                </UiRadio>

                <UiRadio
                    id="radioButton2"
                    name="group1"
                    value="secondRadio"
                    transparent
                    :checked="radioVal === 'secondRadio'"
                    @input="radioVal = $event"
                >
                    Text
                </UiRadio>

                <UiRadio
                    id="radioButton3"
                    value="thirdRadio"
                    disabled
                    @input="radioVal = $event"
                >
                    Text
                </UiRadio>

                <UiRadio
                    id="radioButton4"
                    value="fourthRadio"
                    disabled
                    checked
                    @input="radioVal = $event"
                >
                    Text
                </UiRadio>
            </div>

            <div class="group d-grid">
                <UiRadio
                    id="radioButton5"
                    name="group2"
                    value="firstRadio"
                    :mode="UiRadioMode.BUTTON"
                    :checked="radioVal === 'firstRadio'"
                    @input="radioVal = $event"
                >
                    25 см
                </UiRadio>

                <UiRadio
                    id="radioButton6"
                    name="group2"
                    :mode="UiRadioMode.BUTTON"
                    :checked="radioVal === 'secondRadio'"
                    value="secondRadio"
                    @input="radioVal = $event"
                >
                    25 см
                </UiRadio>

                <UiRadio
                    id="radioButton7"
                    :mode="UiRadioMode.BUTTON"
                    value="thirdRadio"
                    disabled
                    @input="radioVal = $event"
                >
                    25 см
                </UiRadio>

                <UiRadio
                    id="radioButton8"
                    name="group8"
                    :mode="UiRadioMode.BUTTON"
                    value="fourthRadio"
                    disabled
                    checked
                    @input="radioVal = $event"
                >
                    25 см
                </UiRadio>
            </div>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiRadioMode } from '~/components/types/ui-radio'
import UiRadio from '~/components/UiRadio.vue'

const radioVal = ref('firstRadio')
</script>

<style lang="scss" scoped>
.groups {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    place-items: center;
}

.group {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
}
</style>
