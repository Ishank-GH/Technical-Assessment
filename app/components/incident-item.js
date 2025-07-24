"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const iconMap = {
  'Unauthorised Access': '/icons/unauthorised-access-icon.svg',
  'Gun Threat': '/icons/gun-threat-icon.svg',
  'Face Recognised': '/icons/face-recognised-icon.svg',
  'Multiple Events': '/icons/multiple-events-icon.svg',
  'Traffic Congestion': '/icons/traffic-congestion-icon.svg',
};

const formatDateTime = (start, end) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };

    const startTime = new Date(start).toLocaleTimeString([], options);
    const endTime = new Date(end).toLocaleTimeString([], options);
    const datePart = new Date(start).toLocaleDateString([], dateOptions).replace(/,/g, '');

    return `${startTime} - ${endTime} on ${datePart.replace(/ /g, '-')}`;
}

export default function IncidentItem({ incident, onResolve, isResolving }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true) }, []);

  const resolvingClasses = hasMounted && isResolving ? 'opacity-40 pointer-events-none' : 'opacity-100';
  const iconSrc = iconMap[incident.type] || '/icons/default-incident-icon.svg';
  const thumbnailIndex = ((incident.id - 1) % 5) + 1;

  return (
    <div className={`flex items-center gap-4 py-3 px-2 rounded-lg transition-all duration-300 ${resolvingClasses} hover:bg-gray-800/50`}>
      <Image
        src={`/thumbnails/thumb${thumbnailIndex}.png`}
        alt="Incident thumbnail"
        width={120}
        height={68}
        className="rounded-md object-cover w-[120px] h-[68px] flex-shrink-0"
      />
      <div className="flex-1 space-y-5">
        
        <div className="flex items-center gap-2">
          <Image src={iconSrc} alt={`${incident.type} icon`} width={16} height={16} />
          <p className="font-semibold text-white text-sm">{incident.type}</p>
        </div>
        
        <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
                <Image src="/icons/camera-icon.svg" alt="Location" width={12} height={12} />
                <span>{incident.camera.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock-icon.svg" alt="Time" width={12} height={12} />
                <span>
                {hasMounted ? formatDateTime(incident.tsStart, incident.tsEnd) : '...'}
                </span>
            </div>
        </div>
      </div>
      <button
        onClick={() => onResolve(incident.id)}
        disabled={hasMounted && isResolving}
        className="text-yellow-400 text-xs font-semibold flex items-center gap-1 hover:text-yellow-300 disabled:opacity-50 self-center"
      >
        {hasMounted && isResolving ? 'Resolving' : 'Resolve'} 
        <ChevronRight size={16} />
      </button>
    </div>
  );
}