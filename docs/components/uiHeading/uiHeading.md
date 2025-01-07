# UiHeading

| Prop    | Description                                                  | Accepted Values | Type             | Default | Required |
| :------ | :----------------------------------------------------------- | :-------------- | :--------------- | :------ | :------- |
| `level` | Define level tag (h1-h6)                                     | -               | `UiHeadingRange` | `2`     | `false`  |
| `mode`  | Define styling level (e.g. style heading as h3 with level 1) | -               | `UiHeadingRange` | -       | `false`  |

| Slot      | Description     |
| :-------- | :-------------- |
| `default` | Heading content |

<DemoUiHeading />

<script setup>
import DemoUiHeading from '~/components/demo/DemoUiHeading.vue';
</script>

@[code](~/components/demo/DemoUiHeading.vue)

<style>
h1, h2, h3, h4, h5, h6 {
    padding: 0;
    border: none;
}
</style>
