export const useUiDragScroll = () => {
    const MOBILE_BREAKPOINT = 767
    const { width } = useWindowSize()
    const windowWidth = refDebounced(width, 500)

    const startedDragScrollPosition = ref(0)
    const element = ref<HTMLTableElement>()
    const container = ref<HTMLTableElement>()

    const scrolledElement = computed(() => container.value?.querySelector<HTMLElement>('.simplebar-content-wrapper'))

    const { x: mouseX, isOutside } = useMouseInElement(element)
    const { pressed: isMousePressed } = useMousePressed({ target: element })
    const { x: scrollX, arrivedState } = useScroll(scrolledElement)

    const updateMouseStart = () => {
        startedDragScrollPosition.value = isMousePressed.value ? mouseX.value : 0
    }

    const dragToScroll = computed(() => {
        if (!isMousePressed.value) {
            return 0
        }

        const result = startedDragScrollPosition.value - mouseX.value

        if ((arrivedState.left && result < 0) || (arrivedState.right && result > 0)) {
            updateMouseStart()
            return 0
        }

        return result
    })

    const updateScrollX = () => {
        if (!isMousePressed.value || isOutside.value || windowWidth.value < MOBILE_BREAKPOINT) {
            return
        }

        scrollX.value += dragToScroll.value
    }

    watch(dragToScroll, updateScrollX)
    watch(isMousePressed, updateMouseStart)

    return {
        element,
        container,
        windowWidth
    }
}
