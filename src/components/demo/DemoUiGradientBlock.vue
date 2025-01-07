<template>
    <DemoWrapper>
        <h2>Ui Gradient</h2>

        <div class="demo-checkboxes d-flex flex-column mb-15">
            <div
                v-for="(variable, name) in variables"
                :key="name"
            >
                <UiCheckbox
                    :id="name"
                    :value="variable.value"
                    @input="variable.value = $event"
                >
                    <pre>{{ name }}: {{ variable.value ? variable.titles.isTrue : variable.titles.isFalse }}</pre>
                </UiCheckbox>
            </div>
        </div>

        <UiGradient
            color="var(--content-background)"
            size="75px"
            :is-clickable="variables.isClickable.value"
            :is-only-before="variables.isOnlyBefore.value"
            :is-only-after="variables.isOnlyAfter.value"
        >
            <UiScroll :max-height="250">
                <div class="content-background px-20 py-20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus
                    ac consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                    auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur,
                    augue at ornare feugiat, ex elit semper sapien, id viverra dolor arcu id erat. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac consectetur eros. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui auctor, condimentum elit sit amet,
                    blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur, augue at ornare feugiat, ex elit
                    semper sapien, id viverra dolor arcu id erat.
                </div>
            </UiScroll>
        </UiGradient>

        <br />

        <UiGradient
            color="var(--content-background)"
            size="75px"
            :is-clickable="variables.isClickable.value"
            :is-only-before="variables.isOnlyBefore.value"
            :is-only-after="variables.isOnlyAfter.value"
        >
            <UiScroll
                draggable
                :max-width="2000"
                top
            >
                <div class="content-background px-20 py-20 horizontal-text-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus
                    ac consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                    auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus.
                </div>
            </UiScroll>
        </UiGradient>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiGradient from '~/components/UiGradient/UiGradient.vue'
import UiScroll from '~/components/UiScroll.vue'

const variables = ref({
    isClickable: { value: false, titles: { isTrue: true, isFalse: false } },
    isOnlyBefore: { value: false, titles: { isTrue: true, isFalse: false } },
    isOnlyAfter: { value: false, titles: { isTrue: true, isFalse: false } }
})
</script>

<style scoped>
.demo-wrapper {
    --content-background: #fff;
}

.demo-checkboxes {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
}

.content-background {
    background: var(--content-background);
}

.horizontal-text-content {
    min-width: 3000px;
}
</style>
