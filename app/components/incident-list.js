"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import IncidentItem from './incident-item';
import DashboardHeader from './dashboard-header';

export default function IncidentList({ incidents, resolvedCount }) {
  const [displayIncidents, setDisplayIncidents] = useState(incidents);
  const [currentResolvedCount, setCurrentResolvedCount] = useState(resolvedCount);
  const [resolvingId, setResolvingId] = useState(null);

  const handleResolve = async (incidentId) => {
    if (resolvingId) return;
    setResolvingId(incidentId);

    const response = await fetch(`/api/incidents/${incidentId}/resolve`, { method: 'PATCH' });

    if (response.ok) {
      toast.success('Incident has been resolved.');
      setCurrentResolvedCount(count => count + 1); 
      setTimeout(() => {
        setDisplayIncidents(current => current.filter(i => i.id !== incidentId));
        setResolvingId(null);
      }, 500);
    } else {
      toast.error('Failed to resolve incident.');
      setResolvingId(null);
    }
  };

  return (
    <div className="bg-[#101214] border border-gray-700/50 rounded-lg h-full flex flex-col p-5">
      <DashboardHeader unresolvedCount={displayIncidents.length} resolvedCount={currentResolvedCount} />
      <div className="mt-4 space-y-2 overflow-y-auto flex-1 pr-4 hide-scrollbar">
        {displayIncidents.map((incident) => (
          <IncidentItem
            key={incident.id}
            incident={incident}
            onResolve={handleResolve}
            isResolving={resolvingId === incident.id}
          />
        ))}
      </div>
    </div>
  );
}