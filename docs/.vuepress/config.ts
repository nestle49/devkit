import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AutoImportOptions } from '../../pluguins/auto-import-options'

const getComponents = () => {
    const components = [
        { text: 'UiSwitch', link: '/components/uiSwitch/uiSwitch' },
        { text: 'UiCheckbox', link: '/components/uiCheckbox/uiCheckbox' },
        { text: 'UiModal', link: '/components/uiModal/uiModal' },
        { text: 'UiRating', link: '/components/uiRating/uiRating' },
        { text: 'UiTab', link: '/components/uiTab/uiTab' },
        { text: 'UiRange', link: '/components/uiRange/uiRange' },
        { text: 'UiBreadcrumbs', link: '/components/uiBreadcrumbs/uiBreadcrumbs' },
        { text: 'UiRadio', link: '/components/uiRadio/uiRadio' },
        { text: 'UiCount', link: '/components/uiCount/uiCount' },
        { text: 'UiPagination', link: '/components/uiPagination/uiPagination' },
        { text: 'UiButton', link: '/components/uiButton/uiButton' },
        { text: 'UiTextField', link: '/components/uiTextField/uiTextField' },
        { text: 'UiFileInput', link: '/components/uiFileInput/uiFileInput' },
        { text: 'UiList', link: '/components/uiList/uiList' },
        { text: 'UiQuote', link: '/components/uiQuote/uiQuote' },
        { text: 'UiLoader', link: '/components/uiLoader/uiLoader' },
        { text: 'UiHeading', link: '/components/uiHeading/uiHeading' },
        { text: 'UiUnderline', link: '/components/uiUnderline/uiUnderline' },
        { text: 'UiPopover', link: '/components/uiPopover/uiPopover' },
        { text: 'UiScroll', link: '/components/uiScroll/uiScroll' },
        { text: 'UiDropdown', link: '/components/uiDropdown/uiDropdown' },
        { text: 'UiTable', link: '/components/uiTable/uiTable' },
        { text: 'UiTextArea', link: '/components/uiTextArea/uiTextArea' },
        { text: 'UiTimePicker', link: '/components/uiTimePicker/uiTimePicker' },
        { text: 'UiDatePicker', link: '/components/uiDatePicker/uiDatePicker' },
        { text: 'UiDateTimePicker', link: '/components/uiDateTimePicker/uiDateTimePicker' },
        { text: 'UiAlert', link: '/components/uiAlert/uiAlert' },
        { text: 'UiColorPicker', link: '/components/uiColorPicker/uiColorPicker' }
    ]
    return components.sort((a, b) => a.text.localeCompare(b.text))
}
export default defineUserConfig({
    bundler: viteBundler({
        viteOptions: {
            plugins: [AutoImport(AutoImportOptions)]
        },
        vuePluginOptions: {}
    }),
    lang: 'en-US',
    title: '🦄 UI-kit',
    description: 'Vue 3 component library',
    theme: defaultTheme({
        navbar: [
            {
                text: 'GitLab',
                link: 'https://git.lan/fs-frontend/products/packages/ui-kit'
            },
            {
                text: 'Home',
                link: '/'
            }
        ],
        sidebar: [
            {
                text: 'Components',
                collapsible: true,
                children: getComponents()
            }
        ]
    }),
    markdown: {
        /**
         * @see https://vuepress.github.io/guide/markdown.html#import-code-blocks
         */
        importCode: {
            handleImportPath: str => str.replace(/^~/, path.resolve(__dirname, '../../src'))
        }
    },
    /**
     * @see https://v2.vuepress.vuejs.org/guide/assets.html#packages-and-path-aliases
     */
    alias: {
        '~': path.resolve(__dirname, '../../src')
    }
})
