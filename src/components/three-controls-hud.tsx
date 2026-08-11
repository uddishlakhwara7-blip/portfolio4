"use client";

import { useState } from "react";
import { ColorPreset, GeometryShape } from "./three-hero-canvas";
import { Box, CircleDot, Flame, Layers, Maximize2, RefreshCw, Sparkles, Sun, Zap } from "lucide-react";

interface ThreeControlsHudProps {
  shape: GeometryShape;
  setShape: (s: GeometryShape) => void;
  preset: ColorPreset;
  setPreset: (p: ColorPreset) => void;
  wireframe: boolean;
  setWireframe: (w: boolean | ((prev: boolean) => boolean)) => void;
  speed: number;
  setSpeed: (s: number) => void;
  exploded: boolean;
  setExploded: (e: boolean | ((prev: boolean) => boolean)) => void;
}

export default function ThreeControlsHud({
  shape,
  setShape,
  preset,
  setPreset,
  wireframe,
  setWireframe,
  speed,
  setSpeed,
  exploded,
  setExploded,
}: ThreeControlsHudProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shapesList: { id: GeometryShape; label: string; icon: typeof Sparkles }[] = [
    { id: "crystal", label: "Crystal", icon: Sparkles },
    { id: "torusKnot", label: "Torus", icon: CircleDot },
    { id: "sphere", label: "Sphere", icon: Maximize2 },
    { id: "cube", label: "Cube", icon: Box },
  ];

  const presetsList: { id: ColorPreset; label: string; color: string; icon: typeof Zap }[] = [
    { id: "cyberpunk", label: "Cyber", color: "from-cyan-400 to-purple-500", icon: Zap },
    { id: "solar", label: "Solar", color: "from-amber-400 to-red-500", icon: Sun },
    { id: "emerald", label: "Emerald", color: "from-emerald-400 to-teal-500", icon: Sparkles },
    { id: "ice", label: "Ice", color: "from-sky-400 to-blue-600", icon: Flame },
  ];

  return (
    <div className="relative z-30">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300 shadow-[0_4px_20px_rgba(34,211,238,0.25)] backdrop-blur-xl transition hover:scale-105 hover:bg-cyan-500/20"
      >
        <Sparkles className="size-3.5 animate-pulse text-cyan-400" />
        <span>3D HUD Controls</span>
        <span className="rounded-full bg-cyan-400/20 px-1.5 py-0.5 text-[10px] text-cyan-200">
          {isOpen ? "Close" : "Open"}
        </span>
      </button>

      {/* Floating HUD Drawer */}
      {isOpen && (
        <div className="mt-3 flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/15 bg-slate-950/85 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.7)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
              <Layers className="size-3.5 text-cyan-400" />
              3D Matrix Parameters
            </span>
            <button
              type="button"
              onClick={() => {
                setShape("crystal");
                setPreset("cyberpunk");
                setWireframe(false);
                setSpeed(1);
                setExploded(false);
              }}
              className="flex items-center gap-1 text-[11px] text-slate-400 transition hover:text-cyan-300"
              title="Reset defaults"
            >
              <RefreshCw className="size-3" /> Reset
            </button>
          </div>

          {/* Geometry Selector */}
          <div>
            <span className="mb-2 block text-[11px] font-medium text-slate-400">Select 3D Geometry:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {shapesList.map((item) => {
                const Icon = item.icon;
                const active = shape === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setShape(item.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-center text-xs font-medium transition ${
                      active
                        ? "border-cyan-400/70 bg-cyan-400/20 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "border-white/10 bg-slate-900/60 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lighting Presets */}
          <div>
            <span className="mb-2 block text-[11px] font-medium text-slate-400">Lighting Theme:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {presetsList.map((item) => {
                const active = preset === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreset(item.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center text-xs font-medium transition ${
                      active
                        ? "border-cyan-400/80 bg-slate-900 text-white shadow-md shadow-cyan-500/20"
                        : "border-white/10 bg-slate-900/40 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <span className={`size-3 rounded-full bg-gradient-to-tr ${item.color}`} />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders & Toggles */}
          <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3">
            {/* Speed slider */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-300">Spin Speed ({speed}x)</span>
              <div className="flex items-center gap-1.5">
                {[0.5, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSpeed(val)}
                    className={`rounded px-2 py-0.5 text-[10px] transition ${
                      speed === val
                        ? "bg-cyan-400 font-bold text-slate-950"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2">
              <button
                type="button"
                onClick={() => setWireframe((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition ${
                  wireframe
                    ? "border-cyan-400/70 bg-cyan-400/20 text-cyan-200"
                    : "border-white/10 bg-slate-800/40 text-slate-400 hover:bg-white/10"
                }`}
              >
                Wireframe: {wireframe ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition ${
                  exploded
                    ? "border-purple-400/70 bg-purple-500/20 text-purple-200"
                    : "border-white/10 bg-slate-800/40 text-slate-400 hover:bg-white/10"
                }`}
              >
                Pulse Field: {exploded ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
