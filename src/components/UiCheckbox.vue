<template>
    <div class="checkbox position-relative d-flex align-items-center z-index-1">
        <input
            :id="id"
            type="checkbox"
            class="checkbox d-none"
            :checked="value"
            @change="change"
        />

        <label
            class="label cursor-pointer d-inline-flex us-none"
            :class="{ 'pe-none opacity-50': disabled, 'w-100': extended, 'align-items-center': centered }"
            :for="id"
            :style="{
                paddingTop: `${paddingTop}px`,
                paddingRight: `${paddingRight}px`,
                paddingBottom: `${paddingBottom}px`,
                paddingLeft: `${paddingLeft}px`
            }"
        >
            <span class="icon-wrapper position-relative d-inline-flex justify-content-center align-items-center border-box ease">
                <IconCheckMark class="pe-none position-absolute" />
            </span>

            <div
                v-if="$slots.default"
                class="slot fs-14 fw-400 lh-140 ls-05"
                :class="{ 'text-nowrap': !wrap }"
            >
                <slot />
            </div>
        </label>
    </div>
</template>

<script lang="ts" setup>
import IconCheckMark from '~/icons/IconCheckMark.vue'

interface Props {
    id: string
    value?: boolean
    disabled?: boolean
    extended?: boolean
    paddingTop?: number
    paddingRight?: number
    paddingBottom?: number
    paddingLeft?: number
    wrap?: boolean
    centered?: boolean
}

withDefaults(defineProps<Props>(), {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    wrap: true,
    centered: true
})

const emit = defineEmits<(event: 'input', val: boolean) => void>()

const change = (event: Event) => {
    emit('input', (event.target as HTMLInputElement).checked)
}
</script>

<style scoped lang="scss">
.icon-wrapper {
    width: 18px;
    min-width: 18px;
    height: 18px;
    border-radius: 3px;
    background: var(--ui-checkbox-bg);
    border: solid 1px var(--ui-checkbox);

    & svg {
        width: 11px;
        height: 8px;
        fill: transparent;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--ui-checkbox);
        transform: scale(0.2);
        transition: all 0.2s ease;
    }

    &::before {
        opacity: 0.05;
        z-index: -2;
    }

    &::after {
        opacity: calc(1 / 19);
        z-index: -1;
    }
}

.label {
    min-height: 20px;

    &:hover {
        .icon-wrapper {
            &::before {
                transform: scale(1);
            }
        }
    }

    &:active {
        .icon-wrapper {
            &::after {
                transform: scale(1);
            }
        }
    }
}

.checkbox {
    &:checked {
        & + .label .icon-wrapper {
            background: var(--ui-checkbox);

            & svg {
                fill: var(--ui-checkbox-icon);
            }
        }
    }
}

.slot {
    margin-left: 7px;
}
</style>
