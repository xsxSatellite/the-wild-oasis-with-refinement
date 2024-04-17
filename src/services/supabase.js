import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rththeyfwdxqcojnywul.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aHRoZXlmd2R4cWNvam55d3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNzc5ODcsImV4cCI6MjAxNDY1Mzk4N30.WA6hVW5JEwqs3jeR6988oUkC9ILUE59mduu5WY5ZD1k";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };
export default supabase;
