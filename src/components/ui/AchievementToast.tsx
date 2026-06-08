import React, { useEffect } from "react";
import type { Achievement } from "../../models/Achievement";
import { useGameStore } from "../../store/useGameStore";
import { playAchievementSound } from "../../controllers/soundController";

interface Props {
  achievement: Achievement;
}

const AchievementToast: React.FC<Props> = ({ achievement }) => {
  const dismissAchievement = useGameStore((s) => s.dismissAchievement);

  useEffect(() => {
    playAchievementSound();
    const timer = setTimeout(() => {
      dismissAchievement(achievement.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [achievement.id, dismissAchievement]);

  return (
    <div className="bg-zinc-900 border border-amber-400 rounded-2xl p-4 flex items-center gap-4 shadow-lg animate-pulse">
      <span className="text-3xl">🏆</span>
      <div className="flex-1">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-0.5">
          Logro desbloqueado
        </p>
        <p className="text-white font-bold wrap-break-word">
          {achievement.title}
        </p>
        <p className="text-zinc-400 text-xs wrap-break-word">
          {achievement.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-amber-400 font-black text-sm">
          +{achievement.xpReward} XP
        </span>
        <button
          onClick={() => dismissAchievement(achievement.id)}
          className="text-zinc-600 text-xs hover:text-zinc-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AchievementToast;
