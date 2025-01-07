import Color from 'color'

export const colorToRgbaMatrix = (color: string, a = 0.5) => {
    const [r, g, b] = Color(color).unitArray()

    return [0, 0, 0, 0, r, 0, 0, 0, 0, g, 0, 0, 0, 0, b, 0, 0, 0, a, 0].join(' ')
}
