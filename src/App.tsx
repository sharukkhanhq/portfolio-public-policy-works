import React, { useState } from "react";
import { WORK_HISTORY, CERTIFICATIONS, PUBLICATIONS, CAPABILITIES } from "./data";
import CapabilityMatrix from "./components/CapabilityMatrix";
import ProjectExplorer from "./components/ProjectExplorer";
import ImpactSimulator from "./components/ImpactSimulator";
import RecruiterChat from "./components/RecruiterChat";
import {
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  FileText,
  User,
  Cpu,
  Coins,
  MessageSquare,
  Compass,
  Building,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"capabilities" | "projects" | "simulator" | "chat">("capabilities");

  return (
    <div id="portfolio-app" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Main Header / Navigation */}
      <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-indigo-900 rounded flex items-center justify-center text-white">
              <Building className="h-4.5 w-4.5" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display tracking-tight text-indigo-950 uppercase">
                Sharuk Khan
              </h1>
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                Tamil Nadu Chief Minister's Fellow • Government Advisory
              </p>
            </div>
          </div>

          {/* Quick Contacts Block */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600" id="quick-contacts-header">
            <a
              href="mailto:sharukkhanhq@gmail.com"
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md"
            >
              <Mail className="h-3.5 w-3.5 text-indigo-900" />
              sharukkhanhq@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sharuk-khan-agri"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md"
            >
              <Linkedin className="h-3.5 w-3.5 text-indigo-900" />
              linkedin.com/in/sharuk-khan-agri
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-indigo-600" />
              Chennai, India
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-10 py-8 space-y-12">
        {/* HERO HOOK & BENTO SUMMARY */}
        <section id="hero-summary" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Elevator Pitch */}
          <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                Executive Value Proposition
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-indigo-950 leading-tight">
                Bridging Public Policy, Strategy & Execution
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                With experience across policy advisory, institutional development, and programme implementation, I enable governments to translate policy agendas into measurable outcomes. My expertise lies in public policy, local governance, solid waste management, and digital governance, supported by analytical certifications from Harvard Business Publishing, Bloomberg, Centre for Science & Environment (CSE), etc. I bring a consulting mindset that combines strategic problem-solving, financial acumen, stakeholder engagement, and execution excellence to drive sustainable public sector transformation.
              </p>
            </div>
          </div>

          {/* Quick Highlights Bento Block */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* CM Fellow Card */}
            <div className="col-span-2 bg-indigo-950 text-white rounded-xl p-5 border border-indigo-900 shadow-md flex flex-col justify-between">
              <div className="p-2 bg-white/10 rounded-lg w-fit text-amber-300">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="space-y-1 mt-4">
                <div className="text-base font-bold tracking-tight font-display text-white">
                  Tamil Nadu Chief Minister's Fellow
                </div>
                <p className="text-[11px] text-indigo-200/80 leading-relaxed mt-1">
                  A prestigious leadership fellowship that places young professionals within the Government of Tamil Nadu to drive policy innovation, governance reforms, and strategic public sector transformation.
                </p>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg w-fit">
                <Award className="h-4 w-4" />
              </div>
              <div className="space-y-1 mt-4">
                <div className="text-2xl font-bold tracking-tight font-display text-indigo-950">10+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Premium Creds</div>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-1">Bloomberg ESG, McKinsey, & Harvard Business courses.</p>
              </div>
            </div>

            {/* Research Card */}
            <div className="col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg w-fit">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="space-y-1 mt-4">
                <div className="text-lg font-bold tracking-tight font-display text-indigo-950">2x Publications</div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-medium">Peer-reviewed GIS agricultural delineation studies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE RECRA SECTION WORKSPACE */}
        <section id="interactive-workspace" className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-950 tracking-tight">
                Consulting Proof & Verification Hub
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore structured data aligning Sharuk's experiences to Big 4 core advisory domains.
              </p>
            </div>

            {/* Selection Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-md w-fit" id="workspace-tabs">
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                  activeTab === "capabilities" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-indigo-900"
                }`}
              >
                Capability Matrix
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                  activeTab === "projects" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-indigo-900"
                }`}
              >
                Project Explorer
              </button>
              <button
                onClick={() => setActiveTab("simulator")}
                className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                  activeTab === "simulator" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-indigo-900"
                }`}
              >
                Impact Simulator
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "chat" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-indigo-900"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                AI Recruiter Co-Pilot
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          <div className="transition-all duration-300" id="tab-content-area">
            {activeTab === "capabilities" && <CapabilityMatrix />}
            {activeTab === "projects" && <ProjectExplorer />}
            {activeTab === "simulator" && <ImpactSimulator />}
            {activeTab === "chat" && <RecruiterChat />}
          </div>
        </section>

        {/* WORK EXPERIENCE & TIMELINE */}
        <section id="experience-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-4 pl-1">
              Professional Timeline
            </h3>

            <div className="relative border-l-2 border-slate-200 pl-6 ml-4 space-y-8" id="experience-timeline">
              {WORK_HISTORY.map((item, idx) => (
                <div key={idx} className="relative group" id={`history-item-${idx}`}>
                  {/* Indicator Dot */}
                  <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-200 bg-white group-hover:border-indigo-900 transition-colors flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-indigo-900 transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-wider uppercase">
                      {item.duration}
                    </span>
                    <h4 className="text-base font-bold text-indigo-950 tracking-tight">
                      {item.role}
                    </h4>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-indigo-900/60" />
                        {item.organization}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-indigo-900/60" />
                        {item.location}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Side-Rail */}
          <div className="lg:col-span-4 space-y-6" id="credentials-sidebar">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-4 pl-1">
              Academic Credentials & Verifications
            </h3>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2 block">
                  Education
                </span>
                <div className="space-y-3">
                  <div className="border-l-2 border-indigo-900 pl-3">
                    <h5 className="text-xs font-bold text-indigo-950 leading-tight">
                      BIM Tiruchirappalli
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium">Post Graduate Certificate in Public Policy & Management (Dec 2024)</p>
                  </div>
                  <div className="border-l-2 border-indigo-900 pl-3">
                    <h5 className="text-xs font-bold text-indigo-950 leading-tight">
                      Anbil Dharmalingam Agricultural College & Research Institute,
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        (a constituent College of Tamil Nadu Agricultural University)
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium">Bachelor of Science in Agriculture (2016 - 2020)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2 block">
                  Licenses & Certifications
                </span>
                <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.name} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h6 className="text-[11px] font-bold text-indigo-950 leading-tight">
                          {cert.name}
                        </h6>
                        <span className="text-[9px] font-mono font-semibold text-slate-400 shrink-0">
                          {cert.issueDate}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">Issuer: {cert.issuer}</p>
                      {cert.credentialId && (
                        <span className="text-[8px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/50 block w-fit">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC RESEARCH PUBLICATIONS */}
        <section id="publications-section" className="space-y-6 pt-6">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2 pl-1">
              Scientific Publications
            </h3>
            <p className="text-xs text-slate-500 pl-1">
              Research backing Sharuk's deep domain expertise in agriculture and environmental spatial mapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="publications-grid">
            {PUBLICATIONS.map((pub, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between" id={`publication-card-${idx}`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                      Peer Reviewed
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">{pub.publishDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-indigo-950 leading-snug tracking-tight">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-slate-500 italic">
                    {pub.journal}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{pub.coAuthors ? "Co-Author: Sharuk Khan" : "Author: Sharuk Khan"}</span>
                  <span className="flex items-center gap-1 text-indigo-900 font-bold hover:underline cursor-pointer">
                    View Publication <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="portfolio-footer" className="bg-indigo-950 text-indigo-200 py-12 border-t border-indigo-900">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 bg-indigo-900 rounded flex items-center justify-center text-white font-bold text-sm tracking-tight">
                SK
              </div>
              <span className="font-bold tracking-tight text-sm font-display uppercase">Sharuk Khan</span>
            </div>
            <p className="text-xs text-indigo-200/80 leading-relaxed">
              Tamil Nadu Chief Minister's Fellow driving environmental policy, circular economies, and digital integrations for local government administration.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-white">
              Target Consulting Alignment
            </h5>
            <ul className="space-y-1.5 text-xs text-indigo-200/80">
              <li>• Government & Public Sector (GPS) Advisory</li>
              <li>• ESG, Sustainability, & Circular Economy</li>
              <li>• Infrastructure Feasibility & Capital Projects</li>
              <li>• Program Management Office (PMO) Leads</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-white">
              Quick Connections
            </h5>
            <div className="space-y-2 text-xs">
              <a href="mailto:sharukkhanhq@gmail.com" className="flex items-center gap-2 text-indigo-200/80 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                sharukkhanhq@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/sharuk-khan-agri"
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2 text-indigo-200/80 hover:text-white transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5 text-indigo-400" />
                linkedin.com/in/sharuk-khan-agri
              </a>
              <span className="flex items-center gap-2 text-indigo-300/60">
                <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                Secretariat, Chennai, India
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 mt-12 pt-6 border-t border-indigo-900/60 text-center text-[10px] text-indigo-400 font-mono">
          © {new Date().getFullYear()} Sharuk Khan. All rights reserved. Grounded validation models built for Big 4 Partner evaluation.
        </div>
      </footer>
    </div>
  );
}
