# UiTextArea

| Prop          | Description              | Accepted Values   | Type      | Default | Required |
| :------------ | :----------------------- | :---------------- | :-------- | :------ | :------- |
| `id`          | Unique id element        | -                 | `string`  | -       | `false`  |
| `placeholder` | Placeholder text         | -                 | `string`  | -       | `false`  |
| `value`       | Incoming value           | -                 | `string`  | -       | `false`  |
| `disabled`    | Text field disabled      | `true` or `false` | `boolean` | `false` | `false`  |
| `isError`     | Text field has error     | `true` or `false` | `boolean` | `false` | `false`  |
| `transparent` | Transparent background   | `true` or `false` | `boolean` | `false` | `false`  |
| `maxLength`   | Max amount of charaсters | -                 | `number`  | `200`   | `false`  |
| `height`      | Height in pixels         | -                 | `number`  | `150`   | `false`  |

| Emit    | Description                         | Parameters | Type of returned val |
| :------ | :---------------------------------- | :--------- | :------------------- |
| `input` | Triggered on change text area value | `$event`   | `string`             |

| Slot      | Description       |
| :-------- | :---------------- |
| `default` | Prepend icon slot |

<DemoUiTextArea />

<script setup>
import DemoUiTextArea from '~/components/demo/DemoUiTextArea.vue';
</script>

@[code](~/components/demo/DemoUiTextArea.vue)
