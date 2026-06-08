import type { Routine } from "../models/Routine";

export const resetRoutinesIfNewDay = (
    routines: Routine[],
    lastOpenedAt: string

): Routine[] => {
    const today = new Date().toISOString().split('T')[0]
    if (lastOpenedAt === today) return routines

    return routines.map((r) => ({ ...r, completedAt: null }))
}