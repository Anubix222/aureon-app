/* eslint-disable react-hooks/static-components */
import React, { useState, useRef, useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";
import {
  type BodyPart,
  type WeekDay,
  TRAINING_DAYS,
  WEEK_DAY_LABELS,
} from "../../models/Routine";
import { BODY_PART_LABELS } from "../../models/BodyPartXP";
import { calculateXP } from "../../controllers/routineController";
import RoutineCard from "../../components/ui/RoutineCard";

const ALL_BODY_PARTS = Object.keys(BODY_PART_LABELS) as BodyPart[];

const RoutinesView: React.FC = () => {
  const { routines, addCustomRoutine } = useGameStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [selectedDays, setSelectedDays] = useState<WeekDay[]>([]);

  const todayDay = new Date().getDay() as WeekDay;

  const presetRoutines = routines.filter((r) => r.isPreset);
  const customRoutines = routines.filter((r) => !r.isPreset);
  const previewXP = calculateXP(selectedParts);

  const togglePart = (part: BodyPart) => {
    if (part === "fullBody") {
      setSelectedParts((prev) =>
        prev.includes("fullBody") ? [] : ["fullBody"],
      );
      return;
    }
    if (selectedParts.includes("fullBody")) return;

    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part],
    );
  };

  const toggleDay = (day: WeekDay) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleCreate = () => {
    if (!name.trim() || selectedParts.length === 0 || selectedDays.length === 0)
      return;
    addCustomRoutine(name.trim(), selectedParts, sets, reps, selectedDays);
    setName("");
    setSelectedParts([]);
    setSets(3);
    setReps(10);
    setSelectedDays([]);
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

  const routinesByDay = TRAINING_DAYS.map((day) => ({
    day,
    label: WEEK_DAY_LABELS[day],
    routines: presetRoutines.filter((r) => r.scheduledDays.includes(day)),
  }));

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

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
        <div
          ref={formRef}
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Nuevo ejercicio</h2>

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

          {selectedParts.includes("fullBody") && (
            <p className="text-amber-400 text-xs mb-3 bg-amber-400/10 px-3 py-2 rounded-xl">
              Full Body ya cubre todo el cuerpo. Deseleccionalo para elegir
              partes específicas.
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {ALL_BODY_PARTS.map((part) => {
              const isSelected = selectedParts.includes(part);
              const isDisabled =
                selectedParts.includes("fullBody") && part !== "fullBody";

              return (
                <button
                  key={part}
                  onClick={() => togglePart(part)}
                  disabled={isDisabled}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-amber-400 text-zinc-950"
                      : isDisabled
                        ? "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-40"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {BODY_PART_LABELS[part]}
                </button>
              );
            })}
          </div>

          {/*Días */}
          <p className="text-zinc-400 text-sm mb-3">Días de entrenamiento</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {TRAINING_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedDays.includes(day)
                    ? "bg-amber-400 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {WEEK_DAY_LABELS[day]}
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
            disabled={
              !name.trim() ||
              selectedParts.length === 0 ||
              selectedDays.length === 0
            }
            className="w-full bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Crear ejercicio
          </button>
        </div>
      )}
      {/*Plan semanal predefinido */}
      <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-4">
        Plan semanal
      </h2>
      {routinesByDay.map(({ day, label, routines: dayRoutines }) => (
        <div key={day} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-sm font-bold ${day === todayDay ? "text-amber-400" : "text-zinc-400"}`}
            >
              {label}
            </span>
            {day === todayDay && (
              <span className="text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded-full">
                Hoy
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {dayRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onComplete={() => {}}
                showComplete={false}
              />
            ))}
          </div>
        </div>
      ))}
      {/*Mis ejercicios */}
      {customRoutines.length > 0 && (
        <>
          <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-4 mt-4">
            Mis ejercicios
          </h2>
          <div className="flex flex-col gap-3">
            {customRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onComplete={() => {}}
                showComplete={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoutinesView;
