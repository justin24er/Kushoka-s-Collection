import { supabase } from './supabaseClient';

supabase.from('images').select('*').then(console.log);