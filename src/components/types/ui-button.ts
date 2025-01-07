import type { ButtonHTMLAttributes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export enum UiButtonType {
    DEFAULT = 'default',
    OUTLINED = 'outlined',
    TEXT = 'text'
}

export enum UiButtonColorMode {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    NEUTRAL = 'neutral',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARN = 'warn'
}

export enum UiButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

export interface UiBaseButtonProps {
    disabled?: boolean
    nativeType?: ButtonHTMLAttributes['type']
    to?: RouteLocationRaw
    uppercase?: boolean
    square?: boolean
    expanded?: boolean
    ariaLabel?: string
    external?: boolean
}
