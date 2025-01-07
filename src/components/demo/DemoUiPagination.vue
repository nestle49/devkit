<template>
    <DemoWrapper>
        <h2>Ui Pagination</h2>
        <pre>Active Page: {{ activePage }}</pre>
        <pre>Active Page (last): {{ activePageSmall }}</pre>

        <h3>Medium</h3>

        <div class="mb-20">
            <UiPagination
                :is-small="false"
                :active-page="activePage"
                :count="150"
                :page-size="10"
                @change-page="activePage = $event"
            />
        </div>

        <h3>Small</h3>

        <div class="mb-20">
            <UiPagination
                is-small
                :active-page="activePage"
                :count="150"
                :page-size="10"
                @change-page="activePage = $event"
            />
        </div>

        <h3>Adaptive</h3>

        <div class="mb-20">
            <UiPagination
                :active-page="activePage"
                :count="150"
                :page-size="10"
                @change-page="activePage = $event"
            />
        </div>

        <div class="mb-20">
            <UiPagination
                :active-page="activePageSmall"
                :count="70"
                :page-size="10"
                @change-page="activePageSmall = $event"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiPagination from '~/components/UiPagination/UiPagination.vue'

const activePage = ref(1)
const activePageSmall = ref(1)
</script>
