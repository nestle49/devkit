import type { RouterLinkProps } from 'vue-router'

import type { UiBaseButtonProps } from '~/components/types/ui-button'

export const useButton = (props: UiBaseButtonProps) => {
    const componentTag = computed(() => {
        if (props.to) {
            return typeof props.to === 'string' ? 'a' : 'RouterLink'
        }

        return 'button'
    })

    const isLink = computed(() => !!props.to)

    const isExternalLink = computed(() => {
        if (!isLink.value || typeof props.to !== 'string') {
            return false
        }

        if (props.external) {
            return true
        }

        return props.to.startsWith('http')
    })

    const componentAttrs = computed(() => {
        const attrs: Partial<AnchorHTMLAttributes & InputHTMLAttributes & RouterLinkProps> = {}

        if (props.disabled) {
            attrs.disabled = true
        }

        if (isLink.value) {
            if (typeof props.to === 'string') {
                attrs.href = props.to
            } else {
                attrs.to = props.to
            }
        }

        if (isExternalLink.value) {
            attrs.target = '_blank'
            attrs.rel = 'nofollow'
        }

        if (!isLink.value && props.nativeType) {
            attrs.type = props.nativeType
        }

        if (!isLink.value && props.ariaLabel) {
            attrs['aria-label'] = props.ariaLabel
        }

        return attrs
    })

    return {
        componentTag,
        componentAttrs
    }
}
