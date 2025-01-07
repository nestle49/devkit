export enum UiDropdownMode {
    SELECT = 'select',
    CHIPS = 'chips'
}

export interface UiDropdownSearch {
    type: 'inner' | 'textfield'
    placeholder?: string
}
