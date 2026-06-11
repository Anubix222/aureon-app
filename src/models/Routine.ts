export type BodyPart =
    | 'chest'
    | 'back'
    | 'legs'
    | 'core'
    | 'arms'
    | 'cardio'
    | 'fullBody'
    | 'shoulders'


export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const WEEK_DAY_LABELS: Record<WeekDay, string> = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
}

export const TRAINING_DAYS: WeekDay[] = [1, 3, 5, 6]
export const REST_DAYS: WeekDay[] = [0, 2, 4]

export interface Routine {
    id: string
    name: string
    bodyParts: BodyPart[]
    sets: number
    reps: number
    xp: number
    isPreset: boolean
    completedAt: string | null
    scheduledDays: WeekDay[]
}