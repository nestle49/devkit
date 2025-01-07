<template>
    <DemoWrapper>
        <h2>Ui Switch</h2>
        <pre>{{ switchVal ? 'Enabled' : 'Disabled' }}</pre>
        <UiSwitch
            id="exampleSwitch"
            :value="switchVal"
            @input="switchVal = $event"
        >
            Text
        </UiSwitch>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiSwitch from '~/components/UiSwitch.vue'

const switchVal = ref(false)
</script>
