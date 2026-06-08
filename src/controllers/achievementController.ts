import type { Achievement, AchievementStats } from "../models/Achievement";
import type { Routine } from "../models/Routine";
import type { Player } from "../models/Player";

export const buildStats = (
    player: Player,
    routines: Routine[]
): AchievementStats => {
    const completedRoutines = routines.filter((r) => r.completedAt !== null)

    const uniqueBodyParts = new Set(
        completedRoutines.flatMap((r) => r.bodyParts)
    ).size

    const customRoutinesCreated = routines.filter((r) => !r.isPreset).length

    return {
        streak: player.streak,
        totalRoutinesCompleted: completedRoutines.length,
        level: player.level,
        totalXP: player.totalXP,
        uniqueBodyParts,
        customRoutinesCreated,
    }
}

export const checkAchievements = (
    achievements: Achievement[],
    stats: AchievementStats
): { updated: Achievement[]; newlyUnlocked: Achievement[] } => {
    const today = new Date().toISOString().split('T')[0]
    const newlyUnlocked: Achievement[] = []

    const updated = achievements.map((achievement) => {
        if (achievement.unlockedAt) return achievement
        if (achievement.condition(stats)) {
            const unlocked = { ...achievement, unlockedAt: today }
            newlyUnlocked.push(unlocked)
            return unlocked
        }
        return achievement
    })

    return { updated, newlyUnlocked }
}