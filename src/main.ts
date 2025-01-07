import '~/assets/main.scss'

import { UiAlertMode } from '~/components/types/ui-alert'
import type { UiBreadcrumbItem } from '~/components/types/ui-breadcrumbs'
import { UiButtonColorMode, UiButtonSize, UiButtonType } from '~/components/types/ui-button'
import type { UiCountChangeType } from '~/components/types/ui-count'
import { UiCountMode } from '~/components/types/ui-count'
import { UiDropdownMode } from '~/components/types/ui-dropdown'
import type { UiHeadingRange } from '~/components/types/ui-heading'
import { UiTextFieldMode, UiTextFieldSize, UiTextFieldType } from '~/components/types/ui-input'
import { UiListMode } from '~/components/types/ui-list'
import { UiPopoverAlignment, UiPopoverMode, UiPopoverTrigger } from '~/components/types/ui-popover'
import { UiRadioMode } from '~/components/types/ui-radio'
import { UiTabMode } from '~/components/types/ui-tab'
import {
    type TableHeader,
    type TableItem,
    type TableOnPageChangeParams,
    UiDataTableRowColor,
    type UiRowColor
} from '~/components/types/ui-table'
import type { UiId, UiPhoneFormat } from '~/components/types/ui-textfield-phone-mask'
import UiAlert from '~/components/UiAlert.vue'
import UiBreadcrumbs from '~/components/UiBreadcrumbs.vue'
import UiButton from '~/components/UiButton/UiButton.vue'
import { useButton } from '~/components/UiButton/useButton'
import UiCheckbox from '~/components/UiCheckbox.vue'
import UiColorPicker from '~/components/UiFields/UiColorPicker.vue'
import UiCount from '~/components/UiFields/UiCount.vue'
import UiDatePicker from '~/components/UiFields/UiDatePicker.vue'
import UiDateTimePicker from '~/components/UiFields/UiDateTimePicker.vue'
import UiDropdown from '~/components/UiFields/UiDropdown.vue'
import UiFileInput from '~/components/UiFields/UiFileInput.vue'
import UiTextArea from '~/components/UiFields/UiTextArea.vue'
import UiTextField from '~/components/UiFields/UiTextField.vue'
import UiTextFieldPhoneMask from '~/components/UiFields/UiTextFieldPhoneMask.vue'
import UiTimePicker from '~/components/UiFields/UiTimePicker.vue'
import UiGradient from '~/components/UiGradient/UiGradient.vue'
import UiHeading from '~/components/UiHeading.vue'
import UiIcon from '~/components/UiIcon.vue'
import UiList from '~/components/UiList.vue'
import UiListItem from '~/components/UiListItem.vue'
import UiModal from '~/components/UiModal.vue'
import UiPagination from '~/components/UiPagination/UiPagination.vue'
import UiPopover from '~/components/UiPopover.vue'
import UiRadio from '~/components/UiRadio.vue'
import UiRange from '~/components/UiRange.vue'
import UiRating from '~/components/UiRating.vue'
import UiScroll from '~/components/UiScroll.vue'
import UiSwitch from '~/components/UiSwitch.vue'
import UiTab from '~/components/UiTab.vue'
import UiDataTable from '~/components/UiTable/UiDataTable.vue'
import UiTable from '~/components/UiTable/UiTable.vue'
import UiTransitionExpand from '~/components/UiTransitionExpand.vue'
import UiUnderline from '~/components/UiUnderline.vue'
import { colorToRgbaMatrix } from '~/utils/colorHelper'

export type {
    TableHeader,
    TableItem,
    TableOnPageChangeParams,
    UiBreadcrumbItem,
    UiCountChangeType,
    UiHeadingRange,
    UiId,
    UiPhoneFormat,
    UiRowColor
}
export {
    colorToRgbaMatrix,
    UiAlert,
    UiAlertMode,
    UiBreadcrumbs,
    UiButton,
    UiButtonColorMode,
    UiButtonSize,
    UiButtonType,
    UiCheckbox,
    UiColorPicker,
    UiCount,
    UiCountMode,
    UiDataTable,
    UiDataTableRowColor,
    UiDatePicker,
    UiDateTimePicker,
    UiDropdown,
    UiDropdownMode,
    UiFileInput,
    UiGradient,
    UiHeading,
    UiIcon,
    UiList,
    UiListItem,
    UiListMode,
    UiModal,
    UiPagination,
    UiPopover,
    UiPopoverAlignment,
    UiPopoverMode,
    UiPopoverTrigger,
    UiRadio,
    UiRadioMode,
    UiRange,
    UiRating,
    UiScroll,
    UiSwitch,
    UiTab,
    UiTable,
    UiTabMode,
    UiTextArea,
    UiTextField,
    UiTextFieldMode,
    UiTextFieldPhoneMask,
    UiTextFieldSize,
    UiTextFieldType,
    UiTimePicker,
    UiTransitionExpand,
    UiUnderline,
    useButton
}
