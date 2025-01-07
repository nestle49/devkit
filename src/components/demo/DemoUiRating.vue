<template>
    <DemoWrapper>
        <h2>Ui Rating</h2>
        <pre>{{ rating }}</pre>
        <UiRating
            :score="rating"
            @change="rating = $event"
        />
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiRating from '~/components/UiRating.vue'

const rating = ref(4)
</script>
