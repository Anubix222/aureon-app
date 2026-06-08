import React from "react";
import { useGameStore } from "../../store/useGameStore";
import AchievementToast from "./AchievementToast";

const AchievementToastStack: React.FC = () => {
  const newlyUnlocked = useGameStore((s) => s.newlyUnlockedAchievements);

  if (newlyUnlocked.length === 0) return null;

  return (
    <div className="fixed top-4 left-4 ring-4 z-50 flex flex-col gap-2 border-none">
      {newlyUnlocked.map((achievement) => (
        <AchievementToast key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementToastStack;
