# UiBreadcrumbs

| Prop      | Description                      | Accepted Values | Type                 | Default | Required |
| :-------- | :------------------------------- | :-------------- | :------------------- | :------ | :------- |
| `items`   | List of links inside breadcrumbs | -               | `UiBreadcrumbItem[]` | -       | `true`   |
| `divider` | Divider between items            | -               | `string`             | `/`     | `false`  |

| Slot      | Description                                            | Binding value / type                |
| :-------- | :----------------------------------------------------- | :---------------------------------- |
| `default` | Customize each item (e.g. for make it with RouterLink) | Each item. Type: `UiBreadcrumbItem` |

<DemoUiBreadcrumbs />

<script setup>
import DemoUiBreadcrumbs from '~/components/demo/DemoUiBreadcrumbs.vue';
</script>

@[code](~/components/demo/DemoUiBreadcrumbs.vue)
