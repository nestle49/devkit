const loremIpsum =
    'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'

export function generateLorem(num: number): string {
    const maxWords = 1000
    const words = loremIpsum.split(' ')
    const numWords = Math.min(num, maxWords)
    let result = ''

    for (let i = 0; i < numWords; i++) {
        result += i ? `${words[Math.floor(Math.random() * words.length)]} ` : `${words[0]} `
    }

    return result.trim()
}
