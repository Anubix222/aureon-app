import type { BodyPart } from "./Routine";

export const BODY_PART_XP: Record<BodyPart, number> = {
    chest: 100,
    back: 100,
    legs: 120,
    core: 80,
    arms: 70,
    cardio: 90,
    fullBody: 150,
    shoulders: 85,
}

export const BODY_PART_LABELS: Record<BodyPart, string> = {
    chest: 'Pecho',
    back: 'Espalda',
    legs: 'Piernas',
    core: 'Core / Abdomen',
    arms: 'Brazos',
    cardio: 'Cardio',
    fullBody: 'Full Body',
    shoulders: 'Hombros',
}