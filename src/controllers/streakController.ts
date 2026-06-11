import type { Player } from "../models/Player";
import { REST_DAYS, type WeekDay } from "../models/Routine";

const daysBetween = (dateA: string, dateB: string): number => {
    const a = new Date(dateA).getTime()
    const b = new Date(dateB).getTime()
    return Math.floor(Math.abs(a - b) / (1000 * 60 * 60 * 24))
}


const countRestDaysBetween = (dateA: string, dateB: string): number => {
    const start = new Date(dateA)
    const end = new Date(dateB)
    let count = 0
    const current = new Date(start)
    current.setDate(current.getDate() + 1)

    while (current < end) {
        const day = current.getDay() as WeekDay
        if (REST_DAYS.includes(day)) count++
        current.setDate(current.getDate() + 1)
    }
    return count
}

export const updateStreak = (player: Player): Player => {
    const today = new Date().toISOString().split('T')[0]

    //Ya se conto hoy
    if (player.lastStreakDate === today) return player

    //Primera vez
    if (!player.lastStreakDate) {
        return { ...player, streak: 1, lastStreakDate: today }
    }

    const totalDiff = daysBetween(today, player.lastStreakDate)
    const restDaysBetween = countRestDaysBetween(player.lastStreakDate, today)
    const trainingDaysMissed = totalDiff - restDaysBetween - 1

    if (trainingDaysMissed <= 0) {
        return { ...player, streak: player.streak + 1, lastStreakDate: today }
    } else {
        return { ...player, streak: 1, lastStreakDate: today }
    }

}