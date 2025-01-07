import type { UiId } from 'components/types/ui-textfield-phone-mask'

interface UiPhoneFormatCountry {
    /** @example '+7' */
    code: string
    /** Injecting on client side */
    translationKey?: string

    flag: string

    name: string
}

export interface UiPhoneFormat {
    id: UiId
    country: UiPhoneFormatCountry
    /** @example '+7 (___) ___-__-__' */
    mask: string
    regex: string
    newMask?: string
    defaultMask?: string
}
