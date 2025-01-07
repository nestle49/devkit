export enum DEVICES {
    SMALL = 'small',
    PHONE = 'phone',
    TABLET = 'tablet',
    DESKTOP = 'desktop',
    LARGE = 'large',
    EXTRA = 'extra'
}

export const BREAKPOINTS = {
    [DEVICES.SMALL]: 320,
    [DEVICES.PHONE]: 512,
    [DEVICES.TABLET]: 768,
    [DEVICES.DESKTOP]: 1024,
    [DEVICES.LARGE]: 1280,
    [DEVICES.EXTRA]: 1536
}
