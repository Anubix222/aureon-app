/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import type { BodyPart } from "../../models/Routine";
import { BODY_PART_LABELS } from "../../models/BodyPartXP";
import { calculateXP } from "../../controllers/routineController";
import RoutineCard from "../../components/ui/RoutineCard";

const ALL_BODY_PARTS = Object.keys(BODY_PART_LABELS) as BodyPart[];

const RoutinesView: React.FC = () => {
  const { routines, completeRoutine, addCustomRoutine } = useGameStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  const presetRoutines = routines.filter((r) => r.isPreset);
  const customRoutines = routines.filter((r) => !r.isPreset);
  const previewXP = calculateXP(selectedParts);

  const togglePart = (part: BodyPart) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part],
    );
  };

  const handleCreate = () => {
    if (!name.trim() || selectedParts.length === 0) return;
    addCustomRoutine(name.trim(), selectedParts, sets, reps);
    setName("");
    setSelectedParts([]);
    setSets(3);
    setReps(10);
    setShowForm(false);
  };

  const Counter: React.FC<{
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
  }> = ({ label, value, onChange, min, max }) => (
    <div className="flex-1 bg-zinc-800 rounded-xl p-3">
      <p className="text-zinc-400 text-xs mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-zinc-700 text-white flex items-center justify-center hover:bg-zinc-600 transition-all"
        >
          −
        </button>
        <span className="text-white font-black text-xl">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-zinc-700 text-white flex items-center justify-center hover:bg-zinc-600 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Rutinas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-400 text-zinc-950 font-bold px-4 py-2 rounded-full text-sm hover:bg-amber-300 transition-all"
        >
          {showForm ? "Cancelar" : "+ Nueva"}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4">Nueva rutina</h2>

          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre del ejercicio"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Series y reps */}
          <div className="flex gap-3 mb-4">
            <Counter
              label="Series"
              value={sets}
              onChange={setSets}
              min={1}
              max={10}
            />
            <Counter
              label="Repeticiones"
              value={reps}
              onChange={setReps}
              min={1}
              max={100}
            />
          </div>

          {/* Partes del cuerpo */}
          <p className="text-zinc-400 text-sm mb-3">Partes del cuerpo</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ALL_BODY_PARTS.map((part) => (
              <button
                key={part}
                onClick={() => togglePart(part)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedParts.includes(part)
                    ? "bg-amber-400 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {BODY_PART_LABELS[part]}
              </button>
            ))}
          </div>

          {/* Preview XP */}
          {selectedParts.length > 0 && (
            <p className="text-amber-400 text-sm font-bold mb-4">
              XP que otorgará: {previewXP} XP
            </p>
          )}

          {/* Botón crear */}
          <button
            onClick={handleCreate}
            disabled={!name.trim() || selectedParts.length === 0}
            className="w-full bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Crear ejercicio
          </button>
        </div>
      )}

      {/* Predefinidas */}
      <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-3">
        Ejercicios base
      </h2>
      <div className="flex flex-col gap-3 mb-8">
        {presetRoutines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onComplete={() => completeRoutine(routine.id)}
          />
        ))}
      </div>

      {/* Personalizadas */}
      {customRoutines.length > 0 && (
        <>
          <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-3">
            Mis ejercicios
          </h2>
          <div className="flex flex-col gap-3">
            {customRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onComplete={() => completeRoutine(routine.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoutinesView;
