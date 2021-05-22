export function randomizeInt(range: number, base?: number) {
    if (!base) base = 0;
    return Math.floor(Math.random() * range) + base;
}

export function calculateMaxXP(level: number): number {
    return Math.pow(level, 2) * 35
}

export function calculateTotalXP(xp: number, level: number) {
    const maxXP = calculateMaxXP(level);

    return maxXP + xp;
}