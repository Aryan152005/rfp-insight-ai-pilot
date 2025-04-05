
// Custom type definitions to work with our Supabase tables
// These supplement the auto-generated types but don't replace them

export type Rfp = {
  id: string;
  title: string;
  agency: string | null;
  content: string | null;
  file_path: string | null;
  file_type: string | null;
  faiss_id: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export type CompanyProfile = {
  id: string;
  name: string;
  user_id: string | null;
  certifications: Record<string, any> | null;
  capabilities: Record<string, any> | null;
  locations: Record<string, any> | null;
  compliance_status: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export type AnalysisResult = {
  id: string;
  rfp_id: string;
  company_profile_id: string | null;
  eligibility_score: number | null;
  checklist: Record<string, any> | null;
  risk_flags: Record<string, any> | null;
  verdict: string | null;
  timestamp: string;
}

export type QALog = {
  id: string;
  rfp_id: string;
  query: string;
  response: string;
  sources: Record<string, any> | null;
  vector_used: boolean | null;
  document_source: string | null;
  timestamp: string;
}

export type AppSettings = {
  id: string;
  user_id: string | null;
  use_faiss: boolean;
  use_supabase: boolean;
  openai_key_provided: boolean;
  created_at: string;
  updated_at: string;
}
