# UiRadio

The ui-radio component is a simple way to choose only one of set elements.

| Prop          | Description            | Accepted Values                               | Type          | Default               | Required |
| :------------ | :--------------------- | :-------------------------------------------- | :------------ | :-------------------- | :------- |
| `id`          | Unique id element      | -                                             | `string`      | -                     | `true`   |
| `name`        | Unique id group        | -                                             | `string?`     | `undefined`           | `false`  |
| `value`       | Value option           | -                                             | `string`      | `undefined`           | `true`   |
| `checked`     | Radio checked          | `true` or `false`                             | `boolean`     | `false`               | `false`  |
| `disabled`    | Radio disabled         | `true` or `false`                             | `boolean`     | `false`               | `false`  |
| `mode`        | Type radio button      | `UiRadioMode.DEFAULT` or `UiRadioMode.BUTTON` | `UiRadioMode` | `UiRadioMode.DEFAULT` | `false`  |
| `transparent` | Transparent background | `true` or `false`                             | `boolean`     | `false`               | `false`  |
| `wrap`        | Wrap checkbox text     | -                                             | `boolean`     | `0`                   | `true`   |

| Emit    | Description                   | Parameters | Type of returned val |
| :------ | :---------------------------- | :--------- | :------------------- |
| `input` | Triggered on activated option | `$event`   | `string`             |

| Slot      | Description |
| :-------- | :---------- |
| `default` | Label text  |

<DemoUiRadio />

<script setup>
import DemoUiRadio from '~/components/demo/DemoUiRadio.vue';
</script>

@[code](~/components/demo/DemoUiRadio.vue)
