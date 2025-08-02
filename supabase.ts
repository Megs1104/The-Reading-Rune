import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nzziroohrdngtpurdfxm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56emlyb29ocmRuZ3RwdXJkZnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTgyMDMsImV4cCI6MjA2ODc3NDIwM30.gAqE_HHE_rXFPCE_-2AlrxMQFS4lYGOmrgu6oFzYx1U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
