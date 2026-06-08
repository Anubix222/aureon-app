import React from "react";
import { useGameStore } from "../../store/useGameStore";
import { BODY_PART_LABELS } from "../../models/BodyPartXP";

const ProfileView: React.FC = () => {
  const { player, routines } = useGameStore();

  const totalCompleted = routines.filter((r) => r.completedAt !== null).length;
  const customRoutines = routines.filter((r) => !r.isPreset).length;
  const xpPercent = Math.floor((player.currentXP / player.xpToNextLevel) * 100);

  // Parte del cuerpo más entrenada
  const partCount: Record<string, number> = {};
  routines
    .filter((r) => r.completedAt !== null)
    .forEach((r) => {
      r.bodyParts.forEach((part) => {
        partCount[part] = (partCount[part] || 0) + 1;
      });
    });
  const favoritePart = Object.entries(partCount).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">
          Perfil
        </p>
        <h1 className="text-3xl font-bold">{player.name}</h1>
      </div>

      {/* Nivel */}
      <div className="bg-zinc-900 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-5 mb-4">
          <div className="bg-amber-400 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-zinc-950 text-2xl font-black">
              {player.level}
            </span>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Nivel actual</p>
            <p className="text-white font-bold text-xl">Nivel {player.level}</p>
            <p className="text-zinc-500 text-xs">XP total: {player.totalXP}</p>
          </div>
        </div>

        {/* Barra XP */}
        <div className="w-full bg-zinc-800 rounded-full h-2 mb-1">
          <div
            className="bg-amber-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-500">
          <span>{player.currentXP} XP</span>
          <span>{player.xpToNextLevel} XP</span>
        </div>
      </div>

      {/* Estadísticas */}
      <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-3">
        Estadísticas
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Rutinas completadas</p>
          <p className="text-white text-2xl font-black">{totalCompleted}</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">XP total ganado</p>
          <p className="text-amber-400 text-2xl font-black">{player.totalXP}</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Rutinas creadas</p>
          <p className="text-white text-2xl font-black">{customRoutines}</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Zona favorita</p>
          <p className="text-white text-lg font-black">
            {favoritePart
              ? BODY_PART_LABELS[
                  favoritePart[0] as keyof typeof BODY_PART_LABELS
                ]
              : "—"}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Racha actual</p>
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <p className="text-white text-2xl font-black">{player.streak}</p>
            <p className="text-zinc-500 text-sm">días</p>
          </div>
        </div>
      </div>

      {/* Próximo nivel */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4">
        <p className="text-zinc-400 text-sm mb-1">Próximo nivel</p>
        <p className="text-white font-semibold">
          Te faltan{" "}
          <span className="text-amber-400 font-black">
            {player.xpToNextLevel - player.currentXP} XP
          </span>{" "}
          para llegar al nivel {player.level + 1}
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
