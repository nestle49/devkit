<template>
    <div
        class="container"
        :class="{ modern }"
    >
        <h1>UI-kit</h1>

        <div class="position-fixed right-0 top-0 px-20 py-20 z-index-10">
            <UiCheckbox
                id="modern"
                :value="modern"
                @input="modern = $event"
            >
                modern
            </UiCheckbox>
        </div>

        <div class="elements-list d-grid">
            <DemoUiColorPicker />
            <DemoUiAlert />
            <DemoUiDatePicker />
            <DemoUiTimePicker />
            <DemoUiDateTimePicker />
            <DemoUiDropdown />
            <DemoUiTable class="fluid" />
            <DemoUiDataTable class="fluid" />
            <DemoUiTextArea />
            <DemoUiScroll />
            <DemoUiButton class="fluid" />
            <DemoUiPopover class="fluid" />
            <DemoUiTextField class="fluid" />
            <DemoUiTextFieldPhoneMask class="fluid" />
            <DemoUiFileInput />
            <DemoUiPagination />
            <DemoUiBreadcrumbs />
            <DemoUiCount />
            <DemoUiRadio />
            <DemoUiModal />
            <DemoUiRating />
            <DemoUiSwitch />
            <DemoUiCheckbox />
            <DemoUiTab />
            <DemoUiRange />
            <DemoUiList />
            <DemoUiQuote />
            <DemoUiHeading />
            <DemoUiUnderline />
            <DemoUiGradientBlock />
        </div>
    </div>
</template>

<script setup lang="ts">
import DemoUiAlert from '~/components/demo/DemoUiAlert.vue'
import DemoUiBreadcrumbs from '~/components/demo/DemoUiBreadcrumbs.vue'
import DemoUiButton from '~/components/demo/DemoUiButton.vue'
import DemoUiCheckbox from '~/components/demo/DemoUiCheckbox.vue'
import DemoUiColorPicker from '~/components/demo/DemoUiColorPicker.vue'
import DemoUiCount from '~/components/demo/DemoUiCount.vue'
import DemoUiDataTable from '~/components/demo/DemoUiDataTable.vue'
import DemoUiDatePicker from '~/components/demo/DemoUiDatePicker.vue'
import DemoUiDateTimePicker from '~/components/demo/DemoUiDateTimePicker.vue'
import DemoUiDropdown from '~/components/demo/DemoUiDropdown.vue'
import DemoUiFileInput from '~/components/demo/DemoUiFileInput.vue'
import DemoUiGradientBlock from '~/components/demo/DemoUiGradientBlock.vue'
import DemoUiHeading from '~/components/demo/DemoUiHeading.vue'
import DemoUiList from '~/components/demo/DemoUiList.vue'
import DemoUiModal from '~/components/demo/DemoUiModal.vue'
import DemoUiPagination from '~/components/demo/DemoUiPagination.vue'
import DemoUiPopover from '~/components/demo/DemoUiPopover.vue'
import DemoUiQuote from '~/components/demo/DemoUiQuote.vue'
import DemoUiRadio from '~/components/demo/DemoUiRadio.vue'
import DemoUiRange from '~/components/demo/DemoUiRange.vue'
import DemoUiRating from '~/components/demo/DemoUiRating.vue'
import DemoUiScroll from '~/components/demo/DemoUiScroll.vue'
import DemoUiSwitch from '~/components/demo/DemoUiSwitch.vue'
import DemoUiTab from '~/components/demo/DemoUiTab.vue'
import DemoUiTable from '~/components/demo/DemoUiTable.vue'
import DemoUiTextArea from '~/components/demo/DemoUiTextArea.vue'
import DemoUiTextField from '~/components/demo/DemoUiTextField.vue'
import DemoUiTextFieldPhoneMask from '~/components/demo/DemoUiTextFieldPhoneMask.vue'
import DemoUiTimePicker from '~/components/demo/DemoUiTimePicker.vue'
import DemoUiUnderline from '~/components/demo/DemoUiUnderline.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'

const modern = ref(false)
</script>

<style lang="scss" scoped>
.container {
    max-width: 1220px;
    width: 100%;
    margin: 0 auto;
}

.elements-list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
}

.fluid {
    grid-column: 1 / -1;
    max-width: 100%;
}

.modern {
    --ui-button-large-border-radius: 40px;
    --ui-button-medium-border-radius: 40px;
    --ui-button-small-border-radius: 40px;
    --ui-count-default-border-radius: 40px;
    --ui-count-medium-border-radius: 40px;
    --ui-count-small-border-radius: 40px;
    --ui-text-field-small-border-radius: 40px;
    --ui-text-field-medium-border-radius: 40px;
    --ui-text-field-large-border-radius: 40px;
    --ui-chips-border-radius: 20px;
}
</style>
