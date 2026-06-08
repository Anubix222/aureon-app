import React from "react";
import { useGameStore } from "../../store/useGameStore";
import type {
  Achievement,
  AchievementCategory,
} from "../../models/Achievement";

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  streak: "🔥 Racha",
  routines: "📋 Rutinas",
  levels: "⚔️ Niveles",
  bodyParts: "💪 Cuerpo",
  custom: "✏️ Creador",
  xp: "⭐ XP",
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => {
  const unlocked = achievement.unlockedAt !== null;

  return (
    <div
      className={`rounded-2xl p-4 flex items-center gap-4 transition-all ${
        unlocked
          ? "bg-zinc-900 border border-amber-400/30"
          : "bg-zinc-900 opacity-40"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
          unlocked ? "bg-amber-400/20" : "bg-zinc-800"
        }`}
      >
        {unlocked ? "🏆" : "🔒"}
      </div>
      <div className="flex-1">
        <p className={`font-bold ${unlocked ? "text-white" : "text-zinc-500"}`}>
          {achievement.title}
        </p>
        <p className="text-zinc-500 text-xs">{achievement.description}</p>
        {unlocked && (
          <p className="text-zinc-600 text-xs mt-0.5">
            Desbloqueado el {achievement.unlockedAt}
          </p>
        )}
      </div>
      <span
        className={`text-sm font-black ${unlocked ? "text-amber-400" : "text-zinc-600"}`}
      >
        +{achievement.xpReward} XP
      </span>
    </div>
  );
};

const AchievementsView: React.FC = () => {
  const achievements = useGameStore((s) => s.achievements);

  const unlockedCount = achievements.filter(
    (a) => a.unlockedAt !== null,
  ).length;

  const byCategory = achievements.reduce<Record<string, Achievement[]>>(
    (acc, a) => {
      if (!acc[a.category]) acc[a.category] = [];
      acc[a.category].push(a);
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">
          Logros
        </p>
        <h1 className="text-3xl font-bold">Tus logros</h1>
      </div>

      {/* Progreso general */}
      <div className="bg-zinc-900 rounded-2xl p-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-xs mb-1">Desbloqueados</p>
          <p className="text-white text-2xl font-black">
            {unlockedCount}
            <span className="text-zinc-500 text-base font-normal">
              {" "}
              / {achievements.length}
            </span>
          </p>
        </div>
        <div className="w-32">
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.floor((unlockedCount / achievements.length) * 100)}%`,
              }}
            />
          </div>
          <p className="text-zinc-500 text-xs mt-1 text-right">
            {Math.floor((unlockedCount / achievements.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Por categoría */}
      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-3">
            {CATEGORY_LABELS[category as AchievementCategory]}
          </h2>
          <div className="flex flex-col gap-3">
            {items.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsView;
