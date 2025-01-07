<template>
    <DemoWrapper>
        <h2>Ui Scroll</h2>
        <br />

        <UiScroll :max-height="100">
            <div style="background: #fff; padding: 20px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac
                consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur,
                augue at ornare feugiat, ex elit semper sapien, id viverra dolor arcu id erat. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac consectetur eros. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui auctor, condimentum elit sit amet, blandit
                mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur, augue at ornare feugiat, ex elit semper sapien,
                id viverra dolor arcu id erat.
            </div>
        </UiScroll>

        <br />

        <UiScroll
            :max-height="100"
            :horizontal-offset="-10"
        >
            <div style="background: #fff5ca; padding: 20px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac
                consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur,
                augue at ornare feugiat, ex elit semper sapien, id viverra dolor arcu id erat. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac consectetur eros. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui auctor, condimentum elit sit amet, blandit
                mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur, augue at ornare feugiat, ex elit semper sapien,
                id viverra dolor arcu id erat.
            </div>
        </UiScroll>

        <br />

        <UiScroll
            :max-height="100"
            left
        >
            <div style="background: #fff; padding: 20px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac
                consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur,
                augue at ornare feugiat, ex elit semper sapien, id viverra dolor arcu id erat. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac consectetur eros. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui auctor, condimentum elit sit amet, blandit
                mauris. Donec a mi at est malesuada tristique euismod sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Phasellus dignissim vehicula sem ac laoreet. Vestibulum consectetur, augue at ornare feugiat, ex elit semper sapien,
                id viverra dolor arcu id erat.
            </div>
        </UiScroll>

        <br />

        <UiScroll
            :max-width="2000"
            top
        >
            <div style="background: #fff; padding: 20px; min-width: 3000px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac
                consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus.
            </div>
        </UiScroll>

        <br />

        <UiScroll
            :max-width="2000"
            draggable
        >
            <div style="background: #fff; padding: 20px; min-width: 3000px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor quam lorem, ac viverra odio fermentum eu. Vivamus ac
                consectetur eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in dui
                auctor, condimentum elit sit amet, blandit mauris. Donec a mi at est malesuada tristique euismod sit amet lectus.
            </div>
        </UiScroll>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiScroll from '~/components/UiScroll.vue'
</script>
