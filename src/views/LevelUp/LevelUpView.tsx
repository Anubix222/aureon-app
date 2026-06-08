import React, { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";
import { playLevelUpSound } from "../../controllers/soundController";

const LevelUpView: React.FC = () => {
  const { player, dismissLevelUp } = useGameStore();

  useEffect(() => {
    playLevelUpSound();
    const timer = setTimeout(() => {
      dismissLevelUp();
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissLevelUp]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-6">
      {/*Glow */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-amber-400 blur-3xl opacity-30 scale-150" />
        <div className="relative bg-zinc-900 border border-amber-400 rounded-full w-40 h-40 flex flex-col items-center justify-center">
          <span className="text-amber-400 text-xs uppercase tracking-widest mb-1">
            Nivel
          </span>
          <span className="text-amber-400 text-6xl font-black">
            {player.level}
          </span>
        </div>
      </div>

      {/*Texto */}
      <h1 className="text-4xl font-black text-white mb-2">
        ¡Subiste de nivel!
      </h1>
      <p className="text-zinc-400 text-base mb-10">
        Sigues creciendo. Cada rutina cuenta.
      </p>
      {/*Boton */}
      <button
        onClick={dismissLevelUp}
        className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-full hover:bg-amber-300 transition-all duration-200"
      >
        Continuar
      </button>
      {/*Auto dismiss indicator */}
      <p className="text-zinc-600 text-xs mt-6">
        Se cierra automaticamente en 4 segundos
      </p>
    </div>
  );
};

export default LevelUpView;
