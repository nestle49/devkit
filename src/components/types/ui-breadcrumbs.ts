import type { RouteLocationRaw } from 'vue-router'

export interface UiBreadcrumbItem {
    title: string
    to?: RouteLocationRaw
    [key: string]: unknown
}
