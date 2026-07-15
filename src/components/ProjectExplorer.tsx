import React, { useState } from "react";
import { PROJECTS, CAPABILITIES } from "../data";
import { ProjectItem } from "../types";
import { Search, MapPin, ChevronDown, ChevronUp, FolderOpen, Briefcase, FileText, Compass } from "lucide-react";

export default function ProjectExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("16f-proposal");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.bulletPoints.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      proj.capabilities.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div id="project-explorer-root" className="space-y-6">
      {/* Search and Category Filters */}
      <div id="project-filters-bar" className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            id="search-projects-input"
            placeholder="Search by keywords, capabilities, or results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="project-cat-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-indigo-900 text-white shadow-sm"
                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Accordions */}
      <div id="project-list" className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => {
            const isExpanded = expandedProjectId === proj.id;
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "border-indigo-200 bg-indigo-50/20 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(proj.id)}
                  id={`accordion-btn-${proj.id}`}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none group"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-indigo-700 bg-indigo-50/60 px-2.5 py-0.5 rounded uppercase">
                        {proj.category}
                      </span>
                      {proj.framework && (
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase border border-emerald-100">
                          {proj.framework}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-indigo-950 group-hover:text-indigo-800 transition-colors tracking-tight">
                      {proj.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                        {proj.organization}
                      </span>
                      {proj.duration && (
                        <span className="flex items-center gap-1">
                          <Compass className="h-3.5 w-3.5 text-slate-400" />
                          {proj.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg border border-slate-200 group-hover:border-indigo-200 transition-all text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-indigo-900" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-100 space-y-5 animate-fadeIn">
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-semibold tracking-wider text-slate-400 font-mono uppercase">
                        Key Work Products & Contributions
                      </h5>
                      <ul className="space-y-2.5">
                        {proj.bulletPoints.map((bp, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 mr-2">
                        Mapped Skills:
                      </span>
                      {proj.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-[11px] font-semibold text-indigo-950 bg-slate-50 px-3 py-1 rounded border border-slate-200"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white space-y-2" id="no-projects-fallback">
            <FolderOpen className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No project matches your criteria</p>
            <p className="text-xs text-slate-500">Try adjusting your search queries or selecting another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
