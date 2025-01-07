# UiTab

| Prop       | Description           | Accepted Values   | Type        | Default             | Required |
| :--------- | :-------------------- | :---------------- | :---------- | :------------------ | :------- |
| `mode`     | Display mode          | -                 | `UiTabMode` | `UiTabMode.DEFAULT` | `false`  |
| `active`   | Is current tab active | `true` or `false` | `boolean`   | `false`             | `false`  |
| `disabled` | Tab disabled          | `true` or `false` | `boolean`   | `false`             | `false`  |
| `last`     | Is last tab           | `true` or `false` | `boolean`   | `false`             | `false`  |

| Slot      | Description   |
| :-------- | :------------ |
| `default` | Label for tab |

<DemoUiTab />

<script setup>
import DemoUiTab from '~/components/demo/DemoUiTab.vue';
</script>

@[code](~/components/demo/DemoUiTab.vue)
