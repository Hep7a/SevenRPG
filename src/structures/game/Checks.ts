import { calculateSevenRequirements } from "./CalculateStats";

export function checkIfLevelUp(xp: number, maxXP: number) {
    let response: boolean = false;
    if (xp >= maxXP) response = true;

    return response;
}

export function checkIfAbleToSeven(seven: number, level: number, coins: number) {
    let response: boolean = false;
    const sevenRequirements = calculateSevenRequirements(seven);

    if ((sevenRequirements.level <= level) && (sevenRequirements.coins <= coins)) response = true;

    return {
        response,
        requirements: sevenRequirements
    }
}