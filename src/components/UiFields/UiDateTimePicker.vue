<template>
    <div class="datetime-picker br-13">
        <Component
            :is="independent ? 'div' : UiPopover"
            v-model="isDropdownShown"
            :alignment="UiPopoverAlignment.BOTTOM_LEFT"
            :content-padding="0"
            :disabled="disabled"
            content-overflow="inherit"
        >
            <template #relative="{ shown }">
                <slot
                    name="trigger"
                    :formatted-value="formattedValue"
                >
                    <UiTextField
                        :label="label"
                        :value="formattedValue"
                        :mode="UiTextFieldMode.DROPDOWN"
                        :placeholder="placeholder"
                        :required="required"
                        :disabled="disabled"
                        :class="{ 'cursor-pointer': !disabled }"
                        append-pointer-events="none"
                    >
                        <template #append-icon>
                            <IconArrowDown
                                class="ease pe-none"
                                :class="{ 'flip-horizontally': shown }"
                            />
                        </template>
                    </UiTextField>
                </slot>
            </template>

            <template #[dynamicContentSlotName]>
                <div class="datetime-picker__wrapper br-13 d-flex align-items-center position-relative">
                    <UiDatePicker
                        v-model="selectedDate"
                        class="datetime-picker__date w-100"
                        v-bind="datePickerSettings"
                        independent
                    />

                    <UiTimePicker
                        v-if="selectedDate"
                        v-model="selectedTime"
                        class="datetime-picker__time"
                        v-bind="timePickerSettings"
                        independent
                    />
                </div>
            </template>
        </Component>
    </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'

import { DATE_PICKER_DEFAULT_FORMAT } from '~/components/types/ui-datepicker'
import { type UiFieldProps, UiTextFieldMode } from '~/components/types/ui-input'
import { UiPopoverAlignment } from '~/components/types/ui-popover'
import type { ITime } from '~/components/types/ui-timepicker'
import type { Props as UiDatePickerProps } from '~/components/UiFields/UiDatePicker.vue'
import UiDatePicker from '~/components/UiFields/UiDatePicker.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import type { Props as UiTimePickerProps } from '~/components/UiFields/UiTimePicker.vue'
import UiTimePicker from '~/components/UiFields/UiTimePicker.vue'
import UiPopover from '~/components/UiPopover.vue'
import { useDayjs } from '~/composables/useDayjs'
import IconArrowDown from '~/icons/IconArrowDown.vue'

interface Props extends UiFieldProps {
    modelValue?: Dayjs
    datePickerSettings?: UiDatePickerProps
    timePickerSettings?: UiTimePickerProps
    independent?: boolean // Use component as solo element without popover
}

const props = withDefaults(defineProps<Props>(), {
    datePickerSettings: () => ({
        format: DATE_PICKER_DEFAULT_FORMAT
    })
})

const emit = defineEmits<(event: 'update:modelValue', date?: Dayjs) => void>()

const isDropdownShown = ref(false)

const { dayjs } = useDayjs()

const selectedDate = ref<Dayjs>()
const selectedTime = ref<ITime>()

const dateTime = computed(() => {
    if (selectedTime.value) {
        return dayjs(selectedDate.value).tz().hour(selectedTime.value.hours).minute(selectedTime.value.minutes)
    }

    return undefined
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const formattedValue = computed(() => (props.modelValue ? props.modelValue.tz().format(`${props.datePickerSettings.format} HH:mm`) : ''))

const dynamicContentSlotName = computed(() => (props.independent ? 'default' : 'content'))

onMounted(() => {
    if (props.modelValue) {
        const hours = props.modelValue.hours()
        const minutes = props.modelValue.minutes()
        selectedTime.value = { hours, minutes }
    }
})

watch(dateTime, () => {
    emit('update:modelValue', dateTime.value)
})
watch(selectedTime, () => {
    isDropdownShown.value = false
})
</script>

<style lang="scss" scoped>
.datetime-picker {
    &__wrapper {
        background: var(--ui-datetime-picker-background, var(--ui-light));
        gap: 32px;
        padding: 24px;
    }

    &__time {
        flex-shrink: 0;
    }

    :deep(.date-picker__wrapper) {
        padding: 0;
    }
}
</style>
