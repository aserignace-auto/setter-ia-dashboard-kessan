'use client';

import { Lead } from '@/types/lead';

interface LeadsTableProps {
  leads: Lead[];
}

function getStatusBadge(statut: string) {
  const styles: Record<string, string> = {
    nouveau: 'bg-blue-100 text-blue-700',
    en_cours: 'bg-yellow-100 text-yellow-700',
    qualifie: 'bg-green-100 text-green-700',
    rdv_pris: 'bg-purple-100 text-purple-700',
    perdu: 'bg-red-100 text-red-700',
  };

  const labels: Record<string, string> = {
    nouveau: 'Nouveau',
    en_cours: 'En cours',
    qualifie: 'Qualifié',
    rdv_pris: 'RDV Pris',
    perdu: 'Perdu',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[statut] || 'bg-gray-100 text-gray-700'}`}>
      {labels[statut] || statut}
    </span>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(nom: string | null, instagram_id: string): string {
  if (nom) {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  return instagram_id.slice(0, 2).toUpperCase();
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="luxury-card p-6 opacity-0 animate-fade-up" style={{ animationDelay: '800ms' }}>
      <h3 className="text-lg font-semibold text-brown-dark mb-4">Tous les leads</h3>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-beige">
              <th className="text-left py-3 px-4 text-sm font-semibold text-taupe">Lead</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-taupe">Plateforme</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-taupe">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-taupe">Statut</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-taupe">Relances</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-taupe">
                  Aucun lead pour le moment
                </td>
              </tr>
            ) : (
              leads.slice(0, 10).map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-beige/50 hover:bg-beige-light/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(lead.nom, lead.instagram_id)}
                      </div>
                      <div>
                        <p className="font-medium text-brown-dark">
                          {lead.nom || lead.instagram_id}
                        </p>
                        <p className="text-xs text-taupe">@{lead.instagram_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-brown">{lead.plateforme}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-taupe">{formatDate(lead.created_at)}</span>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(lead.statut)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-brown-dark">{lead.nb_relances}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
