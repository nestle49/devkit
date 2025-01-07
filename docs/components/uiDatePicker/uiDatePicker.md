# UiDatePicker

| Prop          | Description                            | Type              | Default                                              | Required |
| :------------ | :------------------------------------- | :---------------- | :--------------------------------------------------- | :------- |
| `modelValue`  | The v-model value of the component     | `Dayjs`           | `undefined`                                          | `false`  |
| `startDate`   | Minimum available value of date        | `Dayjs`           | `dayjs().tz().subtract(100, 'years').startOf('day')` | `false`  |
| `endDate`     | Maximum available value of date        | `Dayjs`           | `dayjs().tz().endOf('day')`                          | `false`  |
| `disabled`    | Disable picker                         | `boolean`         | `false`                                              | `false`  |
| `timezone`    | -                                      | `string`          | `Europe/Moscow`                                      | `false`  |
| `locale`      | -                                      | `string`          | `ru`                                                 | `false`  |
| `format`      | -                                      | `string`          | `DD / MM / YYYY`                                     | `false`  |
| `placeholder` | -                                      | `string`          | `undefined`                                          | `false`  |
| `independent` | Display picker without trigger element | `boolean`         | `false`                                              | `false`  |
| `transparent` | Transparent background                 | `boolean`         | `false`                                              | `false`  |
| `size`        | Size of text field                     | `UiTextFieldSize` | `UiTextFieldSize.LARGE`                              | `false`  |
| `right`       | Alignment popover                      | `boolean`         | `false`                                              | `false`  |

| Slot      | Description                                             |
| :-------- | :------------------------------------------------------ |
| `trigger` | Trigger element to display picker. TextField by default |

<DemoUiDatePicker style="max-width: 450px;" />

<script setup>
import DemoUiDatePicker from '~/components/demo/DemoUiDatePicker.vue';
</script>

@[code](~/components/demo/DemoUiDatePicker.vue)
