// Ce fichier est réservé pour une utilisation côté serveur uniquement
// Les clés API ne sont JAMAIS exposées côté client

export const getSupabaseConfig = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Configuration Supabase manquante');
  }

  return { supabaseUrl, supabaseKey };
};
