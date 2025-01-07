# UiColorPicker

The color picker is a component that allow to choose color from palette

| Prop          | Description                   | Accepted Values                                                            | Type                             | Default                 | Required |
| :------------ | :---------------------------- | :------------------------------------------------------------------------- | :------------------------------- | :---------------------- | :------- |
| `id`          | Unique id element             | -                                                                          | `string`                         | -                       | `true`   |
| `placeholder` | Placeholder text              | -                                                                          | `string`                         | -                       | `false`  |
| `size`        | Size of text field            | `UiTextFieldSize.LARGE`, `UiTextFieldSize.MEDIUM`, `UiTextFieldSize.SMALL` | `UiTextFieldSize`                | `UiTextFieldSize.LARGE` | `false`  |
| `disabled`    | Dropdown disabled             | `true` or `false`                                                          | `boolean`                        | `false`                 | `false`  |
| `palette`     | Array of hex colors           | -                                                                          | `string[]`                       | `[]`                    | `false`  |
| `transparent` | Transparent background        | `true` or `false`                                                          | `boolean`                        | `false`                 | `false`  |
| `inputAttrs`  | Input component attrs         | InputHTMLAttributes                                                        | `InputHTMLAttributes`            | `() => {}`              | `false`  |
| `value`       | Active item for single select | `number` or `object` or `string`                                           | `number` or `object` or `string` | ``                      | `false`  |

| Emit    | Description               | Parameters | Type of returned val |
| :------ | :------------------------ | :--------- | :------------------- |
| `input` | Triggered on change color | `$event`   | `string`             |

<DemoUiColorPicker />

<script setup>
import DemoUiColorPicker from '~/components/demo/DemoUiColorPicker.vue';
</script>

@[code](~/components/demo/DemoUiColorPicker.vue)
