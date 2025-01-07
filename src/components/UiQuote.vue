<template>
    <div class="quote position-relative">
        <IconQuote class="quote__icon position-absolute pe-none us-none" />

        <div class="quote__content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import IconQuote from '~/icons/IconQuote.vue'
</script>

<style lang="scss">
.quote {
    &__icon {
        opacity: 0.2;
        fill: var(--ui-secondary);
        width: 50px;
        height: 50px;
        left: -25px;
        top: -4px;
    }
}
</style>
