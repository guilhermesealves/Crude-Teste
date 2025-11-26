import {createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://oqqnqjbhloqcwqrhezmx.supabase.co"
    ,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcW5xamJobG9xY3dxcmhlem14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzk4OTQsImV4cCI6MjA3OTcxNTg5NH0.rbEwcpORmwo8d-cUxQGr8dOLjQothY3xZcE0GplmNuQ")