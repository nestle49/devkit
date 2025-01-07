# UiSwitch

The switch component is a simple customizable switch.

| Prop       | Description       | Accepted Values   | Type      | Default | Required |
| :--------- | :---------------- | :---------------- | :-------- | :------ | :------- |
| `id`       | Unique id element | -                 | `string`  | -       | `true`   |
| `value`    | Value element     | `true` or `false` | `boolean` | `false` | `false`  |
| `disabled` | Switch disabled   | `true` or `false` | `boolean` | `false` | `false`  |
| `margin`   | Margin label      | -                 | `number`  | `7`     | `false`  |
| `wrap`     | Wrap switch text  | -                 | `boolean` | `true`  | `false`  |
| `reverse`  | Reverse switch    | -                 | `boolean` | `false` | `false`  |

| Emit    | Description                  | Parameters | Type of returned val |
| :------ | :--------------------------- | :--------- | :------------------- |
| `input` | Triggered on change switcher | `$event`   | `boolean`            |

| Slot      | Description |
| :-------- | :---------- |
| `default` | Label text  |

<DemoUiSwitch />

<script setup>
import DemoUiSwitch from '~/components/demo/DemoUiSwitch.vue';
</script>

@[code](~/components/demo/DemoUiSwitch.vue)
