import type { Options } from 'unplugin-auto-import/types'
export const AutoImportOptions: Options = {
    include: [/\.ts?$/, /\.vue$/],
    imports: [
        {
            vue: [
                'defineAsyncComponent',
                'onBeforeMount',
                'defineModel',
                'onMounted',
                'createApp',
                'computed',
                'useAttrs',
                'nextTick',
                'reactive',
                'provide',
                'inject',
                'toRefs',
                'toRef',
                'watch',
                'ref'
            ]
        },
        {
            from: 'vue',
            imports: ['AnchorHTMLAttributes', 'InputHTMLAttributes', 'HTMLAttributes', 'Component'],
            type: true
        },
        {
            '@vueuse/core': [
                'useMutationObserver',
                'useOffsetPagination',
                'useMouseInElement',
                'useEventListener',
                'useMousePressed',
                'promiseTimeout',
                'onClickOutside',
                'useElementSize',
                'useFileDialog',
                'useWindowSize',
                'useTimeoutFn',
                'refDebounced',
                'onKeyStroke',
                'useMounted',
                'useScroll',
                'useFocus'
            ]
        }
    ],
    dts: true,
    eslintrc: {
        enabled: true
    }
}
