<template>
    <DemoWrapper>
        <h2>Ui Text Field Phone Mask</h2>

        <div class="d-flex flex-column gap-10 mb-30">
            <UiTextFieldPhoneMask
                v-for="size in UiTextFieldSize"
                :key="size"
                v-model:search-query="searchQuery"
                :selected-phone-format="selectedPhoneFormat"
                required
                :phone-label="getPhoneFieldLabel"
                :formats="filteredPhoneFormats"
                :phone="phone"
                label="Label"
                :size="size"
                flag-size="22px"
                placeholder="Placeholder"
                search-placeholder="Search Placeholder"
                @change-phone="phone = $event"
                @reset-phone="phone = ''"
                @change-mask="selectedPhoneFormat = $event"
            >
                <template #prepend-icon>
                    <UiIcon
                        name="phone"
                        :size="22"
                    />
                </template>
            </UiTextFieldPhoneMask>
        </div>
    </DemoWrapper>
</template>

<script setup lang="ts">
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiTextFieldSize } from '~/components/types/ui-input'
import type { UiId, UiPhoneFormat } from '~/components/types/ui-textfield-phone-mask'
import UiTextFieldPhoneMask from '~/components/UiFields/UiTextFieldPhoneMask.vue'
import UiIcon from '~/components/UiIcon.vue'
import { phoneFormats } from '~/mock/phoneFormats'

const selectedPhoneFormatId = ref<UiId>(0)
const selectedPhoneFormat = ref(phoneFormats[selectedPhoneFormatId.value])
const searchQuery = ref('')
const phone = ref('')

const getPhoneFieldLabel = (p: UiPhoneFormat) => `${p.country.flag} ${p.country.name} (${p.country.code})`

const filteredPhoneFormats = computed(() =>
    phoneFormats.filter(e => e.country.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim()))
)
</script>
