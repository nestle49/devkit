<template>
    <DemoWrapper>
        <h2>Ui Tab</h2>

        <div class="tabs">
            <div class="tab-group">
                <UiTab
                    v-for="tab in tabs"
                    :key="tab.value"
                    :disabled="tab.disabled"
                    :active="tab.value === activeTab"
                    @click="activeTab = tab.value"
                >
                    {{ tab.value }}
                </UiTab>
            </div>
            <div class="tab-group">
                <UiTab
                    v-for="tab in tabs"
                    :key="tab.value"
                    :mode="UiTabMode.BORDER"
                    :disabled="tab.disabled"
                    :active="tab.value === activeTab"
                    @click="activeTab = tab.value"
                >
                    {{ tab.value }}
                </UiTab>
            </div>
            <div class="tab-group tab-group--text">
                <UiTab
                    v-for="(tab, tabIndex) in tabs"
                    :key="tab.value"
                    :mode="UiTabMode.TEXT"
                    :disabled="tab.disabled"
                    :active="tab.value === activeTab"
                    :last="tabIndex === tabs.length - 1"
                    @click="activeTab = tab.value"
                >
                    {{ tab.value }}
                </UiTab>
            </div>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiTabMode } from '~/components/types/ui-tab'
import UiTab from '~/components/UiTab.vue'

const tabs = [{ value: 'One' }, { value: 'Two' }, { value: 'Three', disabled: true }, { value: 'Four' }]
const activeTab = ref(tabs[0]?.value)
</script>

<style lang="scss" scoped>
.tabs {
    display: grid;
    gap: 20px;
}

.tab-group {
    display: flex;

    &:not(&--text) {
        gap: 12px;
    }
}
</style>
