import type { Player } from "../models/Player";

const daysBetween = (dateA: string, dateB: string): number => {
    const a = new Date(dateA).getTime()
    const b = new Date(dateB).getTime()
    return Math.floor(Math.abs(a - b) / (1000 * 60 * 60 * 24))
}

export const updateStreak = (player: Player): Player => {
    const today = new Date().toISOString().split('T')[0]

    //Ya se conto hoy
    if (player.lastStreakDate === today) return player

    //Primera vez
    if (!player.lastStreakDate) {
        return { ...player, streak: 1, lastStreakDate: today }
    }

    const diff = daysBetween(today, player.lastStreakDate)

    if (diff === 1) {
        //Dia consecutivo suma racha
        return { ...player, streak: player.streak + 1, lastStreakDate: today }

    } else if (diff === 2) {
        //Dia de descanso permitido => mantiene racha
        return { ...player, streak: player.streak, lastStreakDate: today }
    } else {
        return { ...player, streak: 1, lastStreakDate: today }
    }
}