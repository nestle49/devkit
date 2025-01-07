<template>
    <DemoWrapper>
        <h2>Headings</h2>

        <UiHeading
            v-for="heading in headings"
            :key="heading.level"
            :level="heading.level"
        >
            H{{ heading.level }}, Montserrat, SemiBold, {{ heading.fontSize }}
        </UiHeading>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import type { UiHeadingRange } from '~/components/types/ui-heading'
import UiHeading from '~/components/UiHeading.vue'

const headings: { level: UiHeadingRange; fontSize: string }[] = [
    { level: 1, fontSize: '35px' },
    { level: 2, fontSize: '30px' },
    { level: 3, fontSize: '25px' },
    { level: 4, fontSize: '20px' },
    { level: 5, fontSize: '18px' },
    { level: 6, fontSize: '16px' }
]
</script>
