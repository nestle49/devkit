<template>
    <DemoWrapper>
        <h2>Ui Text Area</h2>

        <div class="d-flex gap-20">
            <div class="d-flex flex-column gap-20">
                <UiCheckbox
                    v-for="(field, key) in textAreaVars"
                    :id="`ui-textarea-${key}`"
                    :key="key"
                    :value="field"
                    :disabled="isDisabledCheckbox(key)"
                    @input="textAreaVars[key] = $event"
                >
                    {{ key }}
                </UiCheckbox>
            </div>

            <div class="d-flex flex-column gap-20 w-100">
                <UiTextArea
                    v-for="item of 3"
                    :key="item"
                    v-bind="attrs"
                    :value="textAreaValue"
                    @input="textAreaValue = $event"
                >
                    <template
                        v-if="textAreaVars.isWithIcon"
                        #default
                    >
                        <UiIcon name="avatar2" />
                    </template>
                </UiTextArea>
            </div>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiTextArea from '~/components/UiFields/UiTextArea.vue'
import UiIcon from '~/components/UiIcon.vue'
import { generateLorem } from '~/mock/lorem'

const textAreaValue = ref('')
const labelSmall = generateLorem(2)
const labelLong = generateLorem(15)

const textAreaVars = reactive({
    isError: false,
    isWithIcon: false,
    isTransparent: false,
    isWithLabel: false,
    isSmallLabel: true,
    isRequired: false,
    isDisabled: false
})

const isDisabledCheckbox = (key: string) => key === 'isSmallLabel' && !textAreaVars.isWithLabel

const attrs = computed(() => ({
    placeholder: 'Text',
    error: textAreaVars.isError,
    disabled: textAreaVars.isDisabled,
    required: textAreaVars.isRequired,
    label: (() => {
        if (textAreaVars.isWithLabel) {
            if (textAreaVars.isSmallLabel) {
                return labelSmall
            } else {
                return labelLong
            }
        } else {
            return ''
        }
    })(),
    transparent: textAreaVars.isTransparent
}))
</script>
