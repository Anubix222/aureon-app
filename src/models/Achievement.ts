export type AchievementCategory =
    | 'streak'
    | 'routines'
    | 'levels'
    | 'bodyParts'
    | 'custom'
    | 'xp'

export interface Achievement {
    id: string
    title: string
    description: string
    category: AchievementCategory
    xpReward: number
    unlockedAt: string | null
    condition: (stats: AchievementStats) => boolean
}

export interface AchievementStats {
    streak: number
    totalRoutinesCompleted: number
    level: number
    totalXP: number
    uniqueBodyParts: number
    customRoutinesCreated: number
}