<template>
    <DemoWrapper class="demo-popover">
        <h2>Popover</h2>

        <div class="demo-popover-settings">
            <div class="demo-popover-settings__trigger">
                <UiTab
                    v-for="tab in Object.values(UiPopoverMode)"
                    :key="tab"
                    :mode="UiTabMode.BORDER"
                    :active="tab === mode"
                    @click="mode = tab"
                >
                    {{ tab }}
                </UiTab>
            </div>

            <div class="demo-popover-settings__trigger">
                <UiTab
                    v-for="tab in Object.values(UiPopoverTrigger)"
                    :key="tab"
                    :mode="UiTabMode.BORDER"
                    :active="tab === trigger"
                    @click="trigger = tab"
                >
                    {{ tab }}
                </UiTab>
            </div>

            <div class="demo-popover-settings__alignment">
                <UiTab
                    v-for="tab in Object.values(UiPopoverAlignment)"
                    :key="tab"
                    :mode="UiTabMode.BORDER"
                    :active="tab === alignment"
                    @click="alignment = tab"
                >
                    {{ tab }}
                </UiTab>
            </div>
        </div>

        <UiPopover
            :alignment="alignment"
            :trigger="trigger"
            :mode="mode"
            class="demo-popover__item"
            :z-index-content="10"
        >
            <template #relative>
                <UiButton
                    uppercase
                    class="auth__button"
                >
                    Open popover
                </UiButton>
            </template>

            <template #content>
                <div class="auth-popover">
                    <UiHeading
                        :level="4"
                        style="margin: 0"
                    >
                        Авторизация
                    </UiHeading>

                    <p>Для новых клиентов при регистрации мы начисляем 100 бонусов</p>

                    <div class="auth-popover__form">
                        <UiTextField
                            placeholder="Введите телефон*"
                            autofocus
                        >
                            <template #prepend-icon>
                                <UiIcon name="phone" />
                            </template>
                        </UiTextField>

                        <UiTextField placeholder="Введите код приглашения*">
                            <template #prepend-icon>
                                <UiIcon name="hand" />
                            </template>
                        </UiTextField>

                        <UiButton
                            :size="UiButtonSize.LARGE"
                            uppercase
                            expanded
                            @click="isModalShown = true"
                        >
                            Войти
                        </UiButton>

                        <UiPopover
                            :alignment="UiPopoverAlignment.BOTTOM"
                            :trigger="UiPopoverTrigger.CLICK"
                            :mode="UiPopoverMode.FIXED"
                        >
                            <template #relative>
                                <UiButton
                                    :size="UiButtonSize.LARGE"
                                    :type="UiButtonType.OUTLINED"
                                    uppercase
                                    expanded
                                >
                                    Open nested popover
                                </UiButton>
                            </template>

                            <template #content> Test </template>
                        </UiPopover>
                    </div>

                    <p>
                        Этот сайт защищен reCAPTCHA, и к нему применяются Политика конфиденциальности и Условия предоставления услуг Google
                    </p>
                </div>
            </template>
        </UiPopover>

        <Teleport to="body">
            <UiModal
                v-if="isModalShown"
                @close-modal="isModalShown = false"
            >
                <span class="us-none"> Click here or outside for close </span>
            </UiModal>
        </Teleport>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import { UiPopoverAlignment, UiPopoverMode, UiPopoverTrigger } from '~/components/types/ui-popover'
import { UiTabMode } from '~/components/types/ui-tab'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiHeading from '~/components/UiHeading.vue'
import UiIcon from '~/components/UiIcon.vue'
import UiModal from '~/components/UiModal.vue'
import UiPopover from '~/components/UiPopover.vue'
import UiTab from '~/components/UiTab.vue'

const alignment = ref(UiPopoverAlignment.BOTTOM)
const trigger = ref(UiPopoverTrigger.CLICK)
const mode = ref(UiPopoverMode.ABSOLUTE)

const isModalShown = ref(false)
</script>

<style lang="scss" scoped>
.demo-popover {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
        margin-top: 40px;
    }
}

.auth {
    &__button {
        margin: 0 auto;
    }
}

.auth-popover {
    max-width: 400px;
    font-size: 13px;

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

.demo-popover-settings {
    &__alignment {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
    }

    &__trigger {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 24px;
    }
}
</style>
