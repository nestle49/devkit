<template>
    <DemoWrapper>
        <h2>Quote</h2>

        <UiQuote>
            <p>
                Vue.js — <a href="#">JavaScript-фреймворк</a> с открытым исходным кодом для создания пользовательских интерфейсов[4]. Легко
                интегрируется в проекты с использованием других JavaScript-библиотек. Может функционировать как веб-фреймворк для разработки
                одностраничных приложений в реактивном стиле.
            </p>
        </UiQuote>
    </DemoWrapper>
</template>

<script lang="ts" setup>
import DemoWrapper from '~/components/demo/DemoWrapper.vue'
import UiQuote from '~/components/UiQuote.vue'
</script>

<style lang="scss" scoped>
p {
    line-height: 1.8;
}
</style>
