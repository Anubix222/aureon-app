import React from "react";
import { useGameStore } from "../../store/useGameStore";
import RoutineCard from "../../components/ui/RoutineCard";

const DashboardView: React.FC = () => {
  const { player, routines, completeRoutine } = useGameStore();

  const today = new Date().toISOString().split("T")[0];

  const completedToday = routines.filter((r) => r.completedAt === today);
  const pending = routines.filter((r) => r.completedAt !== today);

  const xpPercent = Math.floor((player.currentXP / player.xpToNextLevel) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/*Header*/}
      <div className="mb-8">
        <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">
          Bienvenido
        </p>
        <h1 className="text-3xl font-bold">{player.name}</h1>
      </div>

      {/*Racha */}
      <div className="bg-zinc-900 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-white font-bold text-lg">
              {player.streak} días de racha
            </p>
            <p className="text-zinc-500 text-xs">
              Se permite 1 día de descanso
            </p>
          </div>
        </div>
        {player.streak >= 3 && (
          <span className="text-amber-400 text-xs font-bold bg-amber-400/10 px-3 py-1 rounded-full">
            ¡En racha!
          </span>
        )}
      </div>

      {/*Nivel y XP */}
      <div className="bg-zinc-900 rounded-2xl p-5 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-zinc-400 text-sm">Nivel</span>
          <span className="text-zinc-400 text-sm">
            {player.currentXP} / {player.xpToNextLevel} XP
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-5xl font-black text-amber-400">
            {player.level}
          </span>
          <div className="flex-1">
            <div className="w-full bg-zinc-800 rounded-full h-3">
              <div
                className="bg-amber-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="text-zinc-500 text-xs mt-1">
              {xpPercent}% al siguiente nivel
            </p>
          </div>
        </div>
      </div>

      {/*Resumen del dia */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold ">Rutinas de hoy</h2>
        <span className="text-zinc-400 text-sm">
          {completedToday.length}/{routines.length} completadas
        </span>
      </div>

      {/*Lista de pendientes */}
      <div className="flex flex-col gap-3 mb-6">
        {pending.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onComplete={() => completeRoutine(routine.id)}
          />
        ))}
      </div>

      {/*Lista completadas */}
      {completedToday.length > 0 && (
        <>
          <p className="text-zinc-500 text-sm mb-3">Completadas</p>
          <div className="flex flex-col gap-3">
            {completedToday.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onComplete={() => {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardView;
