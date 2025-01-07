# UiPagination

The pagination is a way to display navigation by pages of data.

| Prop       | Description                              | Accepted Values | Type     | Default | Required |
| :--------- | :--------------------------------------- | :-------------- | :------- | :------ | :------- |
| `count`    | Count elements                           | integer         | `number` | `0`     | `false`  |
| `pageSize` | Count elements that displays by per page | integer         | `number` | `10`    | `false`  |

| Emit          | Description                     | Parameters | Type of returned val |
| :------------ | :------------------------------ | :--------- | :------------------- |
| `change-page` | Triggered on change active page | `$event`   | `number`             |

<DemoUiPagination />

<script setup>
import DemoUiPagination from '~/components/demo/DemoUiPagination.vue';
</script>

@[code](~/components/demo/DemoUiPagination.vue)
