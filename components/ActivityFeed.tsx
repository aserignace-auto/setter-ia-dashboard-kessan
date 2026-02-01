'use client';

import { MessageSquare, Calendar, UserPlus, Clock } from 'lucide-react';
import { Lead } from '@/types/lead';

interface ActivityFeedProps {
  leads: Lead[];
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `${diffMins} min`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}j`;
}

function getActivityIcon(statut: string) {
  switch (statut) {
    case 'nouveau':
      return <UserPlus className="w-4 h-4 text-blue-500" />;
    case 'en_cours':
      return <MessageSquare className="w-4 h-4 text-gold" />;
    case 'qualifie':
      return <Clock className="w-4 h-4 text-green-500" />;
    case 'rdv_pris':
      return <Calendar className="w-4 h-4 text-purple-500" />;
    default:
      return <MessageSquare className="w-4 h-4 text-taupe" />;
  }
}

function getActivityText(lead: Lead): string {
  switch (lead.statut) {
    case 'nouveau':
      return `Nouveau lead : ${lead.nom || lead.instagram_id}`;
    case 'en_cours':
      return `Discussion en cours avec ${lead.nom || lead.instagram_id}`;
    case 'qualifie':
      return `${lead.nom || lead.instagram_id} qualifié`;
    case 'rdv_pris':
      return `RDV pris avec ${lead.nom || lead.instagram_id}`;
    default:
      return `Activité de ${lead.nom || lead.instagram_id}`;
  }
}

export default function ActivityFeed({ leads }: ActivityFeedProps) {
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 8);

  return (
    <div className="luxury-card p-6 opacity-0 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <h3 className="text-lg font-semibold text-brown-dark mb-4">Journal d'activité</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
        {recentLeads.length === 0 ? (
          <p className="text-taupe text-sm text-center py-4">Aucune activité récente</p>
        ) : (
          recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-beige-light/50 hover:bg-beige-light transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                {getActivityIcon(lead.statut)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown-dark truncate">
                  {getActivityText(lead)}
                </p>
                <p className="text-xs text-taupe">
                  {lead.plateforme}
                </p>
              </div>
              <span className="text-xs text-taupe-light whitespace-nowrap">
                {getRelativeTime(lead.updated_at)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
