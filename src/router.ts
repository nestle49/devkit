import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{ name: 'Home', path: '/', component: App as Component }]
})

export default router
