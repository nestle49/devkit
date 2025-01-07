<template>
    <DemoWrapper class="demo-underline">
        <h2>Underline</h2>

        <div class="demo-underline__list">
            <UiUnderline class="demo-underline__item">
                <template #prepend> Углеводы </template>

                <template #append> 154 г </template>
            </UiUnderline>

            <UiUnderline class="demo-underline__item">
                <template #prepend>
                    <label
                        for="imageOffHandler"
                        class="cursor-pointer"
                    >
                        Отключить картинки
                    </label>
                </template>

                <template #append>
                    <UiSwitch
                        id="imageOffHandler"
                        :value="isImagesDisabled"
                        @input="isImagesDisabled = $event"
                    />
                </template>
            </UiUnderline>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiSwitch from '~/components/UiSwitch.vue'
import UiUnderline from '~/components/UiUnderline.vue'

const isImagesDisabled = ref(false)
</script>

<style lang="scss">
.demo-underline {
    &__item {
        max-width: 300px;
        font-size: 14px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
