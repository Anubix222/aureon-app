import type { Achievement } from '../models/Achievement'

export const PRESET_ACHIEVEMENTS: Achievement[] = [
    { id: 'streak-3', title: 'En llamas', description: 'Completá todas tus rutinas 3 días seguidos', category: 'streak', xpReward: 200, unlockedAt: null },
    { id: 'streak-7', title: 'Semana perfecta', description: 'Mantené una racha de 7 días', category: 'streak', xpReward: 500, unlockedAt: null },
    { id: 'streak-30', title: 'Imparable', description: 'Mantené una racha de 30 días', category: 'streak', xpReward: 2000, unlockedAt: null },
    { id: 'routines-1', title: 'Primer paso', description: 'Completá tu primera rutina', category: 'routines', xpReward: 100, unlockedAt: null },
    { id: 'routines-10', title: 'Tomando ritmo', description: 'Completá 10 rutinas en total', category: 'routines', xpReward: 300, unlockedAt: null },
    { id: 'routines-50', title: 'Veterano', description: 'Completá 50 rutinas en total', category: 'routines', xpReward: 1000, unlockedAt: null },
    { id: 'level-5', title: 'Ascendiendo', description: 'Alcanzá el nivel 5', category: 'levels', xpReward: 400, unlockedAt: null },
    { id: 'level-10', title: 'Élite', description: 'Alcanzá el nivel 10', category: 'levels', xpReward: 1000, unlockedAt: null },
    { id: 'bodyparts-4', title: 'Equilibrado', description: 'Entrenaste 4 partes del cuerpo distintas', category: 'bodyParts', xpReward: 300, unlockedAt: null },
    { id: 'bodyparts-all', title: 'Completo', description: 'Entrenaste todas las partes del cuerpo', category: 'bodyParts', xpReward: 600, unlockedAt: null },
    { id: 'custom-1', title: 'Mi rutina', description: 'Creá tu primera rutina personalizada', category: 'custom', xpReward: 150, unlockedAt: null },
    { id: 'custom-5', title: 'Arquitecto', description: 'Creá 5 rutinas personalizadas', category: 'custom', xpReward: 400, unlockedAt: null },
    { id: 'xp-1000', title: 'Acumulador', description: 'Acumulá 1000 XP en total', category: 'xp', xpReward: 200, unlockedAt: null },
    { id: 'xp-5000', title: 'Leyenda', description: 'Acumulá 5000 XP en total', category: 'xp', xpReward: 800, unlockedAt: null },
];