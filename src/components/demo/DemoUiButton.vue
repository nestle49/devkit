<template>
    <DemoWrapper>
        <div class="demo-buttons">
            <div class="demo-buttons-settings">
                <div class="demo-buttons-settings__block d-flex">
                    <UiRadio
                        id="buttonType1"
                        name="buttonType"
                        value="button"
                        :mode="UiRadioMode.BUTTON"
                        :checked="buttonType === 'button'"
                        @input="buttonType = $event as typeof buttonType"
                    >
                        Button
                    </UiRadio>

                    <UiRadio
                        id="buttonType2"
                        name="buttonType"
                        value="link"
                        :mode="UiRadioMode.BUTTON"
                        :checked="buttonType === 'link'"
                        @input="buttonType = $event as typeof buttonType"
                    >
                        Link
                    </UiRadio>
                </div>

                <UiCheckbox
                    id="preloaderEnabled"
                    :value="isPreventLoading"
                    @input="isPreventLoading = $event"
                >
                    Enable loader by click
                </UiCheckbox>

                <br v-if="buttonType === 'link'" />
                <br v-if="buttonType === 'link'" />

                <div
                    v-if="buttonType === 'link'"
                    class="demo-buttons-settings__block d-flex"
                >
                    <UiRadio
                        id="linkType1"
                        name="linkType"
                        value="default"
                        :mode="UiRadioMode.BUTTON"
                        :checked="linkType === 'default'"
                        @input="linkType = $event as typeof linkType"
                    >
                        &lt;a&gt; tag
                    </UiRadio>

                    <UiRadio
                        id="linkType2"
                        name="linkType"
                        value="RouterLink"
                        :mode="UiRadioMode.BUTTON"
                        :checked="linkType === 'RouterLink'"
                        @input="linkType = $event as typeof linkType"
                    >
                        RouterLink
                    </UiRadio>
                </div>

                <UiButton
                    v-if="buttonType === 'link'"
                    class="demo-buttons-settings__block d-flex"
                    :to="{ path: '/' }"
                >
                    На главную
                </UiButton>
            </div>

            <div
                v-for="(row, rowIndex) in buttons"
                :key="rowIndex"
                class="demo-buttons__row"
            >
                <div
                    v-for="(item, itemIndex) in row"
                    :key="itemIndex"
                    class="demo-buttons__col"
                >
                    <div>
                        <div>Color mode: {{ item.colorMode }}</div>
                        <div style="margin-top: 16px">Type: {{ item.type }}</div>
                    </div>

                    <div
                        v-for="(size, sizeIndex) in UiButtonSize"
                        :key="sizeIndex"
                        class="demo-buttons__item"
                    >
                        <UiButton
                            :type="item.type"
                            :size="size"
                            :color-mode="item.colorMode"
                            uppercase
                            :loading="isLoading"
                            :icon-styles-prevented="item.isIconStylesPrevented"
                            v-bind="dynamicDirectives.attributes"
                            v-on="dynamicDirectives.eventHandlers"
                        >
                            <template
                                v-if="item.appendIcon"
                                #append-icon
                            >
                                <UiIcon :name="item.appendIcon || ''" />
                            </template>

                            Button

                            <template
                                v-if="item.prependIcon"
                                #prepend-icon
                            >
                                <UiIcon :name="item.prependIcon || ''" />
                            </template>
                        </UiButton>

                        <UiButton
                            :type="item.type"
                            :size="size"
                            :color-mode="item.colorMode"
                            disabled
                            uppercase
                            :icon-styles-prevented="item.isIconStylesPrevented"
                            v-bind="dynamicDirectives.attributes"
                            v-on="dynamicDirectives.eventHandlers"
                        >
                            <template
                                v-if="item.appendIcon"
                                #append-icon
                            >
                                <UiIcon :name="item.appendIcon || ''" />
                            </template>

                            Button

                            <template
                                v-if="item.prependIcon"
                                #prepend-icon
                            >
                                <UiIcon :name="item.prependIcon || ''" />
                            </template>
                        </UiButton>

                        <div
                            v-if="!item.isIconOnlyDisabled"
                            class="demo-buttons__icons-only"
                        >
                            <UiButton
                                :type="item.type"
                                :size="size"
                                :color-mode="item.colorMode"
                                uppercase
                                square
                                :loading="isLoading"
                                :icon-styles-prevented="item.isIconStylesPrevented"
                                v-bind="dynamicDirectives.attributes"
                                v-on="dynamicDirectives.eventHandlers"
                            >
                                <UiIcon name="gift" />
                            </UiButton>

                            <UiButton
                                :type="item.type"
                                :size="size"
                                :color-mode="item.colorMode"
                                uppercase
                                square
                                disabled
                                :icon-styles-prevented="item.isIconStylesPrevented"
                                v-bind="dynamicDirectives.attributes"
                                v-on="dynamicDirectives.eventHandlers"
                            >
                                <UiIcon name="gift" />
                            </UiButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/shared'
import type { RouteLocationRaw } from 'vue-router'

import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiButtonColorMode, UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { UiRadioMode } from '~/components/types/ui-radio'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiIcon from '~/components/UiIcon.vue'
import UiRadio from '~/components/UiRadio.vue'

interface DemoButton {
    type: UiButtonType
    colorMode: UiButtonColorMode | string
    appendIcon?: string
    prependIcon?: string
    isIconOnlyDisabled?: boolean
    isIconStylesPrevented?: boolean
}

const buttonType = ref<'button' | 'link'>('button')
const linkType = ref<'default' | 'RouterLink'>('default')
const isPreventLoading = ref(false)

const buttons: DemoButton[][] = [
    [
        {
            type: UiButtonType.DEFAULT,
            colorMode: UiButtonColorMode.PRIMARY,
            appendIcon: 'hand'
        },
        {
            type: UiButtonType.OUTLINED,
            colorMode: UiButtonColorMode.PRIMARY,
            appendIcon: 'hand'
        }
    ],
    [
        {
            type: UiButtonType.DEFAULT,
            colorMode: UiButtonColorMode.SECONDARY,
            appendIcon: 'hand'
        },
        {
            type: UiButtonType.OUTLINED,
            colorMode: UiButtonColorMode.SECONDARY,
            prependIcon: 'hand'
        }
    ],
    [
        {
            type: UiButtonType.DEFAULT,
            colorMode: UiButtonColorMode.NEUTRAL,
            appendIcon: 'hand'
        }
    ],
    [
        {
            type: UiButtonType.DEFAULT,
            colorMode: '#24bf8e',
            appendIcon: 'hand'
        },
        {
            type: UiButtonType.OUTLINED,
            colorMode: '#24bf8e',
            prependIcon: 'hand'
        }
    ],
    [
        {
            type: UiButtonType.TEXT,
            colorMode: UiButtonColorMode.PRIMARY,
            isIconOnlyDisabled: true,
            appendIcon: 'next'
        },
        {
            type: UiButtonType.TEXT,
            colorMode: UiButtonColorMode.SECONDARY,
            isIconOnlyDisabled: true,
            appendIcon: 'next',
            isIconStylesPrevented: true
        },
        {
            type: UiButtonType.TEXT,
            colorMode: '#24bf8e',
            isIconOnlyDisabled: true,
            appendIcon: 'next'
        }
    ]
]

const isLoading = ref(false)

const dynamicDirectives = computed(() => {
    interface IDirectives {
        attributes: {
            to?: RouteLocationRaw
        }
        eventHandlers: {
            click?: () => void
        }
    }

    const directives: IDirectives = {
        attributes: {},
        eventHandlers: {}
    }

    if (buttonType.value === 'button') {
        directives.eventHandlers.click = () => {
            if (isPreventLoading.value) {
                isLoading.value = true

                useTimeoutFn(() => {
                    isLoading.value = false
                }, 2000)
            }
        }

        return directives
    }

    /** Настройки для ссылок */
    directives.attributes.to = linkType.value === 'RouterLink' ? { path: '/test-path' } : 'https://google.com'

    return directives
})
</script>

<style lang="scss">
.demo-buttons {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    gap: 3rem;

    &__row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        font-size: 12px;
    }

    &__col {
        display: flex;
        flex-direction: row-reverse;
        gap: 2rem;
        text-transform: capitalize;
        justify-content: flex-end;
    }

    &__item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    &__icons-only {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }
}

.demo-buttons-settings {
    &__block {
        gap: 0.5rem;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
}
</style>
