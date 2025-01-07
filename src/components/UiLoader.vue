<template>
    <div class="loader cursor-pointer pe-none d-flex justify-content-center align-items-center">
        <span
            class="loader__circle position-relative d-inline-flex br-50 border-box"
            :style="style"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
    size?: string
    width?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: '20px',
    width: '3px'
})

const style = computed<HTMLAttributes['style']>(() => ({
    width: props.size,
    height: props.size,
    borderWidth: `${props.width}`
}))
</script>

<style lang="scss" scoped>
.loader {
    &__circle {
        border: solid rgb(var(--ui-loader-color) / 0.2);
        border-top-color: rgb(var(--ui-loader-color));
        animation: spin 0.4s linear infinite;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
