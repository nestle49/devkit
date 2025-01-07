# UiPopover

| Prop                   | Description                                          | Type                                             | Default                  | Required |
| :--------------------- | :--------------------------------------------------- | :----------------------------------------------- | :----------------------- | :------- |
| `zIndexContent`        | Set `z-index` inline style for popover content block | `number`                                         | `10`                     | `false`  |
| `alignment`            | Set alignment position for popover content           | `UiPopoverAlignment`                             | -                        | `true`   |
| `trigger`              | Trigger event to show popover                        | `UiPopoverTrigger`                               | `UiPopoverTrigger.CLICK` | `false`  |
| `contentPadding`       | Inner padding for popover content                    | `number`                                         | `40`                     | `false`  |
| `gap`                  | Gap (px) between relative element and content        | `number`                                         | `12`                     | `false`  |
| `contentOverflow`      | Set overflow for content                             | `inherit`, `auto`, `hidden`, `scroll`, `visible` | `inherit`                | `false`  |
| `maxWidth`             | Max width (px) for popover content                   | `number`, `string`                               | `none`                   | `false`  |
| `contentBorderRadius`  |                                                      | `number`                                         | `20`                     | `false`  |
| `clickOutsideDisabled` |                                                      | `boolean`                                        | `false`                  | `false`  |
| `mode`                 | Positioning type of content                          | `UiPopoverMode`                                  | `UiPopoverMode.ABSOLUTE` | `false`  |
| `disabled`             | Prevent click on relative element (disabling)        | `boolean`                                        | `false`                  | `false`  |

| Slot       | Description                                               |
| :--------- | :-------------------------------------------------------- |
| `relative` | Relative element to interact with to show popover content |
| `content`  | Popover content                                           |

<DemoUiPopover />

<script setup>
import DemoUiPopover from '~/components/demo/DemoUiPopover.vue';
</script>

@[code](~/components/demo/DemoUiPopover.vue)

<style>
h4 {
    padding-top: 0 !important;
}
</style>
