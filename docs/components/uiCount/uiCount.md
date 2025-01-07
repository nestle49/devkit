# UiCount

The ui-count component is an input with type="number" and buttons for decrease and increase value

| Prop          | Description                  | Accepted Values                               | Type           | Default               | Required |
| :------------ | :--------------------------- | :-------------------------------------------- | :------------- | :-------------------- | :------- |
| `value`       | value                        | integer                                       | `number?`      | `1`                   | `false`  |
| `min`         | minimum value                | integer                                       | `number?`      | `1`                   | `false`  |
| `max`         | maximum value                | integer                                       | `number?`      | `999`                 | `true`   |
| `step`        | step between possible values | integer                                       | `number?`      | `1`                   | `false`  |
| `disabled`    | Button disabled              | `true` or `false`                             | `boolean?`     | `false`               | `false`  |
| `transparent` | Background transparent       | `true` or `false`                             | `boolean?`     | `false`               | `false`  |
| `mode`        | Type count button            | `UiCountMode.DEFAULT` or `UiCountMode.BUTTON` | `UiCountMode?` | `UiCountMode.DEFAULT` | `false`  |
| `placeholder` | Placeholder value            | -                                             | `string?`      | `0`                   | `false`  |

| Emit     | Description               | Parameters                                 |
| :------- | :------------------------ | :----------------------------------------- |
| `change` | Triggered on change value | `value: number`, `type: UiCountChangeType` |

<DemoUiCount />

<script setup>
import DemoUiCount from '~/components/demo/DemoUiCount.vue';
</script>

@[code](~/components/demo/DemoUiCount.vue)
