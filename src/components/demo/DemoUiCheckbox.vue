<template>
    <DemoWrapper>
        <h2>Ui Checkbox</h2>
        <pre>{{ checkboxVal ? 'Enabled' : 'Disabled' }}</pre>
        <UiCheckbox
            id="exampleCheckbox"
            :value="checkboxVal"
            @input="checkboxVal = $event"
        >
            Text
        </UiCheckbox>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'

const checkboxVal = ref(false)
</script>
