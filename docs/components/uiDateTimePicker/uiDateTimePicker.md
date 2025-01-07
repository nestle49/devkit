# UiDateTimePicker

| Prop                 | Description                            | Type                | Default                              | Required |
| :------------------- | :------------------------------------- | :------------------ | :----------------------------------- | :------- |
| `modelValue`         | The v-model value of the component     | `Dayjs`             | `undefined`                          | `false`  |
| `placeholder`        | -                                      | `string`            | `undefined`                          | `false`  |
| `datePickerSettings` | -                                      | `UiDatePickerProps` | Same as `UiDatePicker` default props | `false`  |
| `timePickerSettings` | -                                      | `UiTimePickerProps` | Same as `UiTimePicker` default props | `false`  |
| `independent`        | Display picker without trigger element | `boolean`           | `false`                              | `false`  |

| Slot      | Description                                             |
| :-------- | :------------------------------------------------------ |
| `trigger` | Trigger element to display picker. TextField by default |

<DemoUiDateTimePicker style="max-width: 400px" />

<script setup>
import DemoUiDateTimePicker from '~/components/demo/DemoUiDateTimePicker.vue';
</script>

@[code](~/components/demo/DemoUiDateTimePicker.vue)
