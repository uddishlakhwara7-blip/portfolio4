"use client";

import { useState } from "react";
import { Sparkles, Activity, Waves, Play, Pause, Gauge, ChevronUp, ChevronDown } from "lucide-react";
import type { MotionMode } from "./motion-background";

export default function MotionBackgroundControls() {
  const [mode, setMode] = useState<MotionMode>("grid");
  const [speed, setSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const dispatchChange = (newMode: MotionMode, newSpeed: number, newPaused: boolean) => {
    const event = new CustomEvent("motion-bg-settings", {
      detail: { mode: newMode, speed: newSpeed, isPaused: newPaused },
    });
    window.dispatchEvent(event);
  };

  const handleModeChange = (newMode: MotionMode) => {
    setMode(newMode);
    dispatchChange(newMode, speed, isPaused);
  };

  const handleSpeedToggle = () => {
    const speeds = [0.5, 1, 1.8];
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setSpeed(newSpeed);
    dispatchChange(mode, newSpeed, isPaused);
  };

  const handlePauseToggle = () => {
    const newPaused = !isPaused;
    setIsPaused(newPaused);
    dispatchChange(mode, speed, newPaused);
  };

  const modeOptions: { id: MotionMode; label: string; icon: any }[] = [
    { id: "grid", label: "Cyber Wave", icon: Waves },
    { id: "cosmic", label: "Cosmic Mesh", icon: Activity },
    { id: "aurora", label: "Aurora Flow", icon: Sparkles },
  ];

  return (
    <aside
      aria-label="Motion Background Settings"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 text-xs text-slate-200"
    >
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-slate-900/90 p-4 shadow-[0_15px_40px_rgba(2,6,23,0.7)] backdrop-blur-2xl transition duration-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-semibold uppercase tracking-wider text-cyan-300">
              Motion Background
            </span>
            <span className="text-[10px] text-slate-400">Interactive 3D</span>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-400">Effect Preset</label>
            <div className="grid grid-cols-3 gap-1.5">
              {modeOptions.map((item) => {
                const Icon = item.icon;
                const isActive = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleModeChange(item.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-[11px] font-medium transition ${
                      isActive
                        ? "border-cyan-400 bg-cyan-400/15 text-cyan-300 shadow-sm"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speed & Play/Pause Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
            {/* Speed Control Button */}
            <button
              onClick={handleSpeedToggle}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-slate-300 transition hover:bg-white/15 hover:text-white"
              title="Toggle Animation Speed"
            >
              <Gauge className="size-3.5 text-cyan-400" />
              <span>Speed: {speed}x</span>
            </button>

            {/* Pause/Play Toggle */}
            <button
              onClick={handlePauseToggle}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition ${
                isPaused
                  ? "border-amber-400/50 bg-amber-400/20 text-amber-300"
                  : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
              }`}
            >
              {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              <span>{isPaused ? "Play" : "Pause"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Control Trigger Pill */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.5)] backdrop-blur-xl transition hover:border-cyan-400/50 hover:bg-slate-900 hover:text-white"
      >
        <Sparkles className="size-4 text-cyan-400 animate-pulse" />
        <span>Motion Background</span>
        {isExpanded ? <ChevronDown className="size-3.5 text-slate-400" /> : <ChevronUp className="size-3.5 text-slate-400" />}
      </button>
    </aside>
  );
}
