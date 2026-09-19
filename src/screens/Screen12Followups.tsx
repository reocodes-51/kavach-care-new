import React, { useState } from 'react';

interface Screen12FollowupsProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen12Followups: React.FC<Screen12FollowupsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'High Priority' | 'Due Today' | 'Upcoming'>('All');

  const tasks = [
    {
      id: 1,
      title: 'High-risk pregnancy follow-up',
      priority: 'High Priority',
      priorityColor: 'red',
      patientId: 'Patient #KVC-1024',
      patientName: 'Sita Sharma',
      timing: 'Due today',
      targetScreen: 6
    },
    {
      id: 2,
      title: 'Hypertension review',
      priority: 'Follow-up',
      priorityColor: 'amber',
      patientId: 'Patient #KVC-1027',
      patientName: 'Bhikaji Shinde',
      timing: 'Due today',
      targetScreen: 9
    },
    {
      id: 3,
      title: 'Child vaccination',
      priority: 'Upcoming',
      priorityColor: 'emerald',
      patientId: 'Patient #KVC-1031',
      patientName: 'Baby of Rekha',
      timing: 'Due in 3 days',
      targetScreen: 9
    }
  ];

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'High Priority') return t.priorityColor === 'red';
    if (activeTab === 'Due Today') return t.timing.includes('Due today');
    if (activeTab === 'Upcoming') return t.priorityColor === 'emerald';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Post-Discharge Follow-up Tasks</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Frontline ASHA home recovery visits and clinical compliance queue.
          </p>
        </div>

        {/* Filter Tabs matching Screen 12 */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs">
          {(['All', 'High Priority', 'Due Today', 'Upcoming'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
                  isActive
                    ? 'bg-[#0F5B4E] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Task Cards matching Screen 12 */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  task.priorityColor === 'red'
                    ? 'bg-red-500'
                    : task.priorityColor === 'amber'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.priorityColor === 'red'
                        ? 'bg-red-100 text-red-800'
                        : task.priorityColor === 'amber'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {task.priority}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1">
                    {task.patientId} • <span className="font-semibold text-slate-700">{task.patientName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-slate-500 font-semibold text-[11px]">{task.timing}</span>
                <button
                  onClick={() => onNavigate(task.targetScreen)}
                  className="px-4 py-1.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white font-bold rounded-lg transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
