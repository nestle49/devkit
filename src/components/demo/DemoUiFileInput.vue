<template>
    <DemoWrapper>
        <h2>File Input</h2>

        <h3>Multiple</h3>
        <br />

        <div class="d-grid input-grid">
            <UiFileInput
                id="multipleFileInput"
                label="Lorem"
                placeholder="Lorem"
                multiple
                @input="filesMultiple = $event"
            />
        </div>
        <br /><br />

        <h3>Single</h3>
        <br />
        <div class="d-grid input-grid">
            <UiFileInput
                id="singleFileInput"
                placeholder="Text"
                @input="fileSingle = $event"
            />

            <UiFileInput
                id="singleFileInputDisabled"
                placeholder="Text"
                disabled
                @input="fileSingle = $event"
            />

            <UiFileInput
                id="singleFileInputError"
                placeholder="Text"
                error
                @input="fileSingle = $event"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiFileInput from '~/components/UiFields/UiFileInput.vue'

const filesMultiple = ref<File[] | null>(null)
const fileSingle = ref<File[] | null>(null)
</script>

<style lang="scss" scoped>
.input-grid {
    grid-gap: 30px;
}
</style>
