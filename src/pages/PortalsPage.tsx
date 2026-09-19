import React from 'react';
import { RolePortalsSection } from '../components/home/RolePortalsSection';
import { UserCheck } from 'lucide-react';

export const PortalsPage: React.FC = () => {
  return (
    <div className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-white p-6 rounded border border-slate-200 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Role-Based Operational Access</span>
          </div>
          <h1 className="text-2xl font-bold text-[#123B63]">
            KAVACH CARE Stakeholder Operational Consoles
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Dedicated role views for rural Patients & Families, Frontline ASHA/ANM Workers, Primary Care Doctors & CHOs, CHC/District Hospital Desks, and District Chief Medical Officers.
          </p>
        </div>
      </div>

      <RolePortalsSection />
    </div>
  );
};
