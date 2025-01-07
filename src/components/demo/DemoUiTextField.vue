<template>
    <DemoWrapper>
        <h2>Ui Text Field</h2>

        <div class="d-flex gap-5 mb-30">
            <UiDropdown
                :select-label="e => e.name"
                :select-value="e => e.name"
                placeholder="Выбрать маску"
                class="flex-1"
                :items="masks"
                :active-indexes="selectedMaskIndex"
                @input="selectedMaskIndex = $event"
            />

            <UiTextField
                placeholder="Поле с маской"
                :value="maskedValue"
                :mask="selectedMask"
                class="flex-1"
                @input="maskedValue = $event"
            />
        </div>

        <div class="mb-30 d-flex gap-20 align-items-center">
            <UiCheckbox
                v-for="(field, key) in textFieldVars"
                :id="`ui-text-field-${key}`"
                :key="key"
                :value="field"
                :disabled="isDisabledCheckbox(key)"
                @input="textFieldVars[key] = $event"
            >
                {{ key }}
            </UiCheckbox>
        </div>

        <div class="d-flex flex-wrap justify-content-between">
            <div
                v-for="(value, key) in fields"
                :key="key"
                class="d-flex flex-column mb-20"
            >
                <div class="mb-20 text-center">
                    {{ key }}
                </div>

                <UiTextField
                    v-bind="attrs"
                    :size="key"
                    :value="value.value"
                    @input="fields[key].value = $event"
                >
                    <template
                        v-if="textFieldVars.isWithIcon"
                        #prepend-icon
                    >
                        <UiIcon name="avatar2" />
                    </template>
                </UiTextField>
            </div>

            <div>
                <div class="mb-20 text-center">
                    {{ UiTextFieldMode.SEARCH }}
                </div>

                <UiTextField
                    v-bind="attrs"
                    :mode="UiTextFieldMode.SEARCH"
                    :size="UiTextFieldSize.SMALL"
                    :value="textSearch"
                    @input="textSearch = $event"
                />
            </div>
        </div>

        <UiTextField
            v-bind="attrs"
            :value="textBigField"
            @input="textBigField = $event"
        >
            <template
                v-if="textFieldVars.isWithIcon"
                #prepend-icon
            >
                <UiIcon name="avatar2" />
            </template>
        </UiTextField>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiTextFieldMode, UiTextFieldSize } from '~/components/types/ui-input'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiDropdown from '~/components/UiFields/UiDropdown.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiIcon from '~/components/UiIcon.vue'
import { generateLorem } from '~/mock/lorem'

const textSearch = ref('')
const textBigField = ref('')
const textFieldVars = reactive({
    isError: false,
    isWithIcon: false,
    isTransparent: false,
    isWithLabel: false,
    isSmallLabel: true,
    isRequired: false,
    isDisabled: false
})

const masks = [
    { name: 'Номер телефона', mask: '+7 (999) 999-99-99' },
    { name: 'Код приглашения', mask: 'A{4}-9{4}' }
]

const labelSmall = generateLorem(2)
const labelLong = generateLorem(15)
const maskedValue = ref('')
const selectedMaskIndex = ref(1)
const selectedMask = computed(() => masks[selectedMaskIndex.value]?.mask)

const isDisabledCheckbox = (key: string) => key === 'isSmallLabel' && !textFieldVars.isWithLabel

watch(selectedMaskIndex, () => {
    maskedValue.value = ''
})

const fields = {
    [UiTextFieldSize.LARGE]: ref(''),
    [UiTextFieldSize.MEDIUM]: ref(''),
    [UiTextFieldSize.SMALL]: ref('')
}

const attrs = computed(() => ({
    placeholder: 'Text',
    error: textFieldVars.isError,
    disabled: textFieldVars.isDisabled,
    required: textFieldVars.isRequired,
    label: (() => {
        if (textFieldVars.isWithLabel) {
            if (textFieldVars.isSmallLabel) {
                return labelSmall
            } else {
                return labelLong
            }
        } else {
            return ''
        }
    })(),
    transparent: textFieldVars.isTransparent
}))
</script>
