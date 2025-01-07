# UiScroll

The block to display content with custom scrollbar if overflowed.

| Prop               | Description                        | Accepted Values   | Type      | Default     | Required |
| :----------------- | :--------------------------------- | :---------------- | :-------- | :---------- | :------- |
| `maxHeight`        | maxHeight pixels                   | integer           | `number`  | `undefined` | `false`  |
| `maxWidth`         | maxWidth pixels                    | integer           | `number`  | `undefined` | `false`  |
| `left`             | vertical scrollbar display left    | `true` or `false` | `boolean` | `false`     | `false`  |
| `top`              | horizontal scrollbar display top   | `true` or `false` | `boolean` | `false`     | `false`  |
| `horizontalOffset` | offset vertical scrollbar pixels   | integer           | `number`  | `0`         | `false`  |
| `verticalOffset`   | offset horizontal scrollbar pixels | integer           | `number`  | `0`         | `false`  |
| `paddingScrollbar` | padding scrollbar pixels           | integer           | `number`  | `0`         | `false`  |
| `draggable`        | -                                  | `true` or `false` | `boolean` | `false`     | `false`  |

| Slot      | Description        |
| :-------- | :----------------- |
| `default` | Scrollable content |

<DemoUiScroll />

<script setup>
import DemoUiScroll from '~/components/demo/DemoUiScroll.vue';
</script>

@[code](~/components/demo/DemoUiScroll.vue)
