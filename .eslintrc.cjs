/**
 * @type {import('eslint/lib/shared/types').ConfigData}
 */
module.exports = {
    extends: ['./.eslintrc-auto-import.json', '@foodsoul/eslint-config/.eslintrc.js'],
    parserOptions: {
        project: 'tsconfig.json'
    },
    rules: {
        'vue/no-root-v-if': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-unused-properties': 'off'
    },
    ignorePatterns: ['vite.config.ts']
}
