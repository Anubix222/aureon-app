import type { Player } from "../models/Player";

export const xpForLevel = (level: number): number => {
    return Math.floor(1500 * Math.pow(level, 1.8))
}

export const addXP = (player: Player, xpGained: number): Player => {
    const newCurrentXP = player.currentXP + xpGained
    const newTotalXP = player.totalXP + xpGained

    if (newCurrentXP >= player.xpToNextLevel) {
        const newLevel = player.level + 1
        return {
            ...player,
            level: newLevel,
            currentXP: newCurrentXP - player.xpToNextLevel,
            totalXP: newTotalXP,
            xpToNextLevel: xpForLevel(newLevel),
        }
    }

    return { ...player, currentXP: newCurrentXP, totalXP: newTotalXP }
}

export const didLevelUp = (before: Player, after: Player): boolean => {
    return after.level > before.level
}