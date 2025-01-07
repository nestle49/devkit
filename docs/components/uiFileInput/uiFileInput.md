# UiFileInput

File input component

| Prop          | Description                  | Accepted Values                                                        | Type               | Default                            | Required |
| :------------ | :--------------------------- | :--------------------------------------------------------------------- | :----------------- | :--------------------------------- | :------- |
| `id`          | Unique id element            | -                                                                      | `string`           | -                                  | `false`  |
| `value`       | Incoming files array         | -                                                                      | `File[]` or `null` | `null`                             | `false`  |
| `maxFiles`    | Max files count              | `integer`                                                              | `number`           | `10`                               | `false`  |
| `isMultiple`  | Ability multiple downloading | `true` or `false`                                                      | `boolean`          | `false`                            | `false`  |
| `placeholder` | Placeholder text             | -                                                                      | `string`           | -                                  | `false`  |
| `disabled`    | Text field disabled          | `true` or `false`                                                      | `boolean`          | `false`                            | `false`  |
| `isError`     | Text field has error         | `true` or `false`                                                      | `boolean`          | `false`                            | `false`  |
| `accept`      | Possible file types          | -                                                                      | `string`           | `image/jpeg, image/jpg, image/png` | `false`  |
| `transparent` | Transparent background       | `true` or `false`                                                      | `boolean`          | `false`                            | `false`  |
| `size`        | Size of text field           | `UiTextFieldSize.LARGE, UiTextFieldSize.MEDIUM, UiTextFieldSize.SMALL` | `UiTextFieldSize`  | `UiTextFieldSize.LARGE`            | `false`  |

| Emit    | Description                     | Parameters | Type of returned val |
| :------ | :------------------------------ | :--------- | :------------------- |
| `input` | Triggered on change input value | `$event`   | `File[]` or `null`   |

| Slot          | Description  |
| :------------ | :----------- |
| `default`     | Prepend icon |
| `append-icon` | Append icon  |

<DemoUiFileInput />

<script setup>
import DemoUiFileInput from '~/components/demo/DemoUiFileInput.vue';
</script>

@[code](~/components/demo/DemoUiFileInput.vue)
