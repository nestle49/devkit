# UiDropdown

The ui-dropdown is a component that allow return indexes array of selected items

| Prop                  | Description                     | Accepted Values                                                            | Type                                                    | Default                 | Required |
| :-------------------- | :------------------------------ | :------------------------------------------------------------------------- | :------------------------------------------------------ | :---------------------- | :------- |
| `id`                  | Unique id element               | -                                                                          | `string`                                                | -                       | `true`   |
| `placeholder`         | Placeholder text                | -                                                                          | `string`                                                | -                       | `false`  |
| `size`                | Size of text field              | `UiTextFieldSize.LARGE`, `UiTextFieldSize.MEDIUM`, `UiTextFieldSize.SMALL` | `UiTextFieldSize`                                       | `UiTextFieldSize.LARGE` | `false`  |
| `disabled`            | Dropdown disabled               | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `applyDisabledStyles` | Is apply styles for disabled    | `true` or `false`                                                          | `boolean`                                               | `true`                  | `false`  |
| `multiple`            | Can be multiple selected        | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `items`               | Incoming array of elements      | -                                                                          | `TextFieldItem[]`                                       | `[]`                    | `false`  |
| `selectValue`         | Callback for calc selectValue   | -                                                                          | `((val: TextFieldItem) => string or undefined) or null` | `null`                  | `false`  |
| `selectLabel`         | Callback for calc label value   | -                                                                          | `(i: TextFieldItem) => unknown`                         | `() => ''`              | `false`  |
| `button`              | Change UiTextField on UiButton  | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `mode`                | Mode of UiDropdown              | `UiDropdownMode.SELECT`, `UiDropdownMode.CHIPS`                            | `UiDropdownMode`                                        | `UiDropdownMode.SELECT` | `false`  |
| `right`               | Display right dropdown          | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `centered`            | Centered text dropdown items    | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `divider`             | Dropdown items has divider      | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `maxHeight`           | Max height dropdown in px       | -                                                                          | `number?`                                               | `undefined`             | `false`  |
| `minWidth`            | Min width dropdown in px        | -                                                                          | `number?`                                               | `230`                   | `false`  |
| `maxWidth`            | Max width dropdown in px        | -                                                                          | `number?`                                               | `undefined`             | `false`  |
| `activeIndexes`       | Array of selected items indexes | -                                                                          | `number[]`                                              | `[]`                    | `false`  |
| `transparent`         | Transparent background          | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `inputAttrs`          | Input component attrs           | InputHTMLAttributes                                                        | `InputHTMLAttributes`                                   | `() => {}`              | `false`  |
| `search`              | Possibility typing inside field | -                                                                          | `boolean`                                               | `false`                 | `false`  |
| `value`               | Active item for single select   | `number` or `object` or `string`                                           | `number` or `object` or `string`                        | ``                      | `false`  |
| `loading`             | Display circle loader           | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `opened`              | Flag for opened dropdown        | `true` or `false` or `null`                                                | `boolean` or `null`                                     | `null`                  | `false`  |
| `autofocus`           | Set autofocus on mounted        | -                                                                          | `boolean`                                               | `false`                 | `false`  |
| `reverse`             | Opened dropdown from top        | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `checkboxes`          | Checkboxes list view            | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |
| `closableChips`       | Display cross inside chips      | `true` or `false`                                                          | `boolean`                                               | `false`                 | `false`  |

| Emit            | Description                                 | Parameters       | Type of returned val |
| :-------------- | :------------------------------------------ | :--------------- | :------------------- |
| `input`         | Triggered on change array of selected items | `$event`         | `number[]`           |
| `search`        | Triggered on change search field            | `$event`         | `string`             |
| `update:opened` | -                                           | `value: boolean` | `void`               |

| Slot      | Description  |
| :-------- | :----------- |
| `default` | Prepend icon |
| `button`  | Text button  |

<DemoUiDropdown />

<script setup>
import DemoUiDropdown from '~/components/demo/DemoUiDropdown.vue';
</script>

@[code](~/components/demo/DemoUiDropdown.vue)
