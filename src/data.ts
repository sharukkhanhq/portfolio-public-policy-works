import { ProjectItem, CapabilityItem, CertificationItem, PublicationItem } from "./types";

export const CAPABILITIES: CapabilityItem[] = [
  {
    name: "Strategy & Management Consulting",
    category: "Strategy & Advisory",
    description: "Developing strategic growth proposals, financial estimates, and implementation frameworks for long-term institutional scaling.",
    impactMetrics: "Prepared 16F implementation framework for statewide mission expansion",
    framework: "SWOT & McKinsey 7S Framework"
  },
  {
    name: "Public Policy Advisory",
    category: "Strategy & Advisory",
    description: "Researching policy implications, drafting official Cabinet/Department notes, and designing legislative compliance roadmaps.",
    impactMetrics: "Policy note drafted and tabled successfully in Tamil Nadu Legislative Assembly",
    framework: "Policy Design Cycle"
  },
  {
    name: "Programme Management Office (PMO)",
    category: "Operations & Delivery",
    description: "Leading multi-department coordination, establishing statewide monitoring structures, and managing complex timelines.",
    impactMetrics: "Coordinated digital workflows across 40 Regional Directorates & 25 ULBs",
    framework: "Agile PMO / RACI Matrix"
  },
  {
    name: "Government Advisory",
    category: "Strategy & Advisory",
    description: "Interfacing directly with executive government authorities (Additional Chief Secretaries, Commissioners, District Collectors) to support strategic decision-making.",
    impactMetrics: "Drafted 10+ executive briefing dossiers for high-level state meetings",
    framework: "Executive Stakeholder Management"
  },
  {
    name: "Circular Economy",
    category: "Specialized Domains",
    description: "Creating zero-waste models, establishing recyclable pricing structures, and strengthening vertical value chains.",
    impactMetrics: "Designed statewide recyclable pricing & stakeholder framework with rate cards",
    framework: "Closed-Loop Value Chain"
  },
  {
    name: "Solid Waste Management",
    category: "Specialized Domains",
    description: "Designing end-to-end wet/dry waste processing campaigns, evaluating municipal setups, and planning logistics routing.",
    impactMetrics: "Conceptualized and executed Recyclable Collection Drives 1.0 to 5.0",
    framework: "Integrated Solid Waste Management (ISWM)"
  },
  {
    name: "Environmental Consulting & ESG",
    category: "Specialized Domains",
    description: "Assessing material recovery potential, studying biological waste treatment (BSF), and compiling compliance audits.",
    impactMetrics: "Bloomberg ESG Certified; Evaluated high-capacity Kochi BSF Plant operations",
    framework: "ESG Materiality Matrix"
  },
  {
    name: "Infrastructure Advisory",
    category: "Strategy & Advisory",
    description: "Conducting technical feasibility assessments, identifying municipal gaps, and preparing capital investment estimates.",
    impactMetrics: "Designed pilot implementation and infrastructure framework for GCC",
    framework: "Capital Expenditure (CapEx) Feasibility"
  },
  {
    name: "Financial Modelling",
    category: "Operations & Delivery",
    description: "Developing cost-benefit structures, preparing detailed budget estimations, and tracking programmatic expenditure.",
    impactMetrics: "Estimated revenue potential and pricing formulas for Rate Card Committee",
    framework: "Cost-Benefit Analysis (CBA)"
  },
  {
    name: "Project Management",
    category: "Operations & Delivery",
    description: "Structuring deliverables, setting standard operating procedures, and establishing accountability across local bodies.",
    impactMetrics: "Spearheaded public campaign 'Kuppai Thiruvizha' with statewide IEC materials",
    framework: "PMBOK Standards"
  },
  {
    name: "Monitoring & Evaluation",
    category: "Operations & Delivery",
    description: "Developing digital progress trackers, designing survey tools, and building field evaluation dashboards.",
    impactMetrics: "Instituted recurring collection systems with automated daily data reports",
    framework: "Theory of Change (ToC)"
  },
  {
    name: "Data Analytics",
    category: "Operations & Delivery",
    description: "Designing statistical surveys, analyzing waste audit compositions, and conducting comparative municipal studies.",
    impactMetrics: "Analyzed material separation efficiencies and forecasted revenue trends",
    framework: "D3 Data Visualization & Regression"
  },
  {
    name: "Digital Transformation & Digital Governance",
    category: "Specialized Domains",
    description: "Integrating modern e-procurement systems, upgrading system hierarchies, and reporting digital impacts.",
    impactMetrics: "Restructured NIC hierarchy for Thooimai Mission eproc logins; eGovernance Awards submission",
    framework: "Government-to-Business (G2B) Digital Flow"
  },
  {
    name: "Procurement & Contract Management",
    category: "Operations & Delivery",
    description: "Drafting Requests for Proposal (RFPs), formulating technical specs, and establishing vendor evaluation criteria.",
    impactMetrics: "Drafted RFPs for multi-million waste operations in Chennai (GCC)",
    framework: "Transparent Procurement Protocol"
  },
  {
    name: "Capacity Building & Training",
    category: "Operations & Delivery",
    description: "Designing training modules, conducting Training Needs Assessments (TNA), and strengthening rural local bodies.",
    impactMetrics: "Delivered virtual coordination workshops for 40+ regional offices and ULBs",
    framework: "ADDIE Instructional Design"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "16f-proposal",
    category: "Strategic Planning & Policy Advisory",
    title: "Proposal for exemption under Section 16F of Tamil Nadu Tender Transparency Act",
    organization: "Thooimai Mission, Government of Tamil Nadu",
    bulletPoints: [
      "Developed comprehensive strategic proposals focused on statewide mission expansion and institutional strengthening.",
      "Prepared detailed financial estimates, implementation frameworks, and multi-year cash flow requirements.",
      "Conducted extensive feasibility analysis and policy justification to support executive decision-making.",
      "Backed all recommendations with evidence-based policy research and municipal benchmark data."
    ],
    capabilities: ["Strategy & Management Consulting", "Public Policy Advisory", "Financial Modelling"],
    framework: "MECE Framework & Feasibility Analysis"
  },
  {
    id: "assembly-policy-note",
    category: "Strategic Planning & Policy Advisory",
    title: "Cabinet Policy Note",
    organization: "Directorate of Municipal Administration, Government of Tamil Nadu",
    bulletPoints: [
      "Drafted the official Cabinet/Department policy note that was formally tabled in the Tamil Nadu Legislative Assembly.",
      "Conducted rigorous policy research on solid waste management metrics across major Indian cities.",
      "Prepared long-term implementation roadmaps and targets for local urban bodies."
    ],
    capabilities: ["Public Policy Advisory", "Government Advisory", "Project Management"],
    framework: "Policy Design Lifecycle"
  },
  {
    id: "spid-amendment",
    category: "Strategic Planning & Policy Advisory",
    title: "Policy Analysis on Thooimai Mission and Improvisation Proposal Preparation",
    organization: "Government of Tamil Nadu",
    bulletPoints: [
      "Analysed complex Government Orders (G.O.) to identify regulatory bottlenecks.",
      "Prepared technical amendment notes and assessed legal, administrative, and financial implications.",
      "Supported administrative compliance across all local bodies in the state."
    ],
    capabilities: ["Public Policy Advisory", "Government Advisory", "Procurement & Contract Management"],
    framework: "Regulatory Impact Assessment"
  },
  {
    id: "rameswaram-iswm",
    category: "Strategic Planning & Policy Advisory",
    title: "Rameswaram Integrated Solid Waste Management Master Plan",
    organization: "Thooimai Mission, Government of Tamil Nadu",
    bulletPoints: [
      "Prepared an Integrated Solid Waste Management (ISWM) Master Plan for Rameswaram Municipality.",
      "Assessed the existing waste management system and identified infrastructure and operational gaps.",
      "Developed a phased roadmap for achieving Zero Waste to Landfill.",
      "Planned key infrastructure, including Material Recovery Facilities (MRFs), Textile Recovery Facility, Windrow Composting Facility, and Collection Infrastructure.",
      "Recommended circular economy and resource recovery strategies to maximize recycling and minimize landfill disposal.",
      "Proposed institutional and operational reforms to improve collection efficiency and processing capacity.",
      "Estimated capital investment requirements, operational costs, and implementation timelines."
    ],
    capabilities: ["Strategy & Management Consulting", "Solid Waste Management", "Circular Economy", "Infrastructure Advisory", "Financial Modelling"],
    framework: "Integrated Solid Waste Management (ISWM) Planning"
  },
  {
    id: "concept-notes-thooimai",
    category: "Strategic Planning & Policy Advisory",
    title: "Innovative Pilot Design & Concept Papers",
    organization: "Thooimai Mission",
    bulletPoints: [
      "Designed new sustainable initiatives under the Thooimai Mission focusing on circular economies.",
      "Prepared structured concept papers for pilots and technological innovations in recycling.",
      "Developed operational implementation strategies and conducted cross-departmental consultations."
    ],
    capabilities: ["Strategy & Management Consulting", "Circular Economy", "Solid Waste Management"],
    framework: "Concept Pitching & Pilot Design"
  },
  {
    id: "collection-drive",
    category: "Programme Design & Implementation",
    title: "Statewide Recyclable Collection Campaigns (Drive 1.0 to 5.0)",
    organization: "Thooimai Mission & Directorate of Municipal Administration",
    bulletPoints: [
      "Designed and executed statewide recyclable waste collection campaigns across urban and rural bodies.",
      "Developed robust, standardized operational guidelines for local aggregators and municipal workers.",
      "Designed digital monitoring dashboards to track real-time collection metrics.",
      "Institutionalized recurring collection systems with integrated, automated data reporting."
    ],
    capabilities: ["Programme Management Office (PMO)", "Solid Waste Management", "Monitoring & Evaluation", "Data Analytics"],
    framework: "Standard Operating Procedures (SOPs) & Digital Dashboards"
  },
  {
    id: "kuppai-thiruvizha",
    category: "Programme Design & Implementation",
    title: "Kuppai Thiruvizha Awareness Campaign",
    organization: "Thooimai Mission",
    bulletPoints: [
      "Designed public awareness campaigns centered on waste segregation at source.",
      "Coordinated stakeholder logistics, events, and designed physical and digital IEC (Information, Education, & Communication) materials.",
      "Collaborated with NGOs, schools, and local businesses to maximize community engagement."
    ],
    capabilities: ["Project Management", "Solid Waste Management"],
    framework: "Community-Led Change Management"
  },
  {
    id: "stakeholder-registration",
    category: "Circular Economy & Resource Recovery",
    title: "Recycler Database & Onboarding Framework",
    organization: "Thooimai Mission",
    bulletPoints: [
      "Designed a robust stakeholder registration framework to formalize waste pickers and aggregators.",
      "Developed automated vendor onboarding processes and created a central database management system.",
      "Facilitated vertical integration between informal workers and formal recycling corporations."
    ],
    capabilities: ["Circular Economy", "Digital Transformation & Digital Governance", "Project Management"],
    framework: "Vendor Onboarding Flow & Database Schema"
  },
  {
    id: "rate-card-committee",
    category: "Circular Economy & Resource Recovery",
    title: "Rate Card Committee for Recyclables",
    organization: "Government of Tamil Nadu",
    bulletPoints: [
      "Prepared a standardized recyclable material pricing framework to prevent aggregator exploitation.",
      "Analysed raw market rates for plastics, glass, metals, and paper across India.",
      "Recommended standard procurement prices that were adopted statewide."
    ],
    capabilities: ["Circular Economy", "Financial Modelling", "Data Analytics"],
    framework: "Market Pricing Indexing"
  },
  {
    id: "waste-audits",
    category: "Research & Analytics",
    title: "Statewide Waste Composition & Audit Studies",
    organization: "Thooimai Mission",
    bulletPoints: [
      "Designed waste composition studies and analysed multi-city material recovery potential.",
      "Estimated potential direct revenue streams from recyclables and dry waste diversion.",
      "Developed data-backed policy recommendations for municipal infrastructure investments."
    ],
    capabilities: ["Research & Analytics", "Data Analytics", "Financial Modelling"],
    framework: "Waste Audit Methodology & Revenue Forecasting"
  },
  {
    id: "pilot-proposals-gcc",
    category: "Infrastructure Planning",
    title: "Infrastructure Pilot Proposals to GCC",
    organization: "Greater Chennai Corporation (GCC)",
    bulletPoints: [
      "Designed pilot implementation frameworks for modern waste recovery facilities.",
      "Conducted on-site infrastructure assessments and identified spatial bottlenecks.",
      "Prepared detailed investment estimates, cost sheets, and engineering-procurement plans."
    ],
    capabilities: ["Infrastructure Advisory", "Financial Modelling", "Procurement & Contract Management"],
    framework: "Capital Project Feasibility Study"
  },
  {
    id: "digital-governance-nic",
    category: "Digital Governance",
    title: "E-procurement System Integration with NIC",
    organization: "National Informatics Centre (NIC)",
    bulletPoints: [
      "Led technical and operational system integration discussions for e-procurement in the Thooimai Mission.",
      "Streamlined digital hierarchy and roles mapping for eproc login authentications.",
      "Prepared comprehensive impact reports and documentation for eGovernance Awards."
    ],
    capabilities: ["Digital Transformation & Digital Governance", "Programme Management Office (PMO)", "Procurement & Contract Management"],
    framework: "System Integration Mapping"
  },
  {
    id: "thooimai-budget-planning",
    category: "Finance & Administration",
    title: "Thooimai Mission Budget Planning",
    organization: "Thooimai Mission, Government of Tamil Nadu",
    bulletPoints: [
      "Supported the preparation of annual budget proposals for the Thooimai Mission by estimating financial requirements across programme components, including infrastructure development, capacity building, digital governance, monitoring systems, and administrative operations.",
      "Assisted in cost estimation, expenditure planning, budget justification, and fund allocation to ensure effective utilization of resources and alignment with the Mission's strategic objectives.",
      "Contributed to financial planning documents and supported discussions with government departments on budgetary requirements and implementation priorities."
    ],
    capabilities: [
      "Budget Planning",
      "Financial Analysis",
      "Cost Estimation",
      "Government Finance",
      "Resource Allocation",
      "Programme Budgeting",
      "Public Sector Financial Management"
    ],
    framework: "Programme Budgeting & Financial Planning"
  },
  {
    id: "capacity-building-vc",
    category: "Capacity Building",
    title: "Capacity Building & SOP Formulation",
    organization: "State Institute of Rural Development (SIRD)",
    bulletPoints: [
      "Developed Standard Operating Procedures (SOPs) for various government institutions and Bulk Waste Generators.",
      "Organized virtual coordination and implementation review meetings for over 40 regional offices.",
      "Designed instructional training modules and conducted rigorous Training Needs Assessments (TNA)."
    ],
    capabilities: ["Capacity Building & Training", "Project Management", "Programme Management Office (PMO)"],
    framework: "ADDIE Model & Operational SOPs"
  },
  {
    id: "field-visits-benchmarking",
    category: "Field Visits & Auditing",
    title: "Operational Benchmarking Field Audits",
    organization: "Various Locations (Indore, Kochi, GCC, 25 Tamil Nadu ULBs)",
    bulletPoints: [
      "Conducted operational evaluations and best practice benchmarking at the Indore Municipal Corporation (India's cleanest city).",
      "Performed technical assessments at the high-capacity Kochi BSF Plant.",
      "Audited daily waste collection routes and efficiency metrics in GCC Zone 11.",
      "Visited 25 Urban Local Bodies in Northern and Western Tamil Nadu to conduct gap analyses and prepare advisory reports."
    ],
    capabilities: ["Research & Analytics", "Solid Waste Management", "Government Advisory", "Environmental Consulting & ESG"],
    framework: "Operational Excellence & Gap Analysis"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "Global Online Certificate Course on 'Environment Data, Maps and GIS (Geographic Information System) for Communication in the 21st Century'",
    issuer: "Anil Agarwal Environment Training Institute (AAETI), Centre for Science and Environment (CSE), New Delhi",
    issueDate: "2024",
    skills: ["GIS Analysis", "Data Mapping", "Environmental Communication"]
  },
  {
    name: "Environmental Social Governance (ESG)",
    issuer: "Bloomberg",
    issueDate: "Dec 2025",
    credentialId: "4fFZpVDkWmXZcGouvZgKGPJF",
    skills: ["ESG Reporting", "Sustainability", "Materiality Analysis"]
  },
  {
    name: "Bloomberg Finance Fundamentals",
    issuer: "Bloomberg",
    issueDate: "Dec 2025",
    credentialId: "ZzHJL8dp248U6WfGecStFH87",
    skills: ["Corporate Finance", "Investment Analysis", "Financial Statements"]
  },
  {
    name: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    issueDate: "Jul 2025",
    skills: ["Structured Problem Solving", "Strategic Communication", "Leadership & Agile Work"]
  },
  {
    name: "Management Communication Online Series",
    issuer: "Harvard Business Publishing",
    issueDate: "Feb - Mar 2025",
    skills: ["Planning Business Communication", "Writing in Business", "Presenting in Business Section"]
  },
  {
    name: "Finance & Quantitative Methods Series",
    issuer: "Harvard Business Publishing",
    issueDate: "Apr 2025",
    skills: ["Ratio Analysis", "Cash Cycle and Growth", "Excel Spreadsheet Modeling", "Hypothesis Testing"]
  },
  {
    name: "Mathematics for Management",
    issuer: "Harvard Business Publishing",
    issueDate: "Apr 2025",
    skills: ["Applied Business Mathematics", "Analytical Forecasting"]
  },
  {
    name: "State Resource Person for Capacity Building SBM(G)",
    issuer: "Ministry of Jal Shakti, Government of India",
    issueDate: "Jul 2024",
    skills: ["Capacity Building", "Rural Sanitation", "SBM-G Guidelines"]
  },
  {
    name: "Data Analysis using R Programming",
    issuer: "The Research Wise",
    issueDate: "Sep 2025",
    skills: ["R Programming", "Statistical Modelling", "Data Visualization"]
  },
  {
    name: "Implementing Good Agricultural Practices (IndGAP)",
    issuer: "NIRDPR & National Institute of Rural Development",
    issueDate: "Jun 2024",
    skills: ["IndGAP Protocol", "Agricultural Compliance", "Quality Management"]
  },
  {
    name: "Business Intelligence using Microsoft Power BI",
    issuer: "Skill Nation",
    issueDate: "Jul 2023",
    skills: ["Power BI", "Data Modeling", "Interactive Dashboards"]
  }
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: "Delineation of Seasonal Rice Efficient Cropping Zones in Tamil Nadu, India",
    journal: "International Journal of Environment and Climate Change",
    publishDate: "Feb 5, 2026",
    coAuthors: ["S.K. Agri", "R. Swaminathan"],
    description: "Utilized spatial GIS analytics and multi-criteria decision-making to identify resilient agricultural zones for rice crops under changing climate trends, supporting regional agricultural policy."
  },
  {
    title: "Delineation and Mapping of Soil Properties of Anbil Dharmalingam Agricultural College & Research Institute Farm, Tiruchirappalli",
    journal: "International Journal of Theoretical and Applied Sciences",
    publishDate: "Jun 1, 2020",
    description: "Conducted high-precision grid soil sampling, chemical analysis, and spatial mapping to guide fertilizer application frameworks and enhance yield productivity."
  }
];

export const WORK_HISTORY = [
  {
    role: "Tamil Nadu Chief Minister's Fellow",
    organization: "Thooimai Mission & Directorate of Municipal Administration",
    duration: "April 2025 - Present (1 year 4 months)",
    location: "Chennai, Tamil Nadu, India",
    description: "Leading state-level strategic advisory and implementation workflows for Solid Waste Management and Circular Economy under the Chief Minister's fellowship. Managing multi-stakeholder interactions, drafting cabinet notes, setting up digital reporting frameworks, and conducting statewide operational audits."
  },
  {
    role: "Tamil Nadu Chief Minister's Fellow (Initial Phase)",
    organization: "Directorate of Municipal Administration",
    duration: "January 2025 - April 2025 (4 months)",
    location: "Chennai, Tamil Nadu, India",
    description: "Spearheaded initial diagnostic assessments, policy review of G.O. guidelines, and e-governance system blueprints."
  },
  {
    role: "Faculty cum State Resource Person",
    organization: "State Institute of Rural Development and Panchayat Raj, Tamilnadu",
    duration: "April 2023 - November 2024 (1 year 8 months)",
    location: "SIRD Campus, Tamil Nadu, India",
    description: "Designed and delivered training curricula, SOPs, and capacity building programs for government officers and elected representatives of rural local bodies of Tamil Nadu and on SBM(G), Tamil Nadu Panchayat Services Rules, Conduct Rules and Disciplinary procedures, erstwhile MGNREGS convergence with SDG - 2030, etc."
  }
];
