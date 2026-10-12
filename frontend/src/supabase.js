import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pqgipfywatrscqaxauzl.supabase.co'
const supabaseAnonKey = 'sb_publishable_RvNiNf9skfJ-sJIo2n_0lg_SMCfE-b5' // Įsirašyk pilną savo Publishable key iš praeitos lentelės

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
