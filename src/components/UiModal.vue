<template>
    <div class="ui-modal">
        <UiOverlay :active="isShow" />

        <div
            class="d-flex flex-column align-items-center position-fixed w-100 h-100 top-0 left-0 right-0 bottom-0 z-index-25 overflow-auto"
            @click.capture="clickOutside"
        >
            <div
                class="ui-modal__wrapper position-relative w-100 d-flex flex-column align-items-center border-box m-auto"
                :style="{ maxWidth: `${maxWidth + 80}px` }"
            >
                <Transition
                    name="ui-modal"
                    @after-leave="leaveModal"
                >
                    <div
                        v-if="isShow"
                        ref="modalCard"
                        tabindex="-1"
                        class="modal-card position-relative mw-100 br-20 border-box position-fixed outline-none"
                        :class="[padding === 0 ? 'd-flex flex-column' : 'w-100']"
                    >
                        <button
                            v-if="closeButton"
                            type="button"
                            aria-label="close-modal"
                            class="close position-absolute cursor-pointer d-flex justify-content-center align-items-center"
                            @click="close"
                        >
                            <IconModalCross class="cross" />
                        </button>

                        <div
                            class="modal-card__wrapper"
                            :style="{ overflow: contentOverflow, maxHeight: `calc(${maxHeight} - ${padding * 2}px)` }"
                        >
                            <div
                                class="modal-card__content"
                                :style="{ padding: `${padding}px` }"
                            >
                                <div
                                    v-if="!!$slots.image"
                                    class="modal-card__image d-flex"
                                >
                                    <slot
                                        name="image"
                                        :close="close"
                                    />
                                </div>

                                <div :style="{ padding: `0 ${paddingContent}px` }">
                                    <div
                                        v-if="!!$slots.header"
                                        class="modal-card__header"
                                    >
                                        <slot name="header" />
                                    </div>

                                    <slot :close="close" />

                                    <div
                                        v-if="!!$slots.buttons"
                                        class="modal-card__buttons d-grid"
                                        :style="{ gridTemplateColumns: `repeat(${buttonColumns}, 1fr)`, gap: `${buttonGap}px` }"
                                    >
                                        <slot
                                            name="buttons"
                                            :close="close"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import UiOverlay from '~/components/UiOverlay.vue'
import IconModalCross from '~/icons/IconModalCross.vue'

interface Props {
    maxWidth?: number
    maxHeight?: string
    padding?: number
    paddingContent?: number
    closeButton?: boolean
    closeByClickOutside?: boolean
    closeByEsc?: boolean
    buttonColumns?: number
    buttonGap?: number
    contentOverflow?: CSSProperties['overflow']
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: 1080,
    maxHeight: '100vh',
    padding: 40,
    paddingContent: 0,
    closeButton: true,
    closeByClickOutside: true,
    closeByEsc: true,
    buttonColumns: 1,
    buttonGap: 20,
    contentOverflow: 'scroll'
})

const emit = defineEmits<(event: 'close-modal') => void>()
const isShow = ref(false)
const modalCard = ref<HTMLElement | null>(null)
const isMounted = useMounted()

const close = (_ev?: Event, callback?: () => void) => {
    if (isMounted.value) {
        document.body.classList.remove('overflow-hidden')
    }
    isShow.value = false
    callback?.()
}

const leaveModal = () => {
    emit('close-modal')
}

const keyCodesToCloseModal = ['Escape']

const playShakingAnimation = async () => {
    modalCard.value?.classList.add('animate-scale')
    await promiseTimeout(170)
    modalCard.value?.classList.remove('animate-scale')
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!keyCodesToCloseModal.includes(event.key)) {
        return
    }

    if (modalCard.value?.closest('.ui-modal')?.parentElement?.nextElementSibling?.classList.contains('ui-overlay')) {
        return
    }

    if (!props.closeByEsc) {
        playShakingAnimation().catch(console.log)
        return
    }

    close()
}

onMounted(async () => {
    isShow.value = true
    useEventListener(window, 'keydown', handleKeydown)
    await nextTick()
    document.body.classList.add('overflow-hidden')
    useFocus(modalCard, { initialValue: true })
})

const clickOutside = async (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.closest('.modal-card')) {
        return
    }

    if (props.closeByClickOutside) {
        close()
        return
    }

    await playShakingAnimation()
}
</script>

<style lang="scss" scoped>
.ui-modal {
    &__wrapper {
        padding: 40px;
    }
}

.modal-card {
    background: var(--ui-modal-bg, var(--ui-light));

    &__image,
    &__header {
        margin: 0 0 30px;
    }

    &__buttons {
        margin: 30px 0 0;
    }
}

.close {
    width: 48px;
    height: 48px;
    right: -33px;
    top: -31px;
}

svg {
    width: 15px;
    height: 15px;
    fill: var(--ui-icon-color, var(--ui-light));
}

::-webkit-scrollbar {
    display: none;
}

.animate-scale {
    animation: min-scale 0.15s;
    animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes min-scale {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.04);
    }

    100% {
        transform: scale(1);
    }
}

@media (width <= 768px) {
    .ui-modal {
        &__wrapper {
            padding: 0;
        }
    }

    .close {
        left: 50%;
        margin-left: -24px;
        opacity: 0.5;
        top: -40px;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            width: 20px;
            height: 4px;
            background: var(--ui-light);
            border-radius: 0 4px 4px 0;
        }

        &::before {
            top: 20px;
            left: 23px;
            transform: rotate(-20deg);
        }

        &::after {
            transform: rotate(200deg);
            left: 5px;
            top: 20px;
        }

        & svg {
            display: none;
        }
    }

    .modal-card {
        bottom: 0;
        position: fixed;
        border-radius: 40px 40px 0 0;

        &__wrapper {
            border-radius: 40px 40px 0 0;
        }

        &__content {
            padding: 20px !important;
        }
    }
}
</style>
