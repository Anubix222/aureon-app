import type { Routine, BodyPart } from "../models/Routine";
import { BODY_PART_XP } from "../models/BodyPartXP";

export const calculateXP = (bodyParts: BodyPart[]): number => {
    return bodyParts.reduce((total, part) => total + BODY_PART_XP[part], 0)
}

export const isCompletedToday = (routine: Routine): boolean => {
    if (!routine.completedAt) return false
    const today = new Date().toISOString().split('T')[0]
    return routine.completedAt === today
}

export const completeRoutine = (routine: Routine): Routine => {
    if (isCompletedToday(routine)) return routine
    const today = new Date().toISOString().split('T')[0]
    return { ...routine, completedAt: today }
}

export const createCustomRoutine = (
    name: string,
    bodyParts: BodyPart[],
    sets: number,
    reps: number
): Routine => ({
    id: crypto.randomUUID(),
    name,
    bodyParts,
    sets,
    reps,
    xp: calculateXP(bodyParts),
    isPreset: false,
    completedAt: null,
})