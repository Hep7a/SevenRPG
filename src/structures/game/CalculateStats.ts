export function calculateMaxXP(level: number): number {
    return Math.pow(level, 2) * 35
}

export function calculateTotalXP(xp: number, level: number) {
    const maxXP = calculateMaxXP(level);

    return maxXP + xp;
}

export function calculateMaxHP(level: number) {
    return (level * 5) + 20;
}

export function calculateSevenRequirements(currentSeven: number) {
    return {
        level: currentSeven * 25,
        coins: (currentSeven + (currentSeven / 2)) * 50000
    }
}