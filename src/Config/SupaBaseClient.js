import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lnbakgqzlshetvxpbhpi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYmFrZ3F6bHNoZXR2eHBiaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NDY4OTUsImV4cCI6MjAxMjQyMjg5NX0.zRZM61G4OMbakrSFicE17dGueWK4f7qhAZw9a6Rpaac'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

