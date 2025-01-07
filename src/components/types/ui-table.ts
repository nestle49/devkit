import type { UseOffsetPaginationReturn } from '@vueuse/core'
import type { UnwrapNestedRefs } from 'vue'

export type TableItem = Record<string, unknown>

export interface TableHeader {
    key: string
    title?: string
    width?: number | `${number}%`
    [key: string]: unknown
}

export type TableOnPageChangeParams = UnwrapNestedRefs<UseOffsetPaginationReturn>

export enum UiDataTableRowColor {
    DANGER = 'danger',
    SUCCESS = 'success',
    WARN = 'warn'
}

export interface UiRowColor {
    index: number
    color?: UiDataTableRowColor
}
