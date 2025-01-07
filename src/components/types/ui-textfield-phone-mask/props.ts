import type { CSSProperties } from 'vue'

import type { UiFieldProps, UiTextFieldSize } from '~/components/types/ui-input'
import type { UiPhoneFormat } from '~/components/types/ui-textfield-phone-mask/phone-format'

export interface Props extends UiFieldProps {
    size?: UiTextFieldSize
    flagSize?: CSSProperties['font-size']
    phone: string
    searchQuery?: string
    transparent?: boolean
    searchPlaceholder?: string
    formats: UiPhoneFormat[]
    phoneLabel: (e: UiPhoneFormat) => string
    selectedPhoneFormat?: UiPhoneFormat
    autofocus?: boolean
}
