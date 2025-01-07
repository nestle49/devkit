import type { UiPhoneFormat } from '~/components/types/ui-textfield-phone-mask/phone-format'

export interface Emits {
    (event: 'update:searchQuery', val: string): void
    (event: 'change-phone', phone: string): void
    (event: 'change-mask', format: UiPhoneFormat): void
    (event: 'reset-phone'): void
}
