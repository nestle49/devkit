<template>
    <div class="switch position-relative d-inline-flex align-items-center">
        <input
            :id="id"
            type="checkbox"
            class="checkbox d-none"
            :checked="value"
            @change="change"
        />

        <label
            class="label position-relative cursor-pointer d-inline-flex justify-content-between align-items-center us-none"
            :class="{ 'pe-none': disabled, 'row-reverse': reverse }"
            :for="id"
        >
            <span
                class="track position-relative z-index-1"
                :class="{ 'opacity-50': disabled }"
            >
                <span class="thumb position-absolute bg-light br-50 ease" />
            </span>

            <div
                v-if="$slots.default"
                class="slot fs-14 fw-400 lh-140 ls-05"
                :style="{
                    marginLeft: `${reverse ? 0 : margin}px`,
                    marginRight: `${!reverse ? 0 : margin}px`
                }"
                :class="{ 'text-nowrap': !wrap }"
            >
                <slot />
            </div>
        </label>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    id: string
    value?: boolean
    disabled?: boolean
    wrap?: boolean
    margin?: number
    reverse?: boolean
}

withDefaults(defineProps<Props>(), {
    wrap: true,
    margin: 7
})

const emit = defineEmits<(event: 'input', val: boolean) => void>()

const change = (event: Event) => {
    emit('input', (event.target as HTMLInputElement).checked)
}
</script>

<style scoped lang="scss">
.track {
    min-width: 44px;
    width: 44px;
    height: 24px;

    &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        transition: all 0.2s ease;
        border-radius: 50px;
        background: var(--ui-inactive-switch);
        box-shadow: inset 0 0 4px rgba(80 86 109 / 0.5);
        width: 100%;
        height: 100%;
    }
}

.thumb {
    width: 18px;
    height: 18px;
    left: 3px;
    top: 3px;
    box-shadow:
        4px 4px 7px rgba(0 0 0 / 0.07),
        6px 6px 36px rgba(0 0 0 / 0.06);

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
        background: var(--ui-active-switch);
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
    &:hover {
        .thumb {
            &::before {
                transform: scale(1);
            }
        }
    }

    &:active {
        .thumb {
            &::after {
                transform: scale(1);
            }
        }
    }
}

.checkbox {
    &:checked {
        + .label > .track {
            &::before {
                background: var(--ui-active-switch);
                box-shadow: inset 0 0 5px rgb(0 0 0 / 0.3);
            }

            & .thumb {
                left: calc(100% - 21px);
                right: 3px;
                box-shadow:
                    -4px 4px 7px rgb(0 0 0 / 0.07),
                    -6px 6px 36px rgba(0 0 0 / 0.06);
            }
        }
    }
}
</style>
