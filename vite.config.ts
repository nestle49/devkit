import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

import AutoImport from 'unplugin-auto-import/vite'
import { AutoImportOptions } from './pluguins/auto-import-options'

// https://vitejs.dev/config/
export default defineConfig(() => {
    const config: UserConfig = {
        plugins: [
            dts({
                pathsToAliases: false
            }),
            vue(),
            AutoImport(AutoImportOptions),
            // svgSpritePlugin({
            //     originalIconsDirectory: path.resolve(process.cwd(), 'src/assets/icons'),
            //     outputDirectory: path.resolve(process.cwd(), 'src/assets')
            // }),
            typescript2({
                check: false,
                tsconfigOverride: {
                    compilerOptions: {
                        sourceMap: true,
                        declaration: true,
                        declarationMap: true
                    }
                }
            })
        ],
        resolve: {
            alias: [
                {
                    find: '~',
                    replacement: fileURLToPath(new URL('./src', import.meta.url))
                }
            ]
        },
        build: {
            /** TODO: можно включить, но тогда надо позаботиться о импорте css чанков */
            cssCodeSplit: false,
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/main.ts'),
                formats: ['es']
            },
            manifest: true,
            rollupOptions: {
                // make sure to externalize deps that shouldn't be bundled
                // into your library
                external: [
                    'vue',
                    '@vueuse/core',
                    'vue-router',
                    /src\/App.vue/ // exclude App.vue component
                ],
                output: {
                    // Provide global variables to use in the UMD build
                    // for externalized deps
                    globals: {
                        vue: 'Vue'
                    },
                    preserveModules: true
                }
            }
        }
    }

    return config
})
