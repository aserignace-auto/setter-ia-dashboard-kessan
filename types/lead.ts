export interface Lead {
  id: number;
  instagram_id: string;
  nom: string | null;
  plateforme: string;
  statut: 'nouveau' | 'en_cours' | 'qualifie' | 'rdv_pris' | 'perdu';
  historique_conversation: any[];
  nb_relances: number;
  derniere_relance: string | null;
  rdv_pris: boolean;
  date_rdv: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = Lead['statut'];
