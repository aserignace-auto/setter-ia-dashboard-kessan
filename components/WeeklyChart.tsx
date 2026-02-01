'use client';

import { Lead } from '@/types/lead';

interface WeeklyChartProps {
  leads: Lead[];
}

export default function WeeklyChart({ leads }: WeeklyChartProps) {
  const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const getWeekData = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - todayIndex);
    weekStart.setHours(0, 0, 0, 0);

    return days.map((day, index) => {
      const dayStart = new Date(weekStart);
      dayStart.setDate(dayStart.getDate() + index);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= dayStart && leadDate < dayEnd;
      }).length;

      return { day, count, isToday: index === todayIndex };
    });
  };

  const weekData = getWeekData();
  const maxCount = Math.max(...weekData.map(d => d.count), 1);

  return (
    <div className="luxury-card p-6 opacity-0 animate-fade-up" style={{ animationDelay: '700ms' }}>
      <h3 className="text-lg font-semibold text-brown-dark mb-6">Leads cette semaine</h3>

      <div className="flex items-end justify-between h-40 gap-2">
        {weekData.map(({ day, count, isToday }) => (
          <div key={day} className="flex flex-col items-center flex-1">
            <div className="relative w-full flex justify-center mb-2">
              <div
                className={`w-8 sm:w-10 rounded-t-lg transition-all duration-700 ${
                  isToday
                    ? 'bg-gradient-to-t from-brown-dark to-brown'
                    : 'bg-beige-light'
                }`}
                style={{
                  height: `${Math.max((count / maxCount) * 120, 8)}px`,
                }}
              />
              {count > 0 && (
                <span className={`absolute -top-5 text-xs font-semibold ${
                  isToday ? 'text-brown-dark' : 'text-taupe'
                }`}>
                  {count}
                </span>
              )}
            </div>
            <span className={`text-xs font-medium ${
              isToday ? 'text-brown-dark' : 'text-taupe-light'
            }`}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
