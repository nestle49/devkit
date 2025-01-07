import type { Directive } from 'vue'

export const vAutofocus: Directive<HTMLElement, boolean | undefined> = {
    mounted: (el, binding) => {
        const { value: isPositive = true } = binding
        if (!isPositive) {
            return
        }

        el.focus()
    }
}
