# UiRange

The ui-range component is a simple / double range slider.

| Prop         | Description                    | Accepted Values                                                | Type      | Default     | Required |
| :----------- | :----------------------------- | :------------------------------------------------------------- | :-------- | :---------- | :------- |
| `id`         | Unique id element              | -                                                              | `string`  | -           | `true`   |
| `min`        | Minimum value                  | integer                                                        | `number`  | `0`         | `false`  |
| `max`        | Maximum value                  | integer                                                        | `number`  | `10`        | `false`  |
| `step`       | Interval between legal numbers | integer                                                        | `number`  | `1`         | `false`  |
| `startValue` | Start value first thumbler     | integer, between `min` and `max`, must be a multiple of a step | `number`  | `0`         | `false`  |
| `endValue`   | Start value end thumbler       | integer, between `min` and `max`, must be a multiple of a step | `number?` | `undefined` | `false`  |

| Emit           | Description                                       | Parameters | Type of returned val |
| :------------- | :------------------------------------------------ | :--------- | :------------------- |
| `input-start`  | Triggered on input startValue                     | `$event`   | `number`             |
| `input-end`    | Triggered on input endValue                       | `$event`   | `number`             |
| `change-start` | Triggered on change startValue (debounced effect) | `$event`   | `number`             |
| `change-end`   | Triggered on change endValue (debounced effect)   | `$event`   | `number`             |

| Slot            | Description            |
| :-------------- | :--------------------- |
| `label`         | Label content          |
| `current-start` | Start thumbler content |
| `current-end`   | End thumbler content   |
| `legend`        | Legend content         |

<DemoUiRange />

<script setup>
import DemoUiRange from '~/components/demo/DemoUiRange.vue';
</script>

@[code](~/components/demo/DemoUiRange.vue)
