<template>
    <ol
        class="breadcrumbs d-flex p-0 list-style-none"
        :style="{ '--bc-divider': `'${divider}'` }"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
    >
        <li
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            class="breadcrumbs__item d-flex opacity-50"
            :class="{ last: itemIndex === items.length - 1, disabled: isDisabled(itemIndex) }"
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
        >
            <slot v-bind="item">
                <RouterLink
                    v-if="item.to && !isDisabled(itemIndex)"
                    :to="item.to"
                    itemprop="item"
                    class="text-decoration-none"
                >
                    <span
                        itemprop="name"
                        class="breadcrumbs__name"
                    >
                        {{ item.title }}
                    </span>
                </RouterLink>

                <span
                    v-else
                    itemprop="name"
                    class="breadcrumbs__name"
                >
                    {{ item.title }}
                </span>
            </slot>

            <meta
                itemprop="position"
                :content="String(itemIndex + 1)"
            />
        </li>
    </ol>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import type { UiBreadcrumbItem } from '~/components/types/ui-breadcrumbs'

interface Props {
    items: UiBreadcrumbItem[]
    divider?: string
}

const props = withDefaults(defineProps<Props>(), {
    divider: '/'
})

const isDisabled = (index: number) => props.items.length - 1 === index
</script>

<style lang="scss">
.breadcrumbs {
    $self: &;

    &__item {
        $item: &;

        &::after {
            content: var(--bc-divider);
            margin: 0 10px;
        }

        &.last {
            opacity: 1;

            &::after {
                content: '';
            }
        }

        &.disabled {
            opacity: 1;
        }
    }

    a {
        color: inherit;
    }
}
</style>
