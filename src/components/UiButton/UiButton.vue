<template>
    <Component
        :is="componentTag"
        v-bind="componentAttrs"
        class="button position-relative d-inline-flex align-items-center overflow-hidden outline-none cursor-pointer us-none"
        :class="componentClasses"
        :style="componentStyles"
        @click="onClickHandler"
    >
        <template v-if="$slots['prepend-icon']">
            <UiLoader
                v-if="props.loading && props.type === UiButtonType.TEXT"
                class="button__loader"
                size="12px"
                width="1px"
            />

            <div
                v-else-if="$slots['prepend-icon']"
                class="button__icon button__icon--prepend"
            >
                <slot name="prepend-icon" />
            </div>
        </template>

        <div
            v-if="$slots.default"
            class="button__content pe-none"
        >
            <slot />
        </div>

        <template v-if="$slots['append-icon']">
            <UiLoader
                v-if="props.loading && props.type === UiButtonType.TEXT"
                class="button__loader"
                size="12px"
                width="1px"
            />

            <div
                v-else-if="$slots['append-icon']"
                class="button__icon button__icon--append"
            >
                <slot name="append-icon" />
            </div>
        </template>

        <UiLoader
            v-if="props.loading && props.type !== UiButtonType.TEXT"
            class="button__loader button__loader--centered"
            :size="loaderSettings.size"
            :width="loaderSettings.width"
        />
    </Component>
</template>

<script lang="ts" setup>
import type { ColorFormats } from 'tinycolor2'
import tinycolor from 'tinycolor2'

import type { UiBaseButtonProps } from '~/components/types/ui-button'
import { UiButtonColorMode, UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { useButton } from '~/components/UiButton/useButton'
import UiLoader from '~/components/UiLoader.vue'

interface Props extends UiBaseButtonProps {
    type?: UiButtonType
    size?: UiButtonSize
    colorMode?: UiButtonColorMode | string
    active?: boolean
    loading?: boolean
    iconStylesPrevented?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: UiButtonType.DEFAULT,
    nativeType: 'button',
    colorMode: UiButtonColorMode.PRIMARY,
    size: UiButtonSize.MEDIUM
})

const { componentTag, componentAttrs } = useButton(props)

const isCustomColorMode = computed(() => !Object.values(UiButtonColorMode).includes(props.colorMode as UiButtonColorMode))
const isMounted = useMounted()

const loaderSettings = computed(() => {
    switch (props.size) {
        case UiButtonSize.LARGE:
            return { size: '26px', width: '4px' }
        case UiButtonSize.MEDIUM:
            return { size: '20px', width: '3px' }
        case UiButtonSize.SMALL:
            return { size: '16px', width: '2px' }
        default:
            return { size: '16px', width: '2px' }
    }
})

const componentClasses = computed(() => {
    const classes: string[] = []

    classes.push(`button--${props.type}`)
    classes.push(`button--${props.size}`)

    classes.push(`button--${isCustomColorMode.value ? 'custom' : props.colorMode}`)

    if (props.disabled) {
        classes.push('button--disabled')
    }

    if (props.uppercase) {
        classes.push('button--uppercase')
    }

    if (props.active) {
        classes.push('button--active')
    }

    if (props.square) {
        classes.push('button--square')
    }

    if (props.expanded) {
        classes.push('button--expanded')
    }

    if (props.loading) {
        classes.push('button--loading')
    }

    if (props.iconStylesPrevented) {
        classes.push('button--icon-styles-prevented')
    }

    return classes
})

const componentStyles = computed(() => {
    const toRgbString = (rgb: ColorFormats.RGBA) => `${rgb.r} ${rgb.g} ${rgb.b}`

    const styles: HTMLAttributes['style'] = {}

    if (isCustomColorMode.value) {
        const color = tinycolor(props.colorMode)
        const colorRgb = color.toRgb()
        const stronger = color.darken()
        const strongerString = stronger.toString()
        const strongerRgb = toRgbString(stronger.toRgb())

        styles['--ui-custom-color'] = props.colorMode
        styles['--ui-custom-color-rgb'] = toRgbString(colorRgb)
        styles['--ui-custom-color-stronger'] = strongerString
        styles['--ui-custom-color-stronger-rgb'] = strongerRgb
    }

    return styles
})

const onClickHandler = (event: MouseEvent) => {
    if (props.type === UiButtonType.TEXT || !isMounted.value) {
        return
    }

    const button = event.currentTarget as HTMLButtonElement
    const rect = button.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const w = button.offsetWidth

    const ripple = document.createElement('span')

    ripple.className = 'button__ripple'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.zIndex = '1'
    ripple.style.setProperty('--ui-button-ripple-scale', String(w))

    button.appendChild(ripple)

    useTimeoutFn(() => {
        ripple.parentNode?.removeChild(ripple)
    }, 400)
}
</script>

<style lang="scss" scoped>
.button {
    $self: &;
    $transitionDuration: 0.3s;
    $gap: 8px;

    --ui-button-border-color: transparent;
    --ui-button-border-color-hover: transparent;

    font-weight: 500;
    transition: all #{$transitionDuration} ease-in-out;
    letter-spacing: 0.05em;
    text-decoration: none;
    box-sizing: border-box;
    display: inline-flex;
    gap: $gap;
    height: var(--ui-button-height);
    padding-left: var(--ui-button-padding-horizontal);
    padding-right: var(--ui-button-padding-horizontal);
    border-radius: var(--ui-button-border-radius);
    background: var(--ui-button-background) center;
    border: 1px solid var(--ui-button-border-color);
    color: var(--ui-button-text-color);
    font-size: var(--ui-button-font-size);
    box-shadow: var(--ui-button-shadow);
    fill: var(--ui-button-text-color);

    @mixin on-hover {
        background: var(--ui-button-background-hover);
        color: var(--ui-button-text-color-hover);
        box-shadow: none;
        border-color: var(--ui-button-border-color-hover);

        svg,
        :slotted(svg) {
            fill: var(--ui-button-text-color-hover);
        }

        &#{$self}--text {
            #{$self}__content {
                border-color: var(--ui-button-text-color-hover);
            }
        }
    }

    &__content {
        width: 100%;
        transition: border-color #{$transitionDuration} ease-in-out;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    svg,
    :slotted(svg) {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        transition: all #{$transitionDuration} ease-in-out;
    }

    &__content,
    svg,
    :slotted(svg) {
        z-index: 2;
    }

    &__loader {
        &--centered {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    &__icon {
        display: inline-flex;
        transition: transform #{$transitionDuration} ease-in-out;
    }

    &:not(#{$self}--disabled) {
        &:hover {
            @include on-hover;
        }

        &:active {
            box-shadow: inset 3px 3px 10px rgba(var(--ui-button-pressed-shadow) / var(--ui-button-pressed-shadow-opacity, 1));

            &#{$self}--text {
                transition: all 0.1s ease-in-out;

                $translateDistance: calc(#{$gap} / 2);

                #{$self}__icon {
                    &--append {
                        transform: translateX(calc(#{$translateDistance} * -1));
                    }

                    &--prepend {
                        transform: translateX(#{$translateDistance});
                    }
                }
            }
        }
    }

    &--disabled {
        pointer-events: none;
        box-shadow: none;

        &#{$self}--default {
            opacity: 0.5;
        }

        &#{$self}--outlined {
            color: var(--ui-gray-4);
            border-color: var(--ui-gray-4);
            fill: var(--ui-gray-4);
        }

        &#{$self}--neutral {
            box-shadow: var(--ui-button-shadow);
            color: var(--ui-gray-4);
            fill: var(--ui-gray-4);
            border: none;
        }

        &#{$self}--text {
            color: var(--ui-gray-4);
            fill: var(--ui-gray-4);
        }
    }

    &--uppercase {
        text-transform: uppercase;
    }

    &--expanded {
        width: 100%;
    }

    &--loading {
        pointer-events: none;

        @include on-hover;

        &:not(#{$self}--text) {
            svg,
            :slotted(svg),
            #{$self}__content {
                transition: all 0s;
                opacity: 0;
            }
        }
    }

    &--active {
        @include on-hover;
    }

    /** Color mode modifiers */

    @mixin color-mode-variables($colorMode, $defaultType) {
        --ui-button-main-color: var(--ui-#{$colorMode}-button-main, var(--ui-#{$defaultType}));
        --ui-button-main-color-rgb: var(--ui-#{$colorMode}-button-main-rgb, var(--ui-#{$defaultType}-rgb));
        --ui-button-main-color-stronger: var(--ui-#{$colorMode}-button-main-stronger, var(--ui-#{$defaultType}-stronger));
        --ui-button-main-color-stronger-rgb: var(--ui-#{$colorMode}-button-main-stronger-rgb, var(--ui-#{$defaultType}-stronger-rgb));
        --ui-button-text-color: var(--ui-#{$colorMode}-button-text, var(--ui-light));
        --ui-button-text-color-hover: var(--ui-#{$colorMode}-button-text-hover, var(--ui-light));
        --ui-button-inset-shadow: var(--ui-#{$colorMode}-button-inset-shadow-rgb, var(--ui-light-rgb));
        --ui-button-pressed-shadow: var(--ui-button-main-color-stronger-rgb);
        --ui-button-pressed-shadow-opacity: var(--ui-#{$colorMode}-button-pressed-shadow-opacity, 1);
        --ui-button-ripple-color-rgb: var(--ui-button-main-color-stronger-rgb);
    }

    @mixin default-and-outlined-buttons {
        &#{$self}--default {
            --ui-button-background: var(--ui-button-main-color);
            --ui-button-background-hover: var(--ui-button-main-color);
            --ui-button-shadow:
                5px 5px 20px rgb(var(--ui-button-main-color-stronger-rgb) / 0.2),
                inset 3px 3px 10px rgb(var(--ui-button-inset-shadow) / 0.3);
        }

        &#{$self}--outlined {
            --ui-button-text-color: var(--ui-button-main-color);
            --ui-button-border-color: var(--ui-button-main-color);
            --ui-button-background-hover: var(--ui-button-main-color);
        }

        &#{$self}--text {
            --ui-button-text-color: var(--ui-button-main-color);
            --ui-button-text-color-hover: var(--ui-button-main-color);
            --ui-loader-color: var(--ui-button-main-color-rgb);
        }
    }

    &--primary {
        @include color-mode-variables('primary', 'accent');
        @include default-and-outlined-buttons;
    }

    &--secondary {
        @include color-mode-variables('secondary', 'secondary');
        @include default-and-outlined-buttons;
    }

    &--success {
        @include color-mode-variables('success', 'success');
        @include default-and-outlined-buttons;
    }

    &--danger {
        @include color-mode-variables('danger', 'danger');
        @include default-and-outlined-buttons;
    }

    &--warn {
        @include color-mode-variables('warn', 'warn');
        @include default-and-outlined-buttons;
    }

    &--neutral {
        @include color-mode-variables('neutral', 'secondary');

        --ui-button-border-color-hover: var(--ui-neutral-button-border-color-hover, var(--ui-button-main-color));
        --ui-button-shadow: 0px 8px 15px rgba(var(--ui-button-ripple-color-rgb) / 0.1);
        --ui-loader-color: var(--ui-neutral-button-loader-color, var(--ui-button-main-color-rgb));
        --ui-button-background: var(--ui-neutral-button-background, var(--ui-light));
        --ui-button-background-hover: var(--ui-neutral-button-background-hover, var(--ui-light));
        --ui-button-text-color: var(--ui-neutral-button-text, var(--ui-secondary));
        --ui-button-text-color-hover: var(--ui-neutral-button-text-hover, var(--ui-secondary));
        --ui-button-pressed-shadow-opacity: var(--ui-neutral-button-pressed-shadow-opacity, 0.2);
    }

    &--custom {
        --ui-button-pressed-shadow: var(--ui-custom-color-stronger-rgb);
        --ui-button-ripple-color-rgb: var(--ui-custom-color-stronger-rgb);

        &#{$self}--default {
            --ui-button-background: var(--ui-custom-color);
            --ui-button-background-hover: var(--ui-custom-color);
            --ui-button-text-color: var(--ui-light);
            --ui-button-text-color-hover: var(--ui-light);
            --ui-button-shadow:
                5px 5px 15px rgb(var(--ui-custom-color-stronger-rgb) / 0.3), inset 3px 3px 10px rgb(var(--ui-light-rgb) / 0.3);
        }

        &#{$self}--outlined {
            --ui-button-background-hover: var(--ui-custom-color);
            --ui-button-text-color: var(--ui-custom-color);
            --ui-button-text-color-hover: var(--ui-light);
            --ui-button-border-color: var(--ui-custom-color);
        }

        &#{$self}--text {
            --ui-button-text-color: var(--ui-custom-color);
            --ui-button-text-color-hover: var(--ui-custom-color);
            --ui-loader-color: var(--ui-custom-color-rgb);
        }
    }

    /** Size modifiers */

    @mixin size-modifier-variables($height, $paddingX, $fontSize) {
        --ui-button-height: #{$height};
        --ui-button-padding-horizontal: #{$paddingX};
        --ui-button-font-size: #{$fontSize};

        &#{$self}--square {
            width: #{$height};
            height: #{$height};
        }
    }

    &--large {
        @include size-modifier-variables('60px', '40px', '14px');

        --ui-button-border-radius: var(--ui-button-large-border-radius, 15px);
    }

    &--medium {
        @include size-modifier-variables('50px', '20px', '13px');

        --ui-button-border-radius: var(--ui-button-medium-border-radius, 13px);
    }

    &--small {
        @include size-modifier-variables('42px', '20px', '12px');

        --ui-button-border-radius: var(--ui-button-small-border-radius, 10px);
    }

    /** Type modifiers */

    &--text {
        --ui-button-padding-horizontal: 0;
        --ui-button-border-radius: 0;
        --ui-button-background: transparent;
        --ui-button-background-hover: transparent;
        --ui-button-pressed-shadow: transparent;

        min-height: 32px;
        height: auto;

        #{$self}__content {
            border-bottom: 1px solid transparent;
        }

        &:not(#{$self}--icon-styles-prevented) {
            svg,
            :slotted(svg) {
                background: var(--ui-button-text-color-hover);
                fill: var(--ui-light);
                border-radius: 100%;
                box-sizing: border-box;
                padding: 3px;
            }

            &:hover {
                svg,
                :slotted(svg) {
                    fill: var(--ui-light) !important;
                }
            }

            &#{$self}--disabled {
                svg,
                :slotted(svg) {
                    background: var(--ui-gray-4);
                }
            }
        }
    }

    &--square {
        --ui-button-padding-horizontal: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        #{$self}__content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

<style lang="scss">
.button {
    &__ripple {
        width: 2px;
        height: 2px;
        position: absolute;
        border-radius: 50%;
        background: rgb(var(--ui-button-ripple-color-rgb) / 0.5);
        animation: ripple-effect 0.4s ease-in-out;
        z-index: 5;
    }
}

@keyframes ripple-effect {
    0% {
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(var(--ui-button-ripple-scale));
    }
}
</style>
