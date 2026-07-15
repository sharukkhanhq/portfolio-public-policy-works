export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  organization: string;
  duration?: string;
  bulletPoints: string[];
  capabilities: string[]; // references to overall consulting capabilities
  framework?: string; // a consulting framework that applies to this, e.g. "MECE Framework", "Value Chain"
}

export interface CapabilityItem {
  name: string;
  category: "Strategy & Advisory" | "Operations & Delivery" | "Specialized Domains";
  description: string;
  impactMetrics?: string; // Quantitative consulting-style impact
  framework?: string; // Consulting framework
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skills: string[];
}

export interface PublicationItem {
  title: string;
  journal: string;
  publishDate: string;
  coAuthors?: string[];
  description: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
