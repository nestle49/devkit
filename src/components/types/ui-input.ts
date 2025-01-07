export enum UiTextFieldSize {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

export enum UiTextFieldMode {
    TEXT = 'text',
    DROPDOWN = 'dropdown',
    FILE = 'file',
    SEARCH = 'search'
}

export enum UiTextFieldType {
    TEXT = 'text',
    TEL = 'tel',
    EMAIL = 'email',
    PASSWORD = 'password'
}

export interface UiFieldProps {
    id?: string
    placeholder?: string
    label?: string
    ariaLabel?: string
    required?: boolean
    disabled?: boolean
}
