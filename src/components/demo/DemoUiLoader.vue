<template>
    <div class="demo-loader d-inline-flex justify-content-center align-items-center">
        <UiLoader />
    </div>
</template>

<script lang="ts" setup>
import UiLoader from '~/components/UiLoader.vue'
</script>

<style lang="scss" scoped>
.demo-loader {
    background: var(--ui-secondary);
    padding: 1rem;
    border-radius: 16px;
}
</style>
