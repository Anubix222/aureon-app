import type { Achievement } from '../models/Achievement'

export const PRESET_ACHIEVEMENTS: Achievement[] = [
    // Racha
    {
        id: 'streak-3',
        title: 'En llamas',
        description: 'Completá todas tus rutinas 3 días seguidos',
        category: 'streak',
        xpReward: 200,
        unlockedAt: null,
        condition: (s) => s.streak >= 3,
    },
    {
        id: 'streak-7',
        title: 'Semana perfecta',
        description: 'Mantené una racha de 7 días',
        category: 'streak',
        xpReward: 500,
        unlockedAt: null,
        condition: (s) => s.streak >= 7,
    },
    {
        id: 'streak-30',
        title: 'Imparable',
        description: 'Mantené una racha de 30 días',
        category: 'streak',
        xpReward: 2000,
        unlockedAt: null,
        condition: (s) => s.streak >= 30,
    },

    // Rutinas completadas
    {
        id: 'routines-1',
        title: 'Primer paso',
        description: 'Completá tu primera rutina',
        category: 'routines',
        xpReward: 100,
        unlockedAt: null,
        condition: (s) => s.totalRoutinesCompleted >= 1,
    },
    {
        id: 'routines-10',
        title: 'Tomando ritmo',
        description: 'Completá 10 rutinas en total',
        category: 'routines',
        xpReward: 300,
        unlockedAt: null,
        condition: (s) => s.totalRoutinesCompleted >= 10,
    },
    {
        id: 'routines-50',
        title: 'Veterano',
        description: 'Completá 50 rutinas en total',
        category: 'routines',
        xpReward: 1000,
        unlockedAt: null,
        condition: (s) => s.totalRoutinesCompleted >= 50,
    },

    // Niveles
    {
        id: 'level-5',
        title: 'Ascendiendo',
        description: 'Alcanzá el nivel 5',
        category: 'levels',
        xpReward: 400,
        unlockedAt: null,
        condition: (s) => s.level >= 5,
    },
    {
        id: 'level-10',
        title: 'Élite',
        description: 'Alcanzá el nivel 10',
        category: 'levels',
        xpReward: 1000,
        unlockedAt: null,
        condition: (s) => s.level >= 10,
    },

    // Partes del cuerpo
    {
        id: 'bodyparts-4',
        title: 'Equilibrado',
        description: 'Entrenaste 4 partes del cuerpo distintas',
        category: 'bodyParts',
        xpReward: 300,
        unlockedAt: null,
        condition: (s) => s.uniqueBodyParts >= 4,
    },
    {
        id: 'bodyparts-all',
        title: 'Completo',
        description: 'Entrenaste todas las partes del cuerpo',
        category: 'bodyParts',
        xpReward: 600,
        unlockedAt: null,
        condition: (s) => s.uniqueBodyParts >= 8,
    },

    // Rutinas personalizadas
    {
        id: 'custom-1',
        title: 'Mi rutina',
        description: 'Creá tu primera rutina personalizada',
        category: 'custom',
        xpReward: 150,
        unlockedAt: null,
        condition: (s) => s.customRoutinesCreated >= 1,
    },
    {
        id: 'custom-5',
        title: 'Arquitecto',
        description: 'Creá 5 rutinas personalizadas',
        category: 'custom',
        xpReward: 400,
        unlockedAt: null,
        condition: (s) => s.customRoutinesCreated >= 5,
    },

    // XP total
    {
        id: 'xp-1000',
        title: 'Acumulador',
        description: 'Acumulá 1000 XP en total',
        category: 'xp',
        xpReward: 200,
        unlockedAt: null,
        condition: (s) => s.totalXP >= 1000,
    },
    {
        id: 'xp-5000',
        title: 'Leyenda',
        description: 'Acumulá 5000 XP en total',
        category: 'xp',
        xpReward: 800,
        unlockedAt: null,
        condition: (s) => s.totalXP >= 5000,
    },
];