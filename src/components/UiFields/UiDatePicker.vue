<template>
    <div
        class="date-picker position-relative"
        :class="{ 'date-picker--disabled': disabled && independent }"
        @click.stop
    >
        <Component
            :is="independent ? 'div' : UiPopover"
            :alignment="right ? UiPopoverAlignment.BOTTOM_RIGHT : UiPopoverAlignment.BOTTOM_LEFT"
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
                        :required="required"
                        :placeholder="placeholder"
                        :value="formattedValue"
                        :size="size"
                        :mode="UiTextFieldMode.DROPDOWN"
                        :disabled="disabled"
                        :transparent="transparent"
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

            <template #[dynamicContentSlotName]="attrs">
                <div class="date-picker__wrapper d-inline-flex flex-column justify-content-center w-100 border-box cursor-default br-13">
                    <div class="date-navigation d-flex justify-content-center gap-20">
                        <div class="date-navigation__block w-100 position-relative d-flex justify-content-between align-items-center">
                            <button
                                type="button"
                                aria-label="Decrease month"
                                class="date-navigation__button d-flex justify-content-center align-items-center p-0 cursor-pointer"
                                :class="{ 'date-navigation__button--disabled pe-none': selectedMonth <= 0 }"
                                @click.stop="decreaseMonth"
                            >
                                <IconArrowLeft class="pe-none us-none" />
                            </button>

                            <UiPopover
                                :alignment="UiPopoverAlignment.BOTTOM"
                                :content-padding="0"
                                class="select-popover"
                            >
                                <template #relative>
                                    <Transition :name="monthAnim">
                                        <div
                                            v-if="months[selectedMonth]"
                                            :key="months[selectedMonth]"
                                            class="date-navigation__value date-navigation__month cursor-pointer text-center fs-14 fw-500 lh-160"
                                        >
                                            {{ months[selectedMonth] }}
                                        </div>
                                    </Transition>
                                </template>

                                <template #content="{ close }">
                                    <UiScroll
                                        :max-height="200"
                                        :horizontal-offset="6"
                                        :padding-scrollbar="20"
                                    >
                                        <ul class="select-popover__list list-style-none m-0 d-flex flex-column">
                                            <li
                                                v-for="(month, index) in months"
                                                :key="month"
                                                class="select-popover__item text-center position-relative cursor-pointer"
                                                :class="{ 'select-popover__item--active': selectedMonth === index }"
                                                @click="selectMonth(index, close)"
                                            >
                                                {{ month }}
                                            </li>
                                        </ul>
                                    </UiScroll>
                                </template>
                            </UiPopover>

                            <button
                                type="button"
                                aria-label="Increase month"
                                class="date-navigation__button d-flex justify-content-center align-items-center p-0 cursor-pointer"
                                :class="{ 'date-navigation__button--disabled pe-none': selectedMonth >= 11 }"
                                @click.stop="increaseMonth"
                            >
                                <IconArrowRight class="pe-none us-none" />
                            </button>
                        </div>

                        <div
                            v-if="years.length > 1"
                            class="date-navigation__block w-100 position-relative d-flex justify-content-between align-items-center"
                        >
                            <button
                                type="button"
                                aria-label="Decrease year"
                                class="date-navigation__button d-flex justify-content-center align-items-center p-0 cursor-pointer"
                                :class="{ 'date-navigation__button--disabled pe-none': selectedYear <= years[0]! }"
                                @click.stop="decreaseYear"
                            >
                                <IconArrowLeft class="pe-none us-none" />
                            </button>

                            <UiPopover
                                :alignment="UiPopoverAlignment.BOTTOM"
                                :content-padding="0"
                                class="select-popover"
                            >
                                <template #relative>
                                    <Transition :name="yearAnim">
                                        <div
                                            v-if="selectedYear"
                                            :key="selectedYear"
                                            class="date-navigation__value date-navigation__years cursor-pointer text-center fs-14 fw-500 lh-160"
                                        >
                                            {{ selectedYear }}
                                        </div>
                                    </Transition>
                                </template>

                                <template #content="{ close }">
                                    <UiScroll
                                        :max-height="200"
                                        :horizontal-offset="6"
                                        :padding-scrollbar="20"
                                    >
                                        <ul class="select-popover__list list-style-none m-0 d-flex flex-column">
                                            <li
                                                v-for="year in [...years].reverse()"
                                                :key="year"
                                                class="select-popover__item text-center position-relative cursor-pointer"
                                                :class="{ 'select-popover__item--active': selectedYear === year }"
                                                @click="selectYear(year, close)"
                                            >
                                                {{ year }}
                                            </li>
                                        </ul>
                                    </UiScroll>
                                </template>
                            </UiPopover>

                            <button
                                type="button"
                                aria-label="Increase year"
                                class="date-navigation__button d-flex justify-content-center align-items-center p-0 cursor-pointer"
                                :class="{ 'date-navigation__button--disabled pe-none': selectedYear >= years.at(-1)! }"
                                @click.stop="increaseYear"
                            >
                                <IconArrowRight class="pe-none us-none" />
                            </button>
                        </div>
                    </div>

                    <ul class="date-weekdays position-relative d-grid list-style-none p-0">
                        <li
                            v-for="(day, key) in weekDays"
                            :key="key"
                            class="date-weekdays__item fs-12 lh-160 text-center us-none"
                        >
                            {{ day }}
                        </li>
                    </ul>

                    <TransitionGroup
                        name="list"
                        tag="ul"
                        class="date-days position-relative d-grid m-0"
                    >
                        <li
                            v-for="(date, key) in listOfDates.flat()"
                            :key="`date-${key}`"
                            class="date-days__item position-relative d-flex justify-content-center align-items-center fs-14 z-index-1 cursor-pointer us-none"
                            :class="{ active: isDateSelected(date), disabled: !isDateMatchInterval(date) }"
                            @click.stop="datePickHandler(date, attrs?.close)"
                        >
                            {{ date }}
                        </li>
                    </TransitionGroup>
                </div>
            </template>
        </Component>
    </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'

import { DATE_PICKER_DEFAULT_FORMAT, DATE_PICKER_DEFAULT_LOCALE, DATE_PICKER_DEFAULT_TIMEZONE } from '~/components/types/ui-datepicker'
import { type UiFieldProps, UiTextFieldMode, UiTextFieldSize } from '~/components/types/ui-input'
import { UiPopoverAlignment } from '~/components/types/ui-popover'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiPopover from '~/components/UiPopover.vue'
import UiScroll from '~/components/UiScroll.vue'
import { useDayjs } from '~/composables/useDayjs'
import IconArrowDown from '~/icons/IconArrowDown.vue'
import IconArrowLeft from '~/icons/IconArrowLeft.vue'
import IconArrowRight from '~/icons/IconArrowRight.vue'

export interface Props extends UiFieldProps {
    modelValue?: Dayjs | null
    startDate?: Dayjs
    endDate?: Dayjs
    size?: UiTextFieldSize
    timezone?: string
    locale?: string
    format?: string
    independent?: boolean // Use component as solo element without popover
    transparent?: boolean
    right?: boolean
}

type Emits = (event: 'update:modelValue', date: Dayjs) => void

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    size: UiTextFieldSize.LARGE,
    timezone: DATE_PICKER_DEFAULT_TIMEZONE,
    locale: DATE_PICKER_DEFAULT_LOCALE,
    format: DATE_PICKER_DEFAULT_FORMAT
})

const emit = defineEmits<Emits>()

/**
 * For SHOP only
 * TODO: WTF?
 * Provide custom function to handle disabled items in list of weekdays
 * This function will take a higher priority
 * @param d - Date
 * @param q - Quick time calculation
 * @param m - Selected month date
 * @param s - Start date
 * @param e - End date
 */
const checkDisabledItem = inject<false | ((d: number, q: boolean, m: Dayjs, s: Dayjs, e: Dayjs) => boolean)>('checkDisabledItem', false)

// eslint-disable-next-line vue/no-setup-props-destructure, vue/no-setup-props-reactivity-loss
const { dayjs } = useDayjs(props.timezone, props.locale)

const dynamicContentSlotName = computed(() => (props.independent ? 'default' : 'content'))

const formattedValue = computed(() => (props.modelValue ? props.modelValue.tz().format(props.format) : ''))

const startDate = computed(() => {
    if (props.startDate) {
        return props.startDate
    }

    return dayjs().tz().subtract(100, 'years').startOf('day')
})

const endDate = computed(() => {
    if (props.endDate) {
        return props.endDate
    }

    return dayjs().tz().endOf('day')
})

const selectedMonth = ref(dayjs().tz().month())
const selectedYear = ref(dayjs().tz().year())

enum SlideList {
    UP = 'slide-up',
    DOWN = 'slide-down'
}

const monthAnim = ref<SlideList>(SlideList.UP)
const yearAnim = ref<SlideList>(SlideList.UP)

const normalizedStartDate = computed(() => startDate.value.startOf('day'))
const normalizedEndDate = computed(() => endDate.value.endOf('day'))

const years = computed(() =>
    Array(Math.max(normalizedEndDate.value.year() - normalizedStartDate.value.year() + 1, 0))
        .fill(0)
        .map((_a, i) => dayjs.tz(normalizedStartDate.value).add(i, 'year').year())
)

const months = computed(() => {
    const date = dayjs().tz().year(selectedYear.value)
    return Array(12)
        .fill(0)
        .map((_a, i) => date.month(i).locale(props.locale).format('MMMM'))
})

const weekDays = computed(() => [0, 1, 2, 3, 4, 5, 6].map(day => dayjs().tz().locale(props.locale).weekday(day).format('dd')))

const selectedMonthDate = computed(() => dayjs().tz().year(selectedYear.value).month(selectedMonth.value).startOf('month'))

const listOfDates = computed(() => {
    let list = Array<number | ''>(selectedMonthDate.value.isoWeekday() - 1).fill('')
    list = [
        ...list,
        ...Array(selectedMonthDate.value.daysInMonth())
            .fill(0)
            .map((_d, i) => i + 1)
    ]
    const weekOfMonth = Math.ceil(list.length / 7)

    return Array(weekOfMonth)
        .fill([])
        .map((_w, i) => list.slice(7 * i, 7 * i + 7))
})

const decreaseMonth = () => {
    if (selectedMonth.value > 0) {
        monthAnim.value = SlideList.UP
        selectedMonth.value -= 1
    }
}

const increaseMonth = () => {
    if (selectedMonth.value < 11) {
        monthAnim.value = SlideList.DOWN
        selectedMonth.value += 1
    }
}

const selectMonth = (monthIndex: number, closePopover: () => void) => {
    monthAnim.value = selectedMonth.value < monthIndex ? SlideList.DOWN : SlideList.UP
    selectedMonth.value = monthIndex
    closePopover()
}

const decreaseYear = () => {
    const firstYear = years.value[0]
    if (firstYear && selectedYear.value > firstYear) {
        yearAnim.value = SlideList.UP
        selectedYear.value -= 1
    }
}

const increaseYear = () => {
    const lastYear = years.value[years.value.length - 1]
    if (lastYear && selectedYear.value < lastYear) {
        yearAnim.value = SlideList.DOWN
        selectedYear.value += 1
    }
}

const selectYear = (year: number, closePopover: () => void) => {
    yearAnim.value = selectedYear.value < year ? SlideList.DOWN : SlideList.UP
    selectedYear.value = year
    closePopover()
}

const isDateSelected = (date: number | '') => {
    if (!date || !props.modelValue) {
        return false
    }

    return dayjs(selectedMonthDate.value).tz().date(date).isSame(props.modelValue.tz(), 'day')
}

const isDateMatchInterval = (date: number | '') => {
    if (!date) {
        return false
    }

    if (checkDisabledItem) {
        return checkDisabledItem(date, true, dayjs(selectedMonthDate.value).tz(), startDate.value, endDate.value)
    }

    const d = dayjs(selectedMonthDate.value).tz().date(date)
    return d.isBetween(normalizedStartDate.value, normalizedEndDate.value, 'day', '[]')
}

const datePickHandler = (date: number | '', closeDropdown?: () => void) => {
    if (!date) {
        return
    }

    emit('update:modelValue', dayjs(selectedMonthDate.value).tz().date(date))
    closeDropdown && closeDropdown()
}

onBeforeMount(() => {
    if (dayjs.isDayjs(props.modelValue)) {
        selectedMonth.value = props.modelValue.month()
        selectedYear.value = props.modelValue.year()
    }
})
</script>

<style lang="scss" scoped>
$gridGapX: 13px;

.date-picker {
    $self: &;

    &__wrapper {
        padding: 18px 30px 30px;
        background-color: var(--ui-datetime-picker-background, var(--ui-light));
    }

    &--disabled {
        opacity: 0.4;
        pointer-events: none;
        user-select: none;
    }
}

.date-navigation {
    &__button {
        width: 15px;
        height: 15px;
        fill: var(--ui-secondary);

        &--disabled {
            opacity: 0.2;
        }
    }

    &__value {
        margin: 0 10px;
        text-transform: capitalize;
        color: var(--ui-secondary);
    }

    &__month {
        min-width: 90px;
    }

    &__years {
        min-width: 38px;
    }
}

.select-popover {
    $self: &;

    text-transform: capitalize;
    font-size: 14px;

    &__list {
        min-width: 80px;
        padding: 8px 0;
    }

    &__item {
        min-width: 80px;
        padding: 8px 16px;

        &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            opacity: 0.1;
            top: 0;
            left: 0;
            z-index: -1;
            transition: 0.5s ease all;
        }

        &:hover,
        &--active {
            color: var(--ui-secondary);

            &::before {
                background: var(--ui-secondary);
            }
        }
    }
}

.date-weekdays {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0 #{$gridGapX};
    margin: 10px 0 7px;
    text-transform: capitalize;

    &__item {
        opacity: 0.6;
    }

    &::after {
        position: absolute;
        content: '';
        bottom: -7px;
        width: 100%;
        height: 1px;
        opacity: 0.1;
        background: var(--ui-secondary);
    }
}

.date-days {
    padding: 10px 0 0;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 8px #{$gridGapX};

    &__item {
        height: 22px;
        opacity: 0.6;

        &::after {
            position: absolute;
            content: '';
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: var(--ui-secondary);
            z-index: -1;
            opacity: 0;
            transition: 0.5s all ease;
        }

        &:hover,
        &.active {
            opacity: 1;
            color: var(--ui-secondary);

            &::after {
                opacity: 0.2;
            }
        }

        &.disabled {
            opacity: 0.2;
            pointer-events: none;
        }
    }
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all cubic-bezier(0, 0, 0.2, 1) 0.5s;
}

.slide-up-enter-from,
.slide-up-leave-to,
.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
}

.slide-down-enter-from {
    transform: translateY(100%);
}

.slide-down-leave-to {
    transform: translateY(-100%);
}

.slide-up-enter-from {
    transform: translateY(-100%);
}

.slide-up-leave-to {
    transform: translateY(100%);
}

.slide-down-leave-active,
.slide-up-leave-active {
    position: absolute;
    width: 100%;
    text-align: center;
    left: -10px;
    opacity: 0;
}
</style>
