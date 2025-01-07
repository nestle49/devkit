# UiTimePicker

| Prop          | Description                               | Type      | Default                      | Required |
| :------------ | :---------------------------------------- | :-------- | :--------------------------- | :------- |
| `modelValue`  | The v-model value of the component        | `ITime`   | `undefined`                  | `false`  |
| `startTime`   | Minimum available value of time           | `ITime`   | `{ hours: 0, minutes: 0 }`   | `false`  |
| `endTime`     | Maximum available value of time           | `ITime`   | `{ hours: 23, minutes: 59 }` | `false`  |
| `minutesStep` | Step in minutes between values            | `number`  | `5`                          | `false`  |
| `placeholder` | Textfield placeholder if nothing selected | `string`  | `undefined`                  | `false`  |
| `disabled`    | Disable picker                            | `boolean` | `false`                      | `false`  |
| `independent` | Display picker without trigger element    | `boolean` | `false`                      | `false`  |
| `transparent` | Transparent background                    | `boolean` | `false`                      | `false`  |

| Slot      | Description                                             |
| :-------- | :------------------------------------------------------ |
| `trigger` | Trigger element to display picker. TextField by default |

<DemoUiTimePicker style="max-width: 300px;" />

<script setup>
import DemoUiTimePicker from '~/components/demo/DemoUiTimePicker.vue';
</script>

@[code](~/components/demo/DemoUiTimePicker.vue)
