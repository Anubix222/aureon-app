import type { Achievement, AchievementStats } from "../models/Achievement";
import type { Routine } from "../models/Routine";
import type { Player } from "../models/Player";

// Las condiciones viven acá, nunca se serializan
const CONDITIONS: Record<string, (s: AchievementStats) => boolean> = {
    'streak-3': (s) => s.streak >= 3,
    'streak-7': (s) => s.streak >= 7,
    'streak-30': (s) => s.streak >= 30,
    'routines-1': (s) => s.totalRoutinesCompleted >= 1,
    'routines-10': (s) => s.totalRoutinesCompleted >= 10,
    'routines-50': (s) => s.totalRoutinesCompleted >= 50,
    'level-5': (s) => s.level >= 5,
    'level-10': (s) => s.level >= 10,
    'bodyparts-4': (s) => s.uniqueBodyParts >= 4,
    'bodyparts-all': (s) => s.uniqueBodyParts >= 8,
    'custom-1': (s) => s.customRoutinesCreated >= 1,
    'custom-5': (s) => s.customRoutinesCreated >= 5,
    'xp-1000': (s) => s.totalXP >= 1000,
    'xp-5000': (s) => s.totalXP >= 5000,
};

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
        const condition = CONDITIONS[achievement.id]
        if (condition && condition(stats)) {
            const unlocked = { ...achievement, unlockedAt: today }
            newlyUnlocked.push(unlocked)
            return unlocked
        }
        return achievement
    })

    return { updated, newlyUnlocked }
}