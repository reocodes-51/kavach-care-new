import React from 'react';
import type { UrgencyLevel, ReferralStatus } from '../../types';
import { AlertTriangle, Clock, CheckCircle2, ShieldCheck, Stethoscope, Truck } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  size?: 'sm' | 'md';
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, size = 'md' }) => {
  const isSm = size === 'sm';
  switch (urgency) {
    case 'URGENT':
      return (
        <span className={`inline-flex items-center gap-1 font-bold bg-red-100 text-red-800 border border-red-300 rounded ${isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <AlertTriangle className={isSm ? 'w-3 h-3 text-red-600' : 'w-3.5 h-3.5 text-red-600'} />
          <span>RED TAG • URGENT (108/102)</span>
        </span>
      );
    case 'HIGH':
      return (
        <span className={`inline-flex items-center gap-1 font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded ${isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <Clock className={isSm ? 'w-3 h-3 text-amber-600' : 'w-3.5 h-3.5 text-amber-600'} />
          <span>AMBER • HIGH PRIORITY (48H)</span>
        </span>
      );
    case 'ROUTINE':
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded ${isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <CheckCircle2 className={isSm ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />
          <span>GREEN • ROUTINE CARE</span>
        </span>
      );
  }
};

interface StatusBadgeProps {
  status: ReferralStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const baseClasses = `inline-flex items-center gap-1 font-semibold rounded ${isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'}`;

  switch (status) {
    case 'CREATED':
      return (
        <span className={`${baseClasses} bg-slate-100 text-slate-800 border border-slate-300`}>
          <Clock className="w-3 h-3 text-slate-500" />
          <span>Screened (Created)</span>
        </span>
      );
    case 'ACCEPTED':
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800 border border-blue-300`}>
          <ShieldCheck className="w-3 h-3 text-blue-600" />
          <span>Accepted by Facility</span>
        </span>
      );
    case 'APPOINTMENT':
      return (
        <span className={`${baseClasses} bg-indigo-100 text-indigo-800 border border-indigo-300`}>
          <Truck className="w-3 h-3 text-indigo-600" />
          <span>Slot & Transport Reserved</span>
        </span>
      );
    case 'ARRIVAL':
      return (
        <span className={`${baseClasses} bg-purple-100 text-purple-800 border border-purple-300`}>
          <Clock className="w-3 h-3 text-purple-600" />
          <span>Arrived at OPD/Emergency</span>
        </span>
      );
    case 'CONSULTATION':
      return (
        <span className={`${baseClasses} bg-teal-100 text-teal-800 border border-teal-300`}>
          <Stethoscope className="w-3 h-3 text-teal-700" />
          <span>Doctor Consultation</span>
        </span>
      );
    case 'TREATMENT':
      return (
        <span className={`${baseClasses} bg-amber-100 text-amber-800 border border-amber-300`}>
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Active Inpatient Care</span>
        </span>
      );
    case 'FOLLOWUP':
      return (
        <span className={`${baseClasses} bg-orange-100 text-orange-800 border border-orange-300`}>
          <Clock className="w-3 h-3 text-orange-600" />
          <span>ASHA Home Follow-up Pending</span>
        </span>
      );
    case 'COMPLETED':
      return (
        <span className={`${baseClasses} bg-emerald-100 text-emerald-800 border border-emerald-300`}>
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Closed-Loop Completed</span>
        </span>
      );
    default:
      return <span className={baseClasses}>{status}</span>;
  }
};
