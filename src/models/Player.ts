export interface Player {
    id: string
    name: string
    level: number
    currentXP: number
    totalXP: number
    xpToNextLevel: number
    createdAt: string
    streak: number
    lastStreakDate: string | null
}
