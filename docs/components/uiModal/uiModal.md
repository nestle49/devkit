# UiModal

The ui-modal component is a way to show content with modal window on overlay

| Prop                  | Description                                     | Type                        | Default  | Required |
| :-------------------- | :---------------------------------------------- | :-------------------------- | :------- | :------- |
| `maxWidth`            | Max width modal in px                           | `number`                    | `1080`   | `false`  |
| `maxHeight`           | Max height modal                                | `string`                    | `100vh`  | `false`  |
| `padding`             | Padding                                         | `number`                    | `40`     | `false`  |
| `paddingContent`      | Padding content                                 | `number`                    | `0`      | `false`  |
| `closeButton`         | Display close button                            | `boolean`                   | `true`   | `false`  |
| `closeByClickOutside` | Close modal by click outside                    | `boolean`                   | `true`   | `false`  |
| `closeByEsc`          | Close modal by escape                           | `boolean`                   | `true`   | `false`  |
| `buttonColumns`       | Number of columns for `buttons` slot            | `number`                    | `1`      | `false`  |
| `buttonGap`           | Number of gap between buttons in `buttons` slot | `number`                    | `20`     | `false`  |
| `contentOverflow`     | Overflow for content inside modal               | `CSSProperties['overflow']` | `scroll` | `false`  |

| Emit          | Description              | Parameters | Type of returned val |
| :------------ | :----------------------- | :--------- | :------------------- |
| `close-modal` | Triggered on close modal | -          | `void`               |

| Slot      | Description           |
| :-------- | :-------------------- |
| `default` | Modal content         |
| `header`  | Modal header content  |
| `image`   | Modal image content   |
| `buttons` | Modal buttons content |

<DemoUiModal />

<script setup>
import DemoUiModal from '~/components/demo/DemoUiModal.vue';
</script>

@[code](~/components/demo/DemoUiModal.vue)
