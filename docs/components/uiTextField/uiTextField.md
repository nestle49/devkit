# UiTextField

The text field with types: text, email, tel

| Prop                  | Description                        | Accepted Values                                                                                      | Type                  | Default                 | Required |
| :-------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------- | :---------------------- | :------- |
| `id`                  | Unique id element                  | -                                                                                                    | `string`              | -                       | `false`  |
| `mode`                | Mode of text field                 | `UiTextFieldMode.TEXT`, `UiTextFieldMode.DROPDOWN`, `UiTextFieldMode.FILE`, `UiTextFieldMode.SEARCH` | `UiTextFieldMode`     | `UiTextFieldMode.TEXT`  | `false`  |
| `size`                | Size of text field                 | `UiTextFieldSize.LARGE`, `UiTextFieldSize.MEDIUM`, `UiTextFieldSize.SMALL`                           | `UiTextFieldSize`     | `UiTextFieldSize.LARGE` | `false`  |
| `type`                | Type of text field                 | `UiTextFieldType.TEXT`, `UiTextFieldType.TEL`, `UiTextFieldType.EMAIL`                               | `UiTextFieldType`     | `UiTextFieldType.TEXT`  | `false`  |
| `placeholder`         | Placeholder text                   | -                                                                                                    | `string`              | -                       | `false`  |
| `value`               | Incoming value                     | -                                                                                                    | `string`              | -                       | `false`  |
| `disabled`            | Text field disabled                | `true` or `false`                                                                                    | `boolean`             | `false`                 | `false`  |
| `applyDisabledStyles` | Is apply styles for disabled       | `true` or `false`                                                                                    | `boolean`             | `true`                  | `false`  |
| `clearable`           | Text field clearable               | `true` or `false`                                                                                    | `boolean`             | `true`                  | `false`  |
| `error`               | Text field has error               | `true` or `false`                                                                                    | `boolean`             | `false`                 | `false`  |
| `transparent`         | Transparent background             | `true` or `false`                                                                                    | `boolean`             | `false`                 | `false`  |
| `ariaLabel`           | Aria label for append button       | -                                                                                                    | `string`              | -                       | `false`  |
| `mask`                | Mask parameters                    | -                                                                                                    | `string`              | -                       | `false`  |
| `inputAttrs`          | Input component attrs              | InputHTMLAttributes                                                                                  | `InputHTMLAttributes` | `() => {}`              | `false`  |
| `loading`             | Display circle loader              | `true` or `false`                                                                                    | `boolean`             | `false`                 | `false`  |
| `appendPointerEvents` | CSS pointer-events rule for append | `auto` or `none`                                                                                     | `auto` or `none`      | `auto`                  | `false`  |
| `autofocus`           | Set autofocus on mounted           | -                                                                                                    | `boolean`             | `false`                 | `false`  |
| `maxWidth`            | Max width in pixels                | -                                                                                                    | `number?`             | `undefined`             | `false`  |

| Emit           | Description                      | Parameters | Type of returned val |
| :------------- | :------------------------------- | :--------- | :------------------- |
| `input`        | Triggered on change input value  | `$event`   | `string`             |
| `click-append` | Triggered on click append-button | `$event`   | `void`               |

| Slot           | Description  |
| :------------- | :----------- |
| `prepend-icon` | Prepend icon |
| `append-icon`  | Append icon  |

<DemoUiTextField />

<script setup>
import DemoUiTextField from '~/components/demo/DemoUiTextField.vue';
</script>

@[code](~/components/demo/DemoUiTextField.vue)
