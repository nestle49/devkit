<template>
    <DemoWrapper>
        <h2>Ui Modal</h2>
        <br />

        <UiButton
            :color-mode="UiButtonColorMode.SECONDARY"
            @click="isDefaultModalVisible = !isDefaultModalVisible"
        >
            Open default modal
        </UiButton>
        <br /><br />

        <UiButton
            :color-mode="UiButtonColorMode.SECONDARY"
            @click="isModalWithDropdownVisible = !isModalWithDropdownVisible"
        >
            Open modal with dropdown
        </UiButton>

        <Teleport
            v-if="isMounted"
            to="body"
        >
            <UiModal
                v-if="isModalWithDropdownVisible"
                :close-by-click-outside="false"
                :close-by-esc="false"
                :max-width="500"
                content-overflow="visible"
                @close-modal="isModalWithDropdownVisible = false"
            >
                <template #default>
                    <UiDropdown
                        :select-label="e => e.name"
                        placeholder="Fruit"
                        :items="fruits"
                        :max-height="300"
                        :active-indexes="singleFruitSelectedList"
                        @input="singleFruitSelectedList = $event"
                    />
                </template>
            </UiModal>
        </Teleport>

        <Teleport
            v-if="isMounted"
            to="body"
        >
            <UiModal
                v-if="isDefaultModalVisible"
                :close-by-esc="false"
                @close-modal="isDefaultModalVisible = false"
            >
                <p>
                    {{ content }}
                </p>
            </UiModal>
        </Teleport>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiButtonColorMode } from '~/components/types/ui-button'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiDropdown from '~/components/UiFields/UiDropdown.vue'
import UiModal from '~/components/UiModal.vue'
import fruits from '~/mock/fruits'
import { generateLorem } from '~/mock/lorem'

const content = generateLorem(1000)
const isModalWithDropdownVisible = ref(false)
const isDefaultModalVisible = ref(false)
const isMounted = useMounted()

const singleFruitSelectedList = ref<number>()
</script>
