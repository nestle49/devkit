<template>
    <div class="underline d-flex w-100 justify-content-between align-items-end">
        <div class="underline__item d-flex">
            <slot name="prepend" />
        </div>

        <hr class="underline__line border-none w-100" />

        <div class="underline__item d-flex">
            <slot name="append" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.underline {
    &__line {
        border-bottom: 1px dashed var(--ui-underline);
        margin: 0 5px 3px;
    }

    &__item {
        flex-shrink: 0;
    }
}
</style>
