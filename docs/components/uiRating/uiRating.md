# UiRating

| Prop       | Description    | Accepted Values   | Type      | Default | Required |
| :--------- | :------------- | :---------------- | :-------- | :------ | :------- |
| `score`    | Rating score   | -                 | `number`  | -       | `true`   |
| `readonly` | Disable status | `true` or `false` | `boolean` | `false` | `false`  |

| Emit     | Description         | Parameters | Type of returned val |
| :------- | :------------------ | :--------- | :------------------- |
| `change` | Triggered on change | `$event`   | `number`             |

<DemoUiRating />

<script setup>
import DemoUiRating from '~/components/demo/DemoUiRating.vue';
</script>

@[code](~/components/demo/DemoUiRating.vue)
