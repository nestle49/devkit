# UiButton

| Prop                  | Description                                                                   | Type                           | Default                     | Required |
| :-------------------- | :---------------------------------------------------------------------------- | :----------------------------- | :-------------------------- | :------- |
| `type`                | Custom type of button                                                         | `UiButtonType`                 | `UiButtonType.DEFAULT`      | `false`  |
| `size`                | Button size                                                                   | `UiButtonSize`                 | `UiButtonSize.MEDIUM`       | `false`  |
| `colorMode`           | Define colors for background, text, etc. Can be string of color in HEX format | `UiButtonColorMode`, `string`  | `UiButtonColorMode.PRIMARY` | `false`  |
| `nativeType`          | Native type of HTML button element                                            | `ButtonHTMLAttributes['type']` | `button`                    | `false`  |
| `disabled`            | -                                                                             | `boolean`                      | `false`                     | `false`  |
| `to`                  | URL. Automatically define is component button or link                         | `RouteLocationRaw`             | -                           | `false`  |
| `active`              | Add `active` modifier with hover-effect styles                                | `boolean`                      | `false`                     | `false`  |
| `uppercase`           | Content to upper case                                                         | `boolean`                      | `false`                     | `false`  |
| `expanded`            | Set component width to `100%`                                                 | `boolean`                      | `false`                     | `false`  |
| `loading`             | Show loader instead of content                                                | `boolean`                      | `false`                     | `false`  |
| `iconStylesPrevented` | Remove styles for append/prepend icons. Only for `UiButtonType.TEXT`          | `boolean`                      | `false`                     | `false`  |
| `external`            | Force external link if he doesn't http or https part                          | `boolean`                      | `false`                     | `false`  |
| `square`              | Remove paddings. Set equals width and height                                  | `boolean`                      | `false`                     | `false`  |
| `ariaLabel`           | Set `aria-label` for button                                                   | `string`                       | -                           | `false`  |

| Slot           | Description    |
| :------------- | :------------- |
| `default`      | Button content |
| `append-icon`  | -              |
| `prepend-icon` | -              |

# Variables to customize button color mode

| Variable name                                       | Description |
| :-------------------------------------------------- | :---------- |
| `--ui-{UiButtonColorMode}-button-main`              | -           |
| `--ui-{UiButtonColorMode}-button-main-rgb`          | -           |
| `--ui-{UiButtonColorMode}-button-main-stronger`     | -           |
| `--ui-{UiButtonColorMode}-button-main-stronger-rgb` | -           |
| `--ui-{UiButtonColorMode}-button-text`              | -           |
| `--ui-{UiButtonColorMode}-button-text-hover`        | -           |
| `--ui-{UiButtonColorMode}-button-inset-shadow-rgb`  | -           |

`UiButtonColorMode` – means value from enum. Example: `--ui-primary-button-inset-shadow-rgb`, `--ui-neutral-button-text`

<DemoUiButton />

<script setup>
import DemoUiButton from '~/components/demo/DemoUiButton.vue';
</script>

@[code](~/components/demo/DemoUiButton.vue)
