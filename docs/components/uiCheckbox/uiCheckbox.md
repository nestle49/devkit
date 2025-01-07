# UiCheckbox

The checkbox component is a simple customizable checkbox.

| Prop            | Description                        | Accepted Values   | Type      | Default | Required |
| :-------------- | :--------------------------------- | :---------------- | :-------- | :------ | :------- |
| `id`            | Unique id element                  | -                 | `string`  | -       | `true`   |
| `value`         | Value element                      | `true` or `false` | `boolean` | `false` | `false`  |
| `disabled`      | Checkbox disabled                  | `true` or `false` | `boolean` | `false` | `false`  |
| `extended`      | Extended label by 100% width       | `true` or `false` | `boolean` | `false` | `false`  |
| `paddingTop`    | Padding top label padding          | -                 | `number`  | `0`     | `false`  |
| `paddingRight`  | Padding right label padding        | -                 | `number`  | `0`     | `false`  |
| `paddingBottom` | Padding bottom label padding       | -                 | `number`  | `0`     | `false`  |
| `paddingLeft`   | Padding left label padding         | -                 | `number`  | `0`     | `false`  |
| `wrap`          | Wrap checkbox text                 | -                 | `boolean` | `0`     | `true`   |
| `centered`      | Align label elements in the center | -                 | `boolean` | `0`     | `true`   |

| Emit    | Description                  | Parameters | Type of returned val |
| :------ | :--------------------------- | :--------- | :------------------- |
| `input` | Triggered on change checkbox | `$event`   | `boolean`            |

| Slot      | Description |
| :-------- | :---------- |
| `default` | Label text  |

<DemoUiCheckbox />

<script setup>
import DemoUiCheckbox from '~/components/demo/DemoUiCheckbox.vue';
</script>

@[code](~/components/demo/DemoUiCheckbox.vue)
