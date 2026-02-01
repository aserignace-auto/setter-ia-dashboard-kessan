'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Zap, MessageSquare, Calendar } from 'lucide-react';
import { Lead } from '@/types/lead';
import Header from './Header';
import StatsCard from './StatsCard';
import Pipeline from './Pipeline';
import EfficiencyGauges from './EfficiencyGauges';
import ActivityFeed from './ActivityFeed';
import WeeklyChart from './WeeklyChart';
import LeadsTable from './LeadsTable';
import Notification from './Notification';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [previousLeadCount, setPreviousLeadCount] = useState(0);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Erreur de récupération');

      const data = await response.json();

      if (Array.isArray(data)) {
        if (previousLeadCount > 0 && data.length > previousLeadCount) {
          const newLeadsCount = data.length - previousLeadCount;
          setNotification(`${newLeadsCount} nouveau${newLeadsCount > 1 ? 'x' : ''} lead${newLeadsCount > 1 ? 's' : ''} !`);
        }
        setPreviousLeadCount(data.length);
        setLeads(data);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [previousLeadCount]);

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000);
    return () => clearInterval(interval);
  }, [fetchLeads]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchLeads();
  };

  const getStats = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: leads.length,
      newThisWeek: leads.filter(l => new Date(l.created_at) >= sevenDaysAgo).length,
      totalMessages: leads.reduce((acc, l) => acc + (l.historique_conversation?.length || 0), 0),
      rdvPris: leads.filter(l => l.rdv_pris).length,
    };
  };

  const stats = getStats();

  if (isLoading && leads.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-beige border-t-gold rounded-full animate-spin" />
          <p className="text-taupe font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}

        <Header
          onRefresh={handleRefresh}
          isConnected={isConnected}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Leads"
            value={stats.total}
            icon={Users}
            delay={0}
          />
          <StatsCard
            title="Nouveaux 7j"
            value={stats.newThisWeek}
            icon={Zap}
            delay={100}
          />
          <StatsCard
            title="Messages IA"
            value={stats.totalMessages}
            icon={MessageSquare}
            delay={200}
          />
          <StatsCard
            title="RDV Pris"
            value={stats.rdvPris}
            icon={Calendar}
            delay={300}
          />
        </div>

        {/* Pipeline & Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Pipeline leads={leads} />
          </div>
          <div>
            <EfficiencyGauges leads={leads} />
          </div>
        </div>

        {/* Activity Feed & Weekly Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityFeed leads={leads} />
          <WeeklyChart leads={leads} />
        </div>

        {/* Leads Table */}
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
