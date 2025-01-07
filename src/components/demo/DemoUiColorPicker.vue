<template>
    <DemoWrapper>
        <h2>Ui Color Picker</h2>

        <div class="d-grid input-grid">
            currentColor: {{ currentColor }}
            <UiColorPicker
                id="simpleColorPicker"
                label="Color"
                placeholder="#"
                :value="currentColor"
                @input="currentColor = $event"
            />

            currentColorCustomPalette: {{ currentColorCustomPalette }}<br /><br />
            customPalette: {{ customPalette }}
            <UiColorPicker
                placeholder="#"
                :palette="customPalette"
                :value="currentColorCustomPalette"
                @input="currentColorCustomPalette = $event"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiColorPicker from '~/components/UiFields/UiColorPicker.vue'

const currentColor = ref('#FF5E94')
const currentColorCustomPalette = ref('#19FF57')
const customPalette = ['#759c7f', '#6aa379', '#63ad77', '#5cb574', '#41e86e', '#2fed63', '#24f25c', '#18f554', '#0af549']
</script>

<style lang="scss" scoped>
.input-grid {
    grid-gap: 30px;
}
</style>
