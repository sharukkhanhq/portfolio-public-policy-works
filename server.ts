import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Full-context resume text for Gemini prompt injection
const SHARUK_RESUME_CONTEXT = `
Candidate Profile: Sharuk Khan
LinkedIn: www.linkedin.com/in/sharuk-khan-agri
Email: sharukkhanhq@gmail.com
Current Role: Tamil Nadu Chief Minister's Fellow working with the Thooimai Mission & Directorate of Municipal Administration, Government of Tamil Nadu (April 2025 - Present, Chennai).
Previous Role: Faculty cum State Resource Person at State Institute of Rural Development and Panchayat Raj, Tamilnadu (April 2023 - November 2024).

Education:
1. Bharathidasan Institute of Management (BIM) Tiruchirappalli: Post Graduate Certificate in Public Policy and Management (Dec 2024).
2. Anbil Dharmalingam Agricultural College and Research Institute: Bachelor's degree, Agriculture (2016 - 2020).

Key Licenses & Certifications:
- Environmental Social Governance (Bloomberg, Dec 2025) - ID: 4fFZpVDkWmXZcGouvZgKGPJF
- Bloomberg Finance Fundamentals (Bloomberg, Dec 2025) - ID: ZzHJL8dp248U6WfGecStFH87
- Data Analysis using R Programming (The Research Wise, Sep 2025)
- McKinsey.org Forward Program (McKinsey & Company, Jul 2025)
- Harvard Business Publishing (HBP) Online Courses:
  * Finance (Apr 2025) - Ratio Analysis, Cash Cycle, Growth.
  * Quantitative Methods (Apr 2025) - Sampling, Hypothesis Testing.
  * Mathematics for Management (Apr 2025) - Applied Math.
  * Spreadsheet Modeling (Mar 2025) - Excel Models.
  * Management Communication (Feb-Mar 2025) - Planning, Writing, and Presenting in Business Section.
- Certification on State Resource Person for Capacity Building in SBM(G) (Ministry of Jal Shakti, Jul 2024).
- Good Agricultural Practices: IndGAP Process and Protocol for Certification (NIRDPR, Jun 2024).
- Business Intelligence using Microsoft Power BI (Skill Nation, Jul 2023).

Academic Publications:
1. "Delineation of Seasonal Rice Efficient Cropping Zones in Tamil Nadu, India" - International Journal of Environment and Climate Change (Feb 5, 2026).
2. "DELINEATION AND MAPPING OF SOIL PROPERTIES OF ANBIL DHARMALINGAM AGRICULTURAL COLLEGE & RESEARCH INSTITUTE FARM, TIRUCHIRAPPALLI" - International Journal of Theoretical and Applied Sciences (Jun 1, 2020).

Detailed Consulting Experience & Projects:
1. Strategic Planning & Policy Advisory:
   - 16F Proposal: Developed strategic proposals for mission expansion & institutional strengthening; prepared financial estimates, feasibility analyses, and evidence-based decision support.
   - Policy Note: Drafted a Cabinet/Department policy note tabled in the Tamil Nadu Assembly; conducted policy research and prepared roadmaps.
   - Government Orders (G.O. & G.O.13 SPID Amendment): Analysed G.O.s, prepared amendment notes, and assessed legal/administrative compliance.
   - Concept Notes: Designed innovative waste initiatives under the Thooimai Mission, prepared concept papers for pilots, and conducted stakeholder consultations.

2. Programme Design & Implementation:
   - Collection Drive 1.0 to 5.0: Designed a statewide recyclable waste collection campaign; developed operational guidelines, digital monitoring dashboards, and institutionalized recurring collection systems with integrated data reporting.
   - Kuppai Thiruvizha: Designed public awareness campaigns, managed events, and developed IEC (Information, Education, and Communication) materials.

3. Circular Economy & Resource Recovery:
   - Black Soldier Fly (BSF) Technology: Evaluated BSF organic waste processing and drafted implementation proposals.
   - Registration of Stakeholders: Designed a database management system, vendor onboarding process, and registration framework.
   - Rate Card Committee: Analysed market rates and prepared standard recyclable pricing frameworks for standard procurement.
   - Waste Aggregators Meet: Facilitated recycler ecosystem coordination and industry consultations.

4. Research & Analytics:
   - Waste Audit Documents: Designed waste composition studies, analysed material recovery potential, estimated recyclable revenues, and developed policy recommendations.
   - Research Papers: Conducted literature reviews and benchmarked global solid waste management practices.
   - Questionnaire & Surveys: Designed standardized surveys and field data collection methodologies.

5. Infrastructure Planning:
   - Pilot Proposals to GCC (Greater Chennai Corporation): Designed pilot frameworks, conducted infrastructure assessments, and estimated investment requirements.
   - Local Bodies Assessment: Conducted gap analysis and prepared advisory reports for Urban and Rural Local Bodies (ULBs/RLBs).
   - SWM Across States: Benchmarked best practices, compared policy frameworks, and identified scalable models.

6. Stakeholder Management & Meetings:
   - Prepared briefings and presentations for the Additional Chief Secretary, Commissioners, District Collectors, and State Level Nodal Officers.
   - Academic collaboration with IIT / Anna University.

7. Digital Governance:
   - NIC System Integration: E-procurement for Thooimai Mission; updated digital hierarchy for eproc logins.
   - eGovernance Awards: Documented impact reports for award submissions.

8. Finance, Administration & Compliance:
   - Managed budgets, financial planning, expenditure monitoring, and compiled a Finance Department Reference Manual.
   - Prepared technical RFPs, evaluation criteria, and addressed legal compliance via RTI replies.

9. Capacity Building & Field Visits:
   - VC coordination to 40 Offices, compiled Standard Operating Procedures (SOPs) for Bulk Waste Generators.
   - Conducted field visits to Kochi BSF Plant, Indore Corporation (best practice benchmarking), Kumbakonam Corporation, and GCC Zone 11.
   - SWM Conference in New Delhi; field visits to 25 ULBs across Northern and Western Tamil Nadu.
   - Designed and delivered capacity-building training modules for government officials.

Consulting Capabilities Demonstrated:
- Strategy & Management Consulting
- Public Policy Advisory
- Programme Management Office (PMO)
- Government Advisory
- Circular Economy & Solid Waste Management
- Environmental & ESG Consulting
- Infrastructure Advisory
- Financial Modelling & Budgeting
- Project Management & Analytics
- Stakeholder Engagement & Change Management
- Digital Transformation & Digital Governance
- Procurement & RFP Contract Management
- Capacity Building & Training
`;

// API endpoint for chatbot
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const client = getGeminiClient();

    // Map conversation messages to a flat prompt for gemini-3.5-flash
    // We can use the chat API or simple generateContent. Simple generateContent is very robust.
    const promptInstructions = `
      You are an elite, highly professional AI Consultant and Recruiter Assistant representing Sharuk Khan.
      Your goal is to showcase Sharuk Khan's qualifications, experience, and suitability for roles at Big 4 consulting firms (PwC, EY, KPMG, Deloitte) in India and globally.
      
      Analyze the recruiter's prompt and respond in an authoritative, professional, and data-driven tone.
      Use structured consulting frameworks (e.g., SWOT, MECE, Value Chain, GAP analysis, People-Process-Technology) where appropriate.
      Synthesize insights using quantitative metrics and project experiences from the resume.
      Always frame his agricultural background, public policy certificate from BIM, and Chief Minister's fellowship as a powerful combination of domain expertise (ESG, Sustainability, Agriculture) and public sector strategy execution.

      Candidate Context:
      ${SHARUK_RESUME_CONTEXT}

      Rules:
      - Never hallucinate or invent projects or certifications that are not listed in the resume.
      - Always relate answers back to consulting value (e.g., how his NIC e-procurement experience demonstrates Digital Transformation, or how 16F Proposal shows Financial Modelling).
      - Keep answers scannable with bullet points and bold terms.
      - If asked a question unrelated to Sharuk or consulting, politely redirect back to evaluating Sharuk for Big 4 advisory roles.

      Conversation history:
      ${messages.map(m => `${m.role === 'user' ? 'Recruiter' : 'AI Assistant'}: ${m.content}`).join('\n')}

      Generate the next assistant response:
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptInstructions,
      config: {
        temperature: 0.7,
        systemInstruction: "You are a professional consulting recruitment advisor. Formulate answers using professional formatting.",
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "An error occurred during generating content." });
  }
});

// Serve frontend
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
