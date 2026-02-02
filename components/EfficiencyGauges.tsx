'use client';

import { Lead } from '@/types/lead';

interface EfficiencyGaugesProps {
  leads: Lead[];
}

interface GaugeProps {
  value: number;
  label: string;
  color: string;
}

function CircularGauge({ value, label, color }: GaugeProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full circular-progress" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#EADDCA"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-brown-dark">{value}%</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-taupe text-center">{label}</p>
    </div>
  );
}

export default function EfficiencyGauges({ leads }: EfficiencyGaugesProps) {
  const total = leads.length || 1;
  const qualified = leads.filter(l => l.statut === 'qualifie' || l.statut === 'rdv_pris').length;
  const booked = leads.filter(l => l.statut === 'rdv_pris').length;

  const qualificationRate = Math.round((qualified / total) * 100);
  const conversionRate = Math.round((booked / total) * 100);

  return (
    <div className="luxury-card p-6 opacity-0 animate-fade-up" style={{ animationDelay: '500ms' }}>
      <h3 className="text-lg font-semibold text-brown-dark mb-6">Efficacité</h3>

      <div className="flex justify-around items-center">
        <CircularGauge
          value={qualificationRate}
          label="Taux de qualification"
          color="#D4AF37"
        />
        <CircularGauge
          value={conversionRate}
          label="Taux de conversion"
          color="#926239"
        />
      </div>
    </div>
  );
}
