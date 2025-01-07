<template>
    <DemoWrapper class="demo-alert">
        <h2>UiAlert</h2>

        <div class="demo-alert__tabs">
            <UiTab
                v-for="tab in UiAlertMode"
                :key="tab"
                :mode="UiTabMode.BORDER"
                :active="alertColorMode === tab"
                @click="alertColorMode = tab"
            >
                {{ tab }}
            </UiTab>
        </div>

        <UiAlert
            :mode="alertColorMode"
            class="demo-alert__item"
            closable
        >
            <template #title> Vue JS framework </template>

            Vue.js — is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page
            applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.

            <template #footer>
                <UiButton
                    :type="UiButtonType.OUTLINED"
                    :color-mode="buttonColorMode"
                    :size="UiButtonSize.SMALL"
                >
                    Close
                </UiButton>
            </template>
        </UiAlert>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiAlertMode } from '~/components/types/ui-alert'
import { UiButtonColorMode, UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { UiTabMode } from '~/components/types/ui-tab'
import UiAlert from '~/components/UiAlert.vue'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiTab from '~/components/UiTab.vue'

const alertColorMode = ref<UiAlertMode>(UiAlertMode.PRIMARY)
const buttonColorMode = computed(() => {
    switch (alertColorMode.value) {
        case UiAlertMode.SECONDARY:
            return UiButtonColorMode.SECONDARY
        case UiAlertMode.DANGER:
            return UiButtonColorMode.DANGER
        case UiAlertMode.SUCCESS:
            return UiButtonColorMode.SUCCESS
        case UiAlertMode.WARN:
            return UiButtonColorMode.WARN
        default:
            return UiButtonColorMode.PRIMARY
    }
})
</script>

<style lang="scss" scoped>
.demo-alert {
    &__tabs {
        display: flex;
        gap: 8px;
    }

    &__item {
        margin-top: 32px;
    }
}
</style>
