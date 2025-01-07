<template>
    <DemoWrapper>
        <h2>Ui Breadcrumbs</h2>
        <div>
            <h3>Link</h3>
            <UiBreadcrumbs :items="items" />
        </div>

        <div>
            <h3>Change item with slot</h3>
            <UiBreadcrumbs :items="items">
                <template #default="item">
                    <span>{{ item.title }}</span>
                </template>
            </UiBreadcrumbs>
        </div>

        <div>
            <h3>Changed divider</h3>
            <UiBreadcrumbs
                :items="items"
                divider="-"
            />
        </div>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import type { UiBreadcrumbItem } from '~/components/types/ui-breadcrumbs'
import UiBreadcrumbs from '~/components/UiBreadcrumbs.vue'

const items: UiBreadcrumbItem[] = [
    {
        title: 'Link 1',
        to: '/'
    },
    {
        title: 'Link 2',
        to: '/'
    },
    {
        title: 'Link 3',
        to: '/'
    }
]
</script>
