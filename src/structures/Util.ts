export function randomizeInt(range: number, base?: number) {
    if (!base) base = 0;
    return Math.floor(Math.random() * range) + base;
}