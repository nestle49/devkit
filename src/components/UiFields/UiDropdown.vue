<template>
    <div
        ref="dropdown"
        class="ui-dropdown position-relative"
    >
        <slot
            name="attach"
            v-bind="{ openedHandler }"
        >
            <UiTextField
                v-if="!button && search?.type === 'textfield'"
                :mode="UiTextFieldMode.TEXT"
                :size
                :label
                :required
                :disabled
                :transparent
                :apply-disabled-styles="applyDisabledStyles"
                :value="searchQueryTmp"
                :placeholder
                :autofocus
                :input-attrs="inputAttrs"
                :loading
                :clearable="false"
                aria-label="toggle"
                @input="searchQueryTmp = $event"
                @click="openedHandler"
                @click-append="openedHandler"
            >
                <template
                    v-if="$slots.default"
                    #prepend-icon
                >
                    <slot />
                </template>

                <template
                    v-if="items.length"
                    #append-icon
                >
                    <IconArrowDown
                        class="ease pe-none"
                        :class="{ 'flip-horizontally': isOpenedDropdown }"
                    />
                </template>
            </UiTextField>

            <UiTextField
                v-else-if="!button"
                :mode="UiTextFieldMode.DROPDOWN"
                :size
                :label
                :required
                :disabled
                :transparent
                :apply-disabled-styles="applyDisabledStyles"
                :value="fieldValue"
                :placeholder
                :autofocus
                :input-attrs="inputAttrs"
                :loading
                :class="!disabled && 'cursor-pointer'"
                aria-label="toggle"
                @click="openedHandler"
                @click-append="openedHandler"
            >
                <template
                    v-if="$slots.default"
                    #prepend-icon
                >
                    <slot />
                </template>

                <template
                    v-if="mode === UiDropdownMode.CHIPS && ((Array.isArray(activeIndexes) && activeIndexes.length) || activeIndexes)"
                    #chips
                >
                    <template
                        v-for="index in Array.isArray(activeIndexes) ? activeIndexes : [activeIndexes]"
                        :key="index"
                    >
                        <UiChips
                            :size
                            :closable="closableChips"
                            @close="closeChips(index)"
                        >
                            {{ getNameValue(items[index]) || fieldValueByObject }}
                        </UiChips>
                    </template>
                </template>

                <template #append-icon>
                    <IconArrowDown
                        class="ease pe-none"
                        :class="{ 'flip-horizontally': isOpenedDropdown && items.length }"
                    />
                </template>
            </UiTextField>

            <UiButton
                v-else
                :color-mode="UiButtonColorMode.NEUTRAL"
                :active="isOpenedDropdown"
                aria-label="toggle"
                :disabled
                @click="openedHandler"
            >
                <slot name="button" />

                <template #appendIcon>
                    <IconArrowDown
                        class="ease pe-none"
                        :class="{ 'flip-horizontally': isOpenedDropdown && items.length }"
                    />
                </template>
            </UiButton>
        </slot>

        <Transition :name="reverse ? 'ui-dropdown-fade-reverse' : 'ui-dropdown-fade'">
            <div
                v-if="isOpenedDropdown && (items.length || searchQuery)"
                class="dropdown-list w-100 br-20 border-gray position-absolute bg-lite border-box overflow-hidden"
                :class="{ 'right-0': right, reverse }"
                :style="{
                    maxHeight: maxHeight ? `${maxHeight}px` : 'unset',
                    maxWidth: maxWidth ? `${maxWidth}px` : 'unset',
                    minWidth: minWidth ? `${minWidth}px` : 'unset'
                }"
            >
                <input
                    v-if="search?.type === 'inner'"
                    :value="searchQuery"
                    :placeholder="search.placeholder"
                    class="dropdown-search"
                    :style="{ '--ui-dropdown-search-height': `${dropdownSearchHeight}px` }"
                    @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value.trim())"
                />

                <UiScroll
                    :max-height="search?.type === 'inner' && maxHeight ? maxHeight - dropdownSearchHeight : maxHeight"
                    :horizontal-offset="15"
                    :padding-scrollbar="30"
                >
                    <ul
                        class="options p-0 m-0 list-style-none"
                        :class="[checkboxes ? 'options--checkboxes-list' : 'options--list']"
                    >
                        <li
                            v-for="(item, index) in items"
                            :key="index"
                            :value="index"
                        >
                            <!-- TODO: 'div' also can be RouterLink with 'to' attr -->
                            <!-- TODO: can maybe have icon -->
                            <!-- TODO: what's structure of data? Add as needed -->
                            <div
                                v-if="!checkboxes"
                                class="options__item position-relative d-flex align-items-center ease cursor-pointer"
                                :class="{
                                    active: isActiveItem(index),
                                    'text-center': centered,
                                    'options__item--divider': divider
                                }"
                                @click.stop="selectItem(index)"
                            >
                                <span class="w-100 overflow-hidden text-nowrap truncate fs-14 lh-160 fw-400 ease">
                                    {{ selectLabel(item) }}
                                </span>
                            </div>

                            <UiCheckbox
                                v-else
                                :id="`${id}-${index}`"
                                :value="isActiveItem(index)"
                                :padding-top="5"
                                :padding-right="30"
                                :padding-bottom="5"
                                :padding-left="30"
                                extended
                                @input="selectItem(index)"
                            >
                                {{ selectLabel(item) }}
                            </UiCheckbox>
                        </li>
                    </ul>
                </UiScroll>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup generic="T">
import { UiButtonColorMode } from '~/components/types/ui-button'
import { UiDropdownMode, type UiDropdownSearch } from '~/components/types/ui-dropdown'
import { type UiFieldProps, UiTextFieldMode, UiTextFieldSize } from '~/components/types/ui-input'
import UiButton from '~/components/UiButton/UiButton.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import IconArrowDown from '~/icons/IconArrowDown.vue'

/**
 * TODO: https://github.com/vuejs/core/issues/8952
 * activeIndexes = multiple ? number[] : number
 */
interface Props extends UiFieldProps {
    size?: UiTextFieldSize
    transparent?: boolean
    applyDisabledStyles?: boolean
    multiple?: boolean
    items: NonNullable<T>[]
    selectValue?: (item: T) => string
    selectLabel?: (item: T) => string
    activeIndexes?: number[] | number
    value?: T
    button?: boolean
    mode?: UiDropdownMode
    right?: boolean
    centered?: boolean
    divider?: boolean
    maxHeight?: number
    minWidth?: number
    maxWidth?: number
    inputAttrs?: InputHTMLAttributes
    loading?: boolean
    search?: UiDropdownSearch
    /**
     * Null by default to handle it inside component (no external handlers)
     */
    opened?: boolean | null
    autofocus?: boolean
    searchQuery?: string
    reverse?: boolean
    checkboxes?: boolean
    closableChips?: boolean
}

/**
 * TODO: если использовать `interface`, то выдается ошибку
 *
 * ```src/components/UiDropdown.vue.ts(17,1): error TS4082: Default export of the module has or is using private name 'Emits'.```
 * и типы компонента ломаются после сборки
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Emits = {
    (event: 'input', index: number): void
    (event: 'input:multiple', indexes: number[]): void
    (event: 'update:value', val: string): void
    (event: 'click', e: MouseEvent): void
    (event: 'update:opened', val: boolean): void
    (event: 'update:searchQuery', val: string): void
}

const props = withDefaults(defineProps<Props>(), {
    size: UiTextFieldSize.LARGE,
    applyDisabledStyles: true,
    selectValue: () => '',
    selectLabel: () => '',
    minWidth: 230,
    opened: null,
    checkboxes: false,
    mode: UiDropdownMode.SELECT,
    closableChips: false
})

const emit = defineEmits<Emits>()
/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */
const UiChips = defineAsyncComponent(() => import('~/components/UiChips.vue'))
const UiScroll = defineAsyncComponent(() => import('~/components/UiScroll.vue'))
const UiCheckbox = defineAsyncComponent(() => import('~/components/UiCheckbox.vue'))
/* eslint-enable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */

/** TODO: сделать динамически, т.к. css-переменная может быть переопределена и тогда расчеты будут неверными */
const dropdownSearchHeight = 48

const searchQueryTmp = ref('')

const isActiveItem = (index: number) => {
    if (props.multiple && Array.isArray(props.activeIndexes)) {
        return props.activeIndexes.includes(index)
    }

    return props.activeIndexes === index
}

const activeItems = computed(() => {
    if (props.multiple) {
        return props.items.filter((_, i) => Array.isArray(props.activeIndexes) && props.activeIndexes.includes(i))
    }

    return props.items.filter((_, i) => props.activeIndexes === i)
})

const dropdown = ref<HTMLElement>()

const isOpenedDropdownFlag = ref(false)
const isOpenedDropdown = computed({
    get() {
        if (props.opened === null) {
            return isOpenedDropdownFlag.value
        }

        return props.opened
    },

    set(status: boolean) {
        if (props.opened === null) {
            isOpenedDropdownFlag.value = status
            return
        }

        emit('update:opened', status)
    }
})

onClickOutside(dropdown, () => {
    if (isOpenedDropdown.value) {
        isOpenedDropdown.value = false
    }
})

const selectItem = async (selectedItemIndex: number) => {
    let newActiveItemsIndexes = props.activeIndexes

    if (props.multiple) {
        newActiveItemsIndexes = Array.isArray(newActiveItemsIndexes) ? newActiveItemsIndexes : []

        newActiveItemsIndexes = newActiveItemsIndexes.includes(selectedItemIndex)
            ? newActiveItemsIndexes.filter(i => i !== selectedItemIndex)
            : [...newActiveItemsIndexes, selectedItemIndex]

        emit('input:multiple', newActiveItemsIndexes)

        return
    }

    newActiveItemsIndexes = selectedItemIndex

    emit('input', newActiveItemsIndexes)
    emit('update:searchQuery', '')
    await nextTick(() => {
        isOpenedDropdown.value = false
    })
}

const closeChips = (index: number) => {
    if (Array.isArray(props.activeIndexes) && props.activeIndexes.length) {
        emit(
            'input:multiple',
            props.activeIndexes.filter(e => e !== index)
        )
    }
}

const getNameValue = (e: NonNullable<T>) => (typeof e === 'object' ? props.selectValue(e) || props.selectLabel(e) || '' : e)

const listNamesSelected = computed(() => activeItems.value.map(getNameValue))

const fieldValueByObject = computed(() => {
    if (typeof props.value === 'object') {
        return props.selectValue(props.value).toString() || props.selectLabel(props.value).toString() || ''
    }

    return props.value?.toString() ?? ''
})

const fieldValue = computed(() => {
    if (activeItems.value.length) {
        return listNamesSelected.value.join(', ')
    }

    return fieldValueByObject.value
})

const openedHandler = () => {
    if (props.disabled) {
        return
    }

    isOpenedDropdown.value = !isOpenedDropdown.value
}

const isEmittedSearchChange = ref(true)
const hasOpened = ref(false)

watch(isOpenedDropdown, () => {
    hasOpened.value = true
})

watch(fieldValue, () => {
    searchQueryTmp.value = fieldValue.value
})

watch(
    () => props.value,
    () => {
        isEmittedSearchChange.value = typeof props.value !== 'object'
    },
    { immediate: true }
)

watch(searchQueryTmp, () => {
    if (props.search?.type === 'textfield' && hasOpened.value) {
        isOpenedDropdown.value = true
    }

    if (!isEmittedSearchChange.value) {
        isEmittedSearchChange.value = true
        return
    }

    if (props.search?.type === 'inner' && hasOpened.value) {
        return
    }

    emit('update:searchQuery', searchQueryTmp.value)
})

onMounted(() => {
    searchQueryTmp.value = fieldValue.value
})
</script>

<style lang="scss" scoped>
.options {
    $self: &;

    &--list {
        padding: 4px 0;

        #{$self}__item {
            min-height: 47px;
            padding: 0 30px;

            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                opacity: 0.1;
                left: 0;
                z-index: -1;
                transition: 0.5s ease all;
            }

            &--divider::after {
                position: absolute;
                content: '';
                width: calc(100% - 60px);
                height: 1px;
                left: 30px;
                bottom: 0;
                background: var(--ui-line);
            }

            &.active,
            &:hover {
                color: var(--ui-secondary);

                &::before {
                    background: var(--ui-secondary);
                }
            }
        }

        & li {
            &:last-of-type #{$self}__item {
                &::after {
                    content: none;
                }
            }
        }
    }

    &--checkboxes-list {
        padding: 25px 0;
    }
}

.dropdown-list {
    background: var(--ui-dropdown-bg);
    box-shadow: var(--ui-dropdown-shadow);
    top: calc(100% + 10px);
    z-index: 3;

    &.reverse {
        top: unset;
        bottom: calc(100% + 10px);
    }
}

.dropdown-search {
    border: none;
    outline: none;
    background: var(--ui-dropdown-bg);
    width: 100%;
    height: var(--ui-dropdown-search-height);
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    font-family: inherit;
    border-bottom: 1px solid var(--ui-line);
    color: var(--ui-dropdown-search-input-color, var(--ui-dropdown-input-color));
}

.ui-dropdown-fade-enter-active,
.ui-dropdown-fade-leave-active,
.ui-dropdown-fade-reverse-enter-active,
.ui-dropdown-fade-reverse-leave-active {
    transition: all ease 0.5s;
}

.ui-dropdown-fade-enter-from,
.ui-dropdown-fade-leave-to,
.ui-dropdown-fade-reverse-enter-from,
.ui-dropdown-fade-reverse-leave-to {
    opacity: 0;
    pointer-events: none;
}

.ui-dropdown-fade-enter-from,
.ui-dropdown-fade-leave-to {
    transform: translateY(20px);
}

.ui-dropdown-fade-reverse-enter-from,
.ui-dropdown-fade-reverse-leave-to {
    transform: translateY(-20px);
}
</style>
