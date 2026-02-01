'use client';

import { Lead } from '@/types/lead';

interface PipelineProps {
  leads: Lead[];
}

export default function Pipeline({ leads }: PipelineProps) {
  const stages = [
    { key: 'nouveau', label: 'Nouveaux' },
    { key: 'en_cours', label: 'En cours' },
    { key: 'qualifie', label: 'Qualifiés' },
    { key: 'rdv_pris', label: 'Booking' },
  ];

  const getCounts = () => {
    return stages.map(stage => ({
      ...stage,
      count: leads.filter(lead => lead.statut === stage.key).length,
    }));
  };

  const stageCounts = getCounts();
  const total = leads.length || 1;

  return (
    <div className="luxury-card p-6 bg-gradient-to-br from-brown-dark to-brown opacity-0 animate-fade-up"
         style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg font-semibold text-beige-light mb-6">Pipeline de Conversion</h3>

      <div className="grid grid-cols-4 gap-4">
        {stageCounts.map((stage, index) => (
          <div key={stage.key} className="text-center">
            <div className="relative">
              <div className="text-3xl font-bold gold-gradient-text mb-2">
                {stage.count}
              </div>
              <div className="text-sm text-beige-light opacity-80">
                {stage.label}
              </div>
              <div className="mt-3 h-1.5 bg-brown rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all duration-1000"
                  style={{ width: `${(stage.count / total) * 100}%` }}
                />
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-gold hidden lg:block">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
