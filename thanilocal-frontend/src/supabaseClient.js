import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zpmxgiiwrrlyevlthdhk.supabase.co";  // Replace with actual URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbXhnaWl3cnJseWV2bHRoZGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NzE0MjEsImV4cCI6MjA1NzU0NzQyMX0.dXSVFsw2ccXBxsiIb923YNjSWrHUmPbeJNe-wRca3vg"; // Replace with actual key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
