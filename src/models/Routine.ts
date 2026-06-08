export type BodyPart =
    | 'chest'
    | 'back'
    | 'legs'
    | 'core'
    | 'arms'
    | 'cardio'
    | 'fullBody'
    | 'shoulders'


export interface Routine {
    id: string
    name: string
    bodyParts: BodyPart[]
    sets: number
    reps: number
    xp: number
    isPreset: boolean
    completedAt: string | null
}