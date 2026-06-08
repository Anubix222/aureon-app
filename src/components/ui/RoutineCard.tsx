import React from "react";
import type { Routine } from "../../models/Routine";
import { BODY_PART_LABELS } from "../../models/BodyPartXP";
import { isCompletedToday } from "../../controllers/routineController";

interface Props {
  routine: Routine;
  onComplete: () => void;
}

const RoutineCard: React.FC<Props> = ({ routine, onComplete }) => {
  const completed = isCompletedToday(routine);

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-300 ${
        completed
          ? "bg-zinc-900 opacity-50"
          : "bg-zinc-900 border border-zinc-700"
      }`}
    >
      {/* Fila superior: nombre y botón */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`font-bold text-base ${completed ? "line-through text-zinc-500" : "text-white"}`}
        >
          {routine.name}
        </span>
        <button
          onClick={onComplete}
          disabled={completed}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            completed
              ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              : "bg-amber-400 text-zinc-950 hover:bg-amber-300 cursor-pointer"
          }`}
        >
          {completed ? "✓" : "○"}
        </button>
      </div>

      {/* Series y reps */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-zinc-300 text-sm font-medium">
          {routine.sets} series × {routine.reps} reps
        </span>
        <span
          className={`text-sm font-bold ${completed ? "text-zinc-600" : "text-amber-400"}`}
        >
          +{routine.xp} XP
        </span>
      </div>

      {/* Partes del cuerpo */}
      <div className="flex flex-wrap gap-1">
        {routine.bodyParts.map((part) => (
          <span
            key={part}
            className="text-xs bg-zinc-800 text-zinc-400 rounded-full px-2 py-0.5"
          >
            {BODY_PART_LABELS[part]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoutineCard;
