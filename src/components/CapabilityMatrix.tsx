import React, { useState } from "react";
import { CAPABILITIES, PROJECTS } from "../data";
import { CapabilityItem } from "../types";
import { Award, Briefcase, ChevronRight, CheckCircle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CapabilityMatrix() {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem | null>(CAPABILITIES[0]);

  // Find all projects that mention the selected capability
  const matchingProjects = selectedCap
    ? PROJECTS.filter((proj) => proj.capabilities.includes(selectedCap.name))
    : [];

  const categories = Array.from(new Set(CAPABILITIES.map((c) => c.category)));

  return (
    <div id="capability-matrix-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Capability Grid List */}
      <div id="capability-list-panel" className="lg:col-span-7 space-y-6">
        {categories.map((cat) => (
          <div key={cat} id={`cat-group-${cat.toLowerCase().replace(/\s+/g, '-')}`} className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-mono pl-1">
              {cat}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CAPABILITIES.filter((c) => c.category === cat).map((cap) => {
                const isSelected = selectedCap?.name === cap.name;
                return (
                  <button
                    key={cap.name}
                    id={`btn-cap-${cap.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedCap(cap)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "bg-indigo-950 border-indigo-600 shadow-md text-white"
                      : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-0 top-0 h-full w-1.5 bg-indigo-500" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? "bg-indigo-900 text-indigo-200" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50"
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className={`text-sm font-bold tracking-tight transition-colors ${
                        isSelected ? "text-white" : "text-indigo-950"
                      }`}>
                        {cap.name}
                      </h5>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                        isSelected ? "text-indigo-200/80" : "text-slate-500"
                      }`}>
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>

    {/* Proof / Alignment Detail Panel */}
    <div id="capability-detail-panel" className="lg:col-span-5">
      <AnimatePresence mode="wait">
        {selectedCap && (
          <motion.div
            key={selectedCap.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-indigo-950 text-indigo-100 rounded-xl p-6 border border-indigo-900 shadow-lg h-full flex flex-col justify-between animate-fadeIn"
            id="selected-capability-card"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-indigo-900/40 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-800/60">
                  {selectedCap.category}
                </span>
                {selectedCap.framework && (
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800/60">
                    {selectedCap.framework}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                {selectedCap.name}
              </h3>
              <p className="text-sm text-indigo-200/90 leading-relaxed mb-6">
                {selectedCap.description}
              </p>

              {selectedCap.impactMetrics && (
                <div className="bg-indigo-900/30 border border-indigo-900 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300">
                      Demonstrated Impact Value
                    </span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">
                    {selectedCap.impactMetrics}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300/80 block pl-1">
                  Aligned Projects ({matchingProjects.length})
                </span>
                {matchingProjects.length > 0 ? (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {matchingProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-indigo-900/20 hover:bg-indigo-900/40 transition-colors border border-indigo-900/50 p-3.5 rounded-xl flex items-start gap-3"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h6 className="text-xs font-bold text-white tracking-tight">
                            {proj.title}
                          </h6>
                          <span className="text-[10px] text-indigo-200/70 font-mono">
                            {proj.organization}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-indigo-300 italic pl-1">
                    Statewide advisory files and core program frameworks alignment.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-indigo-900 text-center">
              <span className="text-[10px] text-indigo-400 font-mono tracking-wider flex items-center justify-center gap-1">
                Click any card to align capability to project records <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}
