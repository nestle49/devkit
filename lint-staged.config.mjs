import { ESLint } from 'eslint'

/**
 * @see https://github.com/eslint/eslint/issues/15010
 * @param {String[]} files
 */
const removeIgnoredFiles = async files => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const eslint = new ESLint()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isIgnored = await Promise.all(
        files.map(file => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            return eslint.isPathIgnored(file)
        })
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const filteredFiles = files.filter((_, i) => !isIgnored[i])
    return filteredFiles.join(' ')
}

export default {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '*': 'prettier --ignore-unknown --write',
    /**
     * @param {String[]} filenames
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '*.{js,ts,vue}': async filenames => {
        const filesToLint = await removeIgnoredFiles(filenames)
        return [`eslint --fix --max-warnings 0 ${filesToLint}`]
    }
}
