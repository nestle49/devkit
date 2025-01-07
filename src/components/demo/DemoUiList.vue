<template>
    <DemoWrapper class="demo-list">
        <h2>List</h2>

        <div class="demo-list__mode d-flex">
            <UiRadio
                id="mode1"
                name="mode"
                :value="UiListMode.UNORDERED"
                :mode="UiRadioMode.BUTTON"
                :checked="mode === UiListMode.UNORDERED"
                @input="mode = $event as typeof mode"
            >
                Marked
            </UiRadio>

            <UiRadio
                id="mode2"
                name="mode"
                :value="UiListMode.ORDERED"
                :mode="UiRadioMode.BUTTON"
                :checked="mode === UiListMode.ORDERED"
                @input="mode = $event as typeof mode"
            >
                Numerated
            </UiRadio>
        </div>

        <div class="demo-list__row d-flex flex-column">
            <UiList :mode="mode">
                <UiListItem
                    v-for="item in 12"
                    :key="item"
                >
                    Item №{{ item }}
                </UiListItem>
            </UiList>
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import { UiListMode } from '~/components/types/ui-list'
import { UiRadioMode } from '~/components/types/ui-radio'
import UiList from '~/components/UiList.vue'
import UiListItem from '~/components/UiListItem.vue'
import UiRadio from '~/components/UiRadio.vue'

const mode = ref<UiListMode>(UiListMode.UNORDERED)
</script>

<style lang="scss" scoped>
.demo-list {
    &__row {
        margin-top: 2rem;
    }

    &__mode {
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
}
</style>
