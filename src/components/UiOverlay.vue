<template>
    <Transition
        name="ui-fade"
        appear
    >
        <div
            v-if="active"
            class="ui-overlay position-fixed w-100 h-100 top-0 left-0 right-0 bottom-0 z-index-25"
        >
            <slot />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
interface Props {
    active?: boolean
}

withDefaults(defineProps<Props>(), {
    active: false
})
</script>

<style lang="scss" scoped>
.ui-overlay {
    background: rgb(0 0 0 / 0.7);
}
</style>
