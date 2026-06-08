import React, { useState, useEffect } from "react";
import { useGameStore } from "./store/useGameStore";
import DashboardView from "./views/Dashboard/DashboardView";
import LevelUpView from "./views/LevelUp/LevelUpView";
import RoutinesView from "./views/Routines/RoutinesView";
import ProfileView from "./views/Profile/ProfileView";
import BottomNav from "./components/layout/BottomNav";
import AchievementToastStack from "./components/ui/AchievementToastStack";
import AchievementsView from "./views/Achievements/AchievementsView";

type View = "dashboard" | "routines" | "achievements" | "profile";

const App: React.FC = () => {
  const leveledUp = useGameStore((s) => s.leveledUp);
  const checkDailyReset = useGameStore((s) => s.checkDailyReset);
  const [currentView, setCurrentView] = useState<View>("dashboard");

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  if (leveledUp) return <LevelUpView />;

  return (
    <div className="pb-20 min-h-screen bg-zinc-950">
      <AchievementToastStack />
      {currentView === "dashboard" && <DashboardView />}
      {currentView === "routines" && <RoutinesView />}
      {currentView === "profile" && <ProfileView />}
      {currentView === "achievements" && <AchievementsView />}
      <BottomNav current={currentView} onChange={setCurrentView} />
    </div>
  );
};

export default App;
