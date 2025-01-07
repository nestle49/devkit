# UiAlert

| Prop          | Description                                      | Type          | Default               | Required |
| :------------ | :----------------------------------------------- | :------------ | :-------------------- | :------- |
| `mode`        | Alert mode which define color of text/background | `UiAlertMode` | `UiAlertMode.PRIMARY` | `false`  |
| `closeButton` | –                                                | `boolena`     | `false`               | `false`  |

| Emit    | Description                     | Parameters | Type of returned val |
| :------ | :------------------------------ | :--------- | :------------------- |
| `close` | Triggered on close button click | -          | `void`               |

| Slot      | Description   |
| :-------- | :------------ |
| `default` | Alert content |
| `title`   | -             |
| `footer`  | -             |

<DemoUiAlert />

<script setup>
import DemoUiAlert from '~/components/demo/DemoUiAlert.vue';
</script>

@[code](~/components/demo/DemoUiAlert.vue)
