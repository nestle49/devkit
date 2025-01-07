<template>
    <DemoWrapper>
        <h2>Ui Dropdown</h2>

        <h3>Search as textfield</h3>

        <UiDropdown
            v-model:search-query="searchQuery"
            :select-label="e => e.country.name"
            :select-value="e => e.country.name"
            :max-height="400"
            :items="filteredPhoneFormats"
            :value="selectedFormat"
            :active-indexes="filteredPhoneFormats.findIndex(f => f.id === selectedFormat.id)"
            :search="{ type: 'textfield', placeholder: 'Select format' }"
            @input="selectedFormat = filteredPhoneFormats[$event]!"
        />

        <h3>Search as inner input</h3>

        <UiDropdown
            v-model:search-query="innerInputSearchQuery"
            :select-label="e => e.country.name"
            :select-value="e => e.country.name"
            :max-height="400"
            :items="filteredPhoneFormatWithInputSearch"
            :value="selectedFormatWithInputSearch"
            divider
            :active-indexes="filteredPhoneFormatWithInputSearch.findIndex(f => f.id === selectedFormatWithInputSearch.id)"
            placeholder="Select format"
            :search="{ type: 'inner', placeholder: 'Search for format' }"
            @input="selectedFormatWithInputSearch = filteredPhoneFormatWithInputSearch[$event]!"
        />

        <br />

        <h3>Multiple</h3>

        <UiDropdown
            id="multiple-countries-list"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            multiple
            :label="label"
            checkboxes
            :active-indexes="multipleSelectedItems"
            :max-height="200"
            placeholder="Select items"
            @input:multiple="multipleSelectedItems = $event"
        />

        <h3>Chips Multiple</h3>

        <UiDropdown
            id="chips-multiple-countries-list"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            multiple
            :size="UiTextFieldSize.SMALL"
            checkboxes
            closable-chips
            :mode="UiDropdownMode.CHIPS"
            :active-indexes="multipleSelectedItems"
            :max-height="200"
            placeholder="Select items"
            @input:multiple="multipleSelectedItems = $event"
        />

        <br />

        <UiDropdown
            id="chips-multiple-countries-list-small"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            multiple
            :size="UiTextFieldSize.MEDIUM"
            checkboxes
            closable-chips
            :label="label"
            :mode="UiDropdownMode.CHIPS"
            :active-indexes="multipleSelectedItems"
            :max-height="200"
            placeholder="Select items"
            @input:multiple="multipleSelectedItems = $event"
        />

        <br />

        <UiDropdown
            id="chips-multiple-countries-list-medium"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            multiple
            checkboxes
            closable-chips
            :label="label"
            :mode="UiDropdownMode.CHIPS"
            :active-indexes="multipleSelectedItems"
            :max-height="200"
            placeholder="Select items"
            @input:multiple="multipleSelectedItems = $event"
        />

        <br />

        <UiList :mode="UiListMode.UNORDERED">
            <UiListItem
                v-for="item in multipleSelectedItems"
                :key="item"
                :mode="UiListMode.UNORDERED"
                :index="item"
            >
                {{ phoneFormats?.[item]?.country.name }}
            </UiListItem>
        </UiList>

        <h3>Single</h3>

        <UiDropdown
            :select-label="e => e.country.name"
            :items="phoneFormats"
            :max-height="300"
            :active-indexes="singleSelectedItem"
            @input="singleSelectedItem = $event"
        />

        <h3>With Label</h3>

        <UiDropdown
            :label="label"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            :max-height="300"
            transparent
            :active-indexes="singleSelectedItem"
            @input="singleSelectedItem = $event"
        />

        <h3>Single disabled</h3>

        <UiDropdown
            :select-label="e => e.country.name"
            :items="phoneFormats"
            :active-indexes="singleSelectedItem"
            disabled
            @input="singleSelectedItem = $event"
        />

        <h3>Button Multiple</h3>

        <UiDropdown
            id="button-countries-list"
            :select-label="e => e.country.name"
            :items="phoneFormats"
            multiple
            button
            checkboxes
            :active-indexes="selectedItemsWithButton"
            :max-height="200"
            :max-width="300"
            class="d-inline-flex"
            @input:multiple="selectedItemsWithButton = $event"
        >
            <template #button> Open dropdown </template>
        </UiDropdown>

        <br /><br />

        <UiList :mode="UiListMode.UNORDERED">
            <UiListItem
                v-for="item in selectedItemsWithButton"
                :key="item"
                :mode="UiListMode.UNORDERED"
                :index="item"
            >
                {{ phoneFormats[item]?.country.name }}
            </UiListItem>
        </UiList>

        <h3>Text Dropdown</h3>

        <UiDropdown
            v-model:search-query="innerInputSearchQuery"
            divider
            :active-indexes="filteredPhoneFormatWithInputSearch.findIndex(f => f.id === selectedFormatWithInputSearch.id)"
            :items="filteredPhoneFormatWithInputSearch"
            :max-height="400"
            :max-width="300"
            :search="{ type: 'inner', placeholder: 'Search for country' }"
            :select-label="e => e.country.name"
            :select-value="e => e.country.name"
            :value="selectedFormatWithInputSearch"
            @input="selectedFormatWithInputSearch = filteredPhoneFormatWithInputSearch[$event]!"
        >
            <template #attach="{ openedHandler }">
                <p
                    class="cursor-pointer m-0"
                    @click="openedHandler"
                >
                    {{ selectedFormatWithInputSearch.country.name ? selectedFormatWithInputSearch.country.name : 'Выбор страны' }}

                    {{ selectedFormatWithInputSearch.country.flag }}
                </p>
            </template>
        </UiDropdown>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiDropdownMode } from '~/components/types/ui-dropdown'
import { UiTextFieldSize } from '~/components/types/ui-input'
import { UiListMode } from '~/components/types/ui-list'
import UiDropdown from '~/components/UiFields/UiDropdown.vue'
import UiList from '~/components/UiList.vue'
import UiListItem from '~/components/UiListItem.vue'
import { generateLorem } from '~/mock/lorem'
import { phoneFormats } from '~/mock/phoneFormats'

const label = generateLorem(1)
const multipleSelectedItems = ref<number[]>([])
const singleSelectedItem = ref(0)
const selectedItemsWithButton = ref<number[]>([0, 1, 2])

const searchQuery = ref('')
const filteredPhoneFormats = computed(() =>
    phoneFormats.filter(e => e.country.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)
const selectedFormat = ref(phoneFormats[0])

const innerInputSearchQuery = ref('')
const filteredPhoneFormatWithInputSearch = computed(() =>
    phoneFormats.filter(e => e.country.name.toLowerCase().includes(innerInputSearchQuery.value.toLowerCase()))
)
const selectedFormatWithInputSearch = ref(phoneFormats[0])
</script>
