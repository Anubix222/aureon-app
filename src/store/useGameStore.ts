import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Player } from '../models/Player';
import type { Routine, BodyPart } from '../models/Routine';
import type { Achievement } from '../models/Achievement';
import { addXP, didLevelUp, xpForLevel } from '../controllers/playerController';
import { completeRoutine as completeRoutineAction, isCompletedToday, createCustomRoutine } from '../controllers/routineController';
import { resetRoutinesIfNewDay } from '../controllers/resetController';
import { updateStreak } from '../controllers/streakController';
import { buildStats, checkAchievements } from '../controllers/achievementController';
import { PRESET_ROUTINES } from '../data/presetRoutines';
import { PRESET_ACHIEVEMENTS } from '../data/presetAchievements';

interface GameState {
    player: Player;
    routines: Routine[];
    achievements: Achievement[];
    leveledUp: boolean;
    lastOpenedAt: string;
    newlyUnlockedAchievements: Achievement[];

    completeRoutine: (routineId: string) => void;
    addCustomRoutine: (name: string, bodyParts: BodyPart[], sets: number, reps: number) => void;
    dismissLevelUp: () => void;
    checkDailyReset: () => void;
    dismissAchievement: (id: string) => void;
}

const DEFAULT_PLAYER: Player = {
    id: crypto.randomUUID(),
    name: 'Guerrero',
    level: 1,
    currentXP: 0,
    totalXP: 0,
    xpToNextLevel: xpForLevel(1),
    createdAt: new Date().toISOString(),
    streak: 0,
    lastStreakDate: null,
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            player: DEFAULT_PLAYER,
            routines: PRESET_ROUTINES,
            achievements: PRESET_ACHIEVEMENTS,
            leveledUp: false,
            lastOpenedAt: new Date().toISOString().split('T')[0],
            newlyUnlockedAchievements: [],

            completeRoutine: (routineId) =>
                set((state) => {


                    const today = new Date().toISOString().split('T')[0];

                    //Reset automatico si cambio el dia
                    const routinesAfterReset = state.lastOpenedAt !== today
                        ? state.routines.map((r) => ({ ...r, completedAt: null }))
                        : state.routines

                    const routine = routinesAfterReset.find((r) => r.id === routineId);
                    if (!routine || isCompletedToday(routine)) return state;


                    const updatedRoutines = state.routines.map((r) =>
                        r.id === routineId ? completeRoutineAction(r) : r
                    );

                    const allDone = updatedRoutines.every((r) => r.completedAt === today);

                    const before = state.player;
                    let after = addXP(before, routine.xp);
                    if (allDone) after = updateStreak(after);

                    // Verificar logros
                    const stats = buildStats(after, updatedRoutines);
                    const { updated: updatedAchievements, newlyUnlocked } =
                        checkAchievements(state.achievements, stats);

                    // Aplicar XP bonus de logros desbloqueados
                    let finalPlayer = after;
                    newlyUnlocked.forEach((a) => {
                        finalPlayer = addXP(finalPlayer, a.xpReward);
                    });

                    return {
                        routines: updatedRoutines,
                        player: finalPlayer,
                        leveledUp: didLevelUp(before, finalPlayer),
                        achievements: updatedAchievements,
                        newlyUnlockedAchievements: [
                            ...state.newlyUnlockedAchievements,
                            ...newlyUnlocked,
                        ],
                    };
                }),

            addCustomRoutine: (name, bodyParts, sets, reps) =>
                set((state) => {
                    const newRoutine = createCustomRoutine(name, bodyParts, sets, reps);
                    const updatedRoutines = [...state.routines, newRoutine];

                    // Verificar logros al crear rutina
                    const stats = buildStats(state.player, updatedRoutines);
                    const { updated: updatedAchievements, newlyUnlocked } =
                        checkAchievements(state.achievements, stats);

                    let finalPlayer = state.player;
                    newlyUnlocked.forEach((a) => {
                        finalPlayer = addXP(finalPlayer, a.xpReward);
                    });

                    return {
                        routines: updatedRoutines,
                        achievements: updatedAchievements,
                        player: finalPlayer,
                        newlyUnlockedAchievements: [
                            ...state.newlyUnlockedAchievements,
                            ...newlyUnlocked,
                        ],
                    };
                }),

            dismissLevelUp: () => set({ leveledUp: false }),

            dismissAchievement: (id) =>
                set((state) => ({
                    newlyUnlockedAchievements: state.newlyUnlockedAchievements.filter(
                        (a) => a.id !== id
                    ),
                })),

            checkDailyReset: () =>
                set((state) => {
                    const today = new Date().toISOString().split('T')[0];

                    //Prueba
                    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
                    const resetted = resetRoutinesIfNewDay(state.routines, yesterday);
                    return {
                        routines: resetted,
                        lastOpenedAt: today,
                    };
                }),
        }),
        {
            name: 'fitness-rpg-storage',
            partialize: (state) => ({
                player: state.player,
                routines: state.routines,
                achievements: state.achievements,
                lastOpenedAt: state.lastOpenedAt,
                leveledUp: state.leveledUp,
                newlyUnlockedAchievements: state.newlyUnlockedAchievements,
            })
        }
    )
);