<template>
    <div
        ref="popover"
        class="popover"
        :class="`popover--${alignment}`"
        :style="{
            '--ui-popover-gap': `${gap}px`,
            '--ui-popover-padding': `${contentPadding}px`,
            '--ui-popover-overflow': contentOverflow,
            '--ui-popover-border-radius': `${contentBorderRadius}px`
        }"
        @mouseleave="handleMouseHover('leave')"
    >
        <div class="popover__wrapper position-relative">
            <div
                ref="popoverRelative"
                class="popover__relative"
                @click="handleClick"
                @mouseenter="handleMouseHover('enter')"
            >
                <slot
                    name="relative"
                    :shown="isPopoverShown"
                />
            </div>

            <Transition>
                <div
                    v-if="isPopoverShown"
                    ref="popoverContent"
                    class="popover__content"
                    :style="{
                        zIndex: zIndexContent,
                        maxWidth: maxWidthContent,
                        ...popoverContentStyles()
                    }"
                >
                    <slot
                        name="content"
                        :close="() => changePopoverStatus(false)"
                    />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { UiPopoverAlignment, UiPopoverMode, UiPopoverTrigger } from '~/components/types/ui-popover'

interface Props {
    modelValue?: boolean
    zIndexContent?: number
    alignment: UiPopoverAlignment
    trigger?: UiPopoverTrigger
    contentPadding?: number
    contentOverflow?: 'auto' | 'hidden' | 'inherit' | 'scroll' | 'visible'
    gap?: number
    maxWidth?: CSSProperties['maxWidth']
    contentBorderRadius?: number
    clickOutsideDisabled?: boolean
    mode?: UiPopoverMode
    disabled?: boolean
}

interface Emits {
    (event: 'update:modelValue', status: boolean): void
    (event: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    zIndexContent: 10,
    trigger: UiPopoverTrigger.CLICK,
    contentPadding: 40,
    gap: 12,
    contentOverflow: 'scroll',
    maxWidth: 'none',
    contentBorderRadius: 20,
    mode: UiPopoverMode.ABSOLUTE
})

const emit = defineEmits<Emits>()

const isMounted = useMounted()

// eslint-disable-next-line vue/no-setup-props-reactivity-loss, vue/no-setup-props-destructure
const isPopoverShown = ref(props.modelValue)

const popover = ref<HTMLElement>()
const popoverRelative = ref<HTMLElement>()
const popoverContent = ref<HTMLElement>()

const getElementSize = (el?: HTMLElement) => ({
    width: el?.clientWidth ?? 0,
    height: el?.clientHeight ?? 0
})

const popoverSize = computed(() => getElementSize(popover.value))
const popoverRelativeSize = computed(() => getElementSize(popoverRelative.value))
const popoverContentSize = computed(() => getElementSize(popoverContent.value))

const isBottom = computed(() =>
    [UiPopoverAlignment.BOTTOM, UiPopoverAlignment.BOTTOM_LEFT, UiPopoverAlignment.BOTTOM_RIGHT].includes(props.alignment)
)
const isLeft = computed(() =>
    [UiPopoverAlignment.LEFT, UiPopoverAlignment.LEFT_BOTTOM, UiPopoverAlignment.LEFT_TOP].includes(props.alignment)
)
const isRight = computed(() =>
    [UiPopoverAlignment.RIGHT, UiPopoverAlignment.RIGHT_BOTTOM, UiPopoverAlignment.RIGHT_TOP].includes(props.alignment)
)
const isTop = computed(() => [UiPopoverAlignment.TOP, UiPopoverAlignment.TOP_LEFT, UiPopoverAlignment.TOP_RIGHT].includes(props.alignment))

const getAbsoluteContentStyles = () => {
    const styles: HTMLAttributes['style'] = {}

    styles.position = 'absolute'

    if (isBottom.value) {
        styles.top = `${popoverRelativeSize.value.height + props.gap}px`
    } else if (isTop.value) {
        styles.bottom = `${popoverRelativeSize.value.height + props.gap}px`
    } else if (isLeft.value) {
        styles.left = `${(popoverContentSize.value.width + props.gap) * -1}px`
    } else if (isRight.value) {
        styles.right = `${(popoverContentSize.value.width + props.gap) * -1}px`
    }

    switch (props.alignment) {
        case UiPopoverAlignment.TOP:
        case UiPopoverAlignment.BOTTOM:
            styles.left = `${Math.abs(popoverContentSize.value.width - popoverRelativeSize.value.width) / -2}px`
            break

        case UiPopoverAlignment.RIGHT:
        case UiPopoverAlignment.LEFT:
            styles.top = `${Math.abs(popoverContentSize.value.height - popoverRelativeSize.value.height) / -2}px`
            break

        case UiPopoverAlignment.RIGHT_TOP:
        case UiPopoverAlignment.LEFT_TOP:
            styles.top = 0
            break

        case UiPopoverAlignment.RIGHT_BOTTOM:
        case UiPopoverAlignment.LEFT_BOTTOM:
            styles.bottom = 0
            break

        case UiPopoverAlignment.TOP_LEFT:
        case UiPopoverAlignment.BOTTOM_LEFT:
            styles.left = 0
            break

        case UiPopoverAlignment.TOP_RIGHT:
        case UiPopoverAlignment.BOTTOM_RIGHT:
            styles.right = 0
            break

        default:
            styles.top = 'auto'
            styles.bottom = 'auto'
            styles.right = 'auto'
            styles.left = 'auto'
    }

    return styles
}

const getFixedContentStyles = () => {
    const styles: HTMLAttributes['style'] = {}

    const popoverRect = popover.value?.getBoundingClientRect()

    if (!popoverRect) {
        return styles
    }

    styles.position = 'fixed'

    const { left: popoverLeft, top: popoverTop } = popoverRect

    switch (props.alignment) {
        // TOP
        case UiPopoverAlignment.TOP_RIGHT:
            styles.left = `${popoverLeft + popoverSize.value.width}px`
            styles.top = `${popoverTop - props.gap}px`
            styles.transform = 'translate(-100%, -100%)'
            break
        case UiPopoverAlignment.TOP_LEFT:
            styles.left = `${popoverLeft}px`
            styles.top = `${popoverTop - props.gap}px`
            styles.transform = 'translateY(-100%)'
            break
        case UiPopoverAlignment.TOP:
            styles.left = `${popoverLeft + popoverSize.value.width / 2}px`
            styles.top = `${popoverTop - props.gap}px`
            styles.transform = 'translate(-50%, -100%)'
            break

        // RIGHT
        case UiPopoverAlignment.RIGHT_TOP:
            styles.left = `${popoverLeft + popoverSize.value.width + props.gap}px`
            styles.top = `${popoverTop}px`
            styles.transform = 'none'
            break
        case UiPopoverAlignment.RIGHT_BOTTOM:
            styles.left = `${popoverLeft + popoverSize.value.width + props.gap}px`
            styles.top = `${popoverTop + popoverSize.value.height}px`
            styles.transform = 'translateY(-100%)'
            break
        case UiPopoverAlignment.RIGHT:
            styles.left = `${popoverLeft + popoverSize.value.width + props.gap}px`
            styles.top = `${popoverTop + popoverRelativeSize.value.height / 2}px`
            styles.transform = 'translateY(-50%)'
            break

        // LEFT
        case UiPopoverAlignment.LEFT_BOTTOM:
            styles.left = `${popoverLeft - props.gap}px`
            styles.top = `${popoverTop + popoverSize.value.height}px`
            styles.transform = 'translate(-100%, -100%)'
            break
        case UiPopoverAlignment.LEFT_TOP:
            styles.left = `${popoverLeft - props.gap}px`
            styles.top = `${popoverTop}px`
            styles.transform = 'translateX(-100%)'
            break
        case UiPopoverAlignment.LEFT:
            styles.left = `${popoverLeft - props.gap}px`
            styles.top = `${popoverTop + popoverRelativeSize.value.height / 2}px`
            styles.transform = 'translate(-100%, -50%)'
            break

        // BOTTOM
        case UiPopoverAlignment.BOTTOM_RIGHT:
            styles.left = `${popoverLeft + popoverSize.value.width}px`
            styles.top = `${popoverTop + popoverSize.value.height + props.gap}px`
            styles.transform = 'translateX(-100%)'
            break
        case UiPopoverAlignment.BOTTOM_LEFT:
            styles.left = `${popoverLeft}px`
            styles.top = `${popoverTop + popoverSize.value.height + props.gap}px`
            styles.transform = 'none'
            break
        case UiPopoverAlignment.BOTTOM:
        default:
            styles.left = `${popoverLeft + popoverSize.value.width / 2}px`
            styles.top = `${popoverTop + popoverSize.value.height + props.gap}px`
            styles.transform = 'translateX(-50%)'
    }

    return styles
}

const popoverContentStyles = () => {
    if (!isMounted.value) {
        return {}
    }

    return props.mode === UiPopoverMode.ABSOLUTE ? getAbsoluteContentStyles() : getFixedContentStyles()
}

const maxWidthContent = computed(() => {
    if (props.maxWidth === 'none') {
        return 'none'
    }

    if (typeof props.maxWidth === 'string' && props.maxWidth.includes('%')) {
        return props.maxWidth
    }

    const width = parseInt(props.maxWidth.toString(), 10)

    return width ? `${width}px` : 'none'
})

const changePopoverStatus = (status: boolean) => {
    emit('update:modelValue', status)
    isPopoverShown.value = status

    if (!status) {
        emit('close')
    }
}

const handleMouseHover = (type: 'enter' | 'leave') => {
    if (props.disabled) {
        return
    }

    if (props.trigger !== UiPopoverTrigger.HOVER) {
        return
    }

    if (type === 'enter') {
        changePopoverStatus(true)
        return
    }

    changePopoverStatus(false)
}

const handleClick = () => {
    if (props.disabled) {
        return
    }

    if (props.trigger !== UiPopoverTrigger.CLICK) {
        return
    }

    changePopoverStatus(!isPopoverShown.value)
}

onClickOutside(popover, event => {
    if (props.clickOutsideDisabled) {
        return
    }

    if (!isPopoverShown.value) {
        return
    }

    const target = event.target as HTMLElement
    const closestModal = target.closest('.ui-modal')

    if (closestModal) {
        return
    }

    changePopoverStatus(false)
})

watch(
    () => props.modelValue,
    newValue => {
        isPopoverShown.value = newValue
    }
)
</script>

<style lang="scss" scoped>
.popover {
    $self: &;
    $popoverGap: var(--ui-popover-gap);

    &__content {
        display: inline-block;
        padding: var(--ui-popover-padding);
        background-color: var(--ui-popover-bg, var(--ui-light));
        border-radius: var(--ui-popover-border-radius);
        box-shadow: var(--ui-popover-shadow, 3px 3px 20px 3px rgb(120 116 133 / 0.2), 5px 5px 20px rgb(255 255 255 / 0.1));
        width: max-content;
        overflow: var(--ui-popover-overflow);
        max-width: var(--ui-popover-max-width);
        box-sizing: border-box;
        max-height: 80vh;

        &::-webkit-scrollbar {
            display: none;
        }

        &::after {
            content: '';
            position: absolute;
        }
    }

    /** TOP */
    &--top,
    &--topLeft,
    &--topRight {
        > #{$self}__wrapper > #{$self}__content {
            &::after {
                width: 100%;
                height: #{$popoverGap};
                bottom: calc(#{$popoverGap} * -1);
                left: 0;
            }
        }
    }

    /** RIGHT */
    &--right,
    &--rightTop,
    &--rightBottom {
        > #{$self}__wrapper > #{$self}__content {
            &::after {
                width: #{$popoverGap};
                height: 100%;
                left: calc(#{$popoverGap} * -1);
                top: 0;
            }
        }
    }

    /** LEFT */
    &--left,
    &--leftTop,
    &--leftBottom {
        > #{$self}__wrapper > #{$self}__content {
            &::after {
                width: #{$popoverGap};
                height: 100%;
                right: calc(#{$popoverGap} * -1);
                top: 0;
            }
        }
    }

    /** BOTTOM */
    &--bottom,
    &--bottomLeft,
    &--bottomRight {
        > #{$self}__wrapper > #{$self}__content {
            &::after {
                width: 100%;
                height: #{$popoverGap};
                top: calc(#{$popoverGap} * -1);
                left: 0;
            }
        }
    }
}
</style>
