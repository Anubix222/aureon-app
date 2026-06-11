/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Routine } from "../models/Routine";

export const resetRoutinesIfNewDay = (
    routines: Routine[],
    lastOpenedAt: string

): Routine[] => {
    const today = new Date().toISOString().split('T')[0]
    if (lastOpenedAt === today) return routines

    //solo resetea las rutinas del dia actual
    const todayDay = new Date().getDay()
    return routines.map((r) => {
        if (r.scheduledDays.includes(todayDay as any)) {
            return { ...r, completedAt: null }
        }
        return r
    })


}