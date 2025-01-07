# UiList

| Prop   | Description                      | Type         | Default              | Required |
| :----- | :------------------------------- | :----------- | :------------------- | :------- |
| `mode` | Define HTML tag for list (ol/ul) | `UiListMode` | `UiListMode.ORDERED` | `false`  |

| Slot      | Description            |
| :-------- | :--------------------- |
| `default` | Pass `UiListItem` here |

# UiListItem

| Slot           | Description                     |
| :------------- | :------------------------------ |
| `default`      | Pass item content here          |
| `prepend-icon` | Prepend icon for unordered list |

<DemoUiList />

<script setup>
import DemoUiList from '~/components/demo/DemoUiList.vue';
</script>

@[code](~/components/demo/DemoUiList.vue)
