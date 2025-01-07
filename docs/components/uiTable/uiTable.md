# UiTable

| Prop       | Description                | Type          | Default     | Required |
| :--------- | :------------------------- | :------------ | :---------- | :------- |
| `items`    | Array of items             | `TableItem[]` | `() => []`  | `false`  |
| `pageSize` | Count elements by per page | `number`      | `10`        | `false`  |
| `maxWidth` | Max width table in pixels  | `number?`     | `undefined` | `false`  |
| `centered` | Centered cells content     | `boolean`     | `true`      | `false`  |

| Slot             | Description          |
| :--------------- | :------------------- |
| `header(${key})` | Modal content        |
| `cell(${key})`   | Modal header content |

<DemoUiTable />

<script setup>
import DemoUiTable from '~/components/demo/DemoUiTable.vue';
</script>

@[code](~/components/demo/DemoUiTable.vue)
