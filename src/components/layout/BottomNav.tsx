import React from "react";

interface Props {
  current: "dashboard" | "routines" | "achievements" | "profile";
  onChange: (
    view: "dashboard" | "routines" | "achievements" | "profile",
  ) => void;
}

const BottomNav: React.FC<Props> = ({ current, onChange }) => {
  const tabs = [
    { id: "dashboard", label: "Inicio", icon: "⚔️" },
    { id: "routines", label: "Rutinas", icon: "📋" },
    { id: "achievements", label: "Logros", icon: "🏆" },
    { id: "profile", label: "Perfil", icon: "👤" },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-6 py-3 flex justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            current === tab.id
              ? "text-amber-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
