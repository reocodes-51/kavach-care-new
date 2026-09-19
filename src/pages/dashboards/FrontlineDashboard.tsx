import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { patientService, type PatientRecord } from '../../services/patientService';
import { screeningService } from '../../services/screeningService';
import { referralService, type ReferralRecord } from '../../services/referralService';
import { followupService, type FollowUpRecord } from '../../services/followupService';
import { facilityService, type FacilityData } from '../../services/facilityService';
import {
  Users,
  UserPlus,
  Stethoscope,
  Share2,
  CalendarCheck,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  Plus,
  AlertCircle
} from 'lucide-react';

export const FrontlineDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'register' | 'screening' | 'referrals' | 'followups'>('overview');

  // Offline queue support
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<any[]>(() => {
    try {
      const q = localStorage.getItem('kavach_offline_queue');
      return q ? JSON.parse(q) : [];
    } catch {
      return [];
    }
  });

  // Backend state
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [followups, setFollowups] = useState<FollowUpRecord[]>([]);
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regGender, setRegGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [regPhone, setRegPhone] = useState('');
  const [regVillage, setRegVillage] = useState(user?.assignedVillage || 'Bilkisganj');
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // Screening form state
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [selectedPills, setSelectedPills] = useState<string[]>(['High Fever', 'Severe Headache']);
  const [systolicBP, setSystolicBP] = useState(130);
  const [diastolicBP, setDiastolicBP] = useState(85);
  const [tempF, setTempF] = useState(101);
  const [pulse, setPulse] = useState(88);
  const [screeningSuccess, setScreeningSuccess] = useState<any | null>(null);

  // Referral form state
  const [refPatientId, setRefPatientId] = useState('');
  const [refFacilityId, setRefFacilityId] = useState('');
  const [refSpecialty, setRefSpecialty] = useState('Obstetrics & Gynaecology');
  const [refSummary, setRefSummary] = useState('');
  const [refPriority, setRefPriority] = useState<'ROUTINE' | 'URGENT' | 'EMERGENCY'>('URGENT');
  const [refSuccess, setRefSuccess] = useState<string | null>(null);

  // Network online/offline detection & auto-sync
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      // Auto-sync pending records
      const savedQueue = localStorage.getItem('kavach_offline_queue');
      if (savedQueue) {
        const queue = JSON.parse(savedQueue);
        if (queue.length > 0) {
          setSyncing(true);
          try {
            for (const item of queue) {
              if (item.type === 'PATIENT') {
                await patientService.createPatient(item.data);
              } else if (item.type === 'SCREENING') {
                await screeningService.createScreening(item.data);
              }
            }
            localStorage.removeItem('kavach_offline_queue');
            setOfflineQueue([]);
            await loadData();
          } catch (syncErr) {
            console.error('Failed to sync offline records:', syncErr);
          } finally {
            setSyncing(false);
          }
        }
      }
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pts, refs, fols, facs] = await Promise.all([
        patientService.getPatients(),
        referralService.getReferrals(),
        followupService.getFollowUps(),
        facilityService.getFacilities()
      ]);
      setPatients(pts.patients || []);
      setReferrals(refs.referrals || []);
      setFollowups(fols.followups || []);
      setFacilities(facs.facilities || []);
      if (pts.patients?.length > 0 && !selectedPatientId) {
        setSelectedPatientId(pts.patients[0]._id);
        setRefPatientId(pts.patients[0]._id);
      }
      if (facs.facilities?.length > 0 && !refFacilityId) {
        setRefFacilityId(facs.facilities[0]._id);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the healthcare server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save registration (Online or Offline Queue)
  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(null);

    const patientPayload = {
      name: regName,
      age: Number(regAge),
      gender: regGender,
      phone: regPhone,
      village: regVillage,
      district: 'Sehore',
      state: 'Madhya Pradesh'
    };

    if (!isOnline) {
      // Save locally to offline queue
      const updatedQueue = [...offlineQueue, { type: 'PATIENT', data: patientPayload, timestamp: new Date() }];
      setOfflineQueue(updatedQueue);
      localStorage.setItem('kavach_offline_queue', JSON.stringify(updatedQueue));
      setRegSuccess('Offline Mode: Patient saved to local device cache. Will auto-sync once online.');
      setRegName('');
      setRegAge('');
      setRegPhone('');
      return;
    }

    try {
      const res = await patientService.createPatient(patientPayload);
      setRegSuccess(`Patient registered successfully! KVC ID: ${res.patient.kvcId}`);
      setRegName('');
      setRegAge('');
      setRegPhone('');
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to register patient');
    }
  };

  // Run screening (Online or Offline Queue)
  const handleCreateScreening = async (e: React.FormEvent) => {
    e.preventDefault();
    setScreeningSuccess(null);

    const symptoms = [...selectedPills];
    if (symptomsInput.trim()) symptoms.push(symptomsInput.trim());

    const screeningPayload = {
      patientId: selectedPatientId,
      symptoms,
      vitals: {
        bloodPressureSys: systolicBP,
        bloodPressureDia: diastolicBP,
        temperatureF: tempF,
        pulseRate: pulse
      },
      duration: '3 days'
    };

    if (!isOnline) {
      const updatedQueue = [...offlineQueue, { type: 'SCREENING', data: screeningPayload, timestamp: new Date() }];
      setOfflineQueue(updatedQueue);
      localStorage.setItem('kavach_offline_queue', JSON.stringify(updatedQueue));
      setScreeningSuccess({
        riskLevel: systolicBP > 150 ? 'HIGH' : 'MODERATE',
        aiSummary: {
          title: 'AI-assisted screening summary (Offline Evaluated)',
          clinicalObservation: `Offline recorded: Symptoms: ${symptoms.join(', ')}. BP: ${systolicBP}/${diastolicBP}.`,
          priorityNotice: 'Risk Prioritization: Queued for clinical review',
          recommendedFacilityType: 'CHC',
          suggestedActions: ['Keep patient hydrated', 'Visit scheduled upon reconnection'],
          disclaimer: 'AI assists healthcare workflows. Final clinical review required.'
        }
      });
      return;
    }

    try {
      const res = await screeningService.createScreening(screeningPayload);
      setScreeningSuccess(res.screening);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to generate screening');
    }
  };

  // Create Referral
  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setRefSuccess(null);
    try {
      const res = await referralService.createReferral({
        patientId: refPatientId,
        toFacilityId: refFacilityId,
        specialtyRequired: refSpecialty,
        clinicalSummary: refSummary || 'Referred for specialist evaluation',
        priority: refPriority
      });
      setRefSuccess(`Referral created: ${res.referral.referralCode} (${refPriority})`);
      setRefSummary('');
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create referral');
    }
  };

  // Complete Followup Task
  const handleCompleteFollowup = async (id: string) => {
    try {
      await followupService.updateFollowUp(id, { status: 'COMPLETED', notes: 'Home visit completed with vitals recorded.' });
      loadData();
    } catch (err: any) {
      alert('Failed to mark follow-up completed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Offline / Online Sync Banner */}
        {!isOnline && (
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900 shadow-xs">
            <div className="flex items-center gap-2 font-bold">
              <WifiOff className="w-4 h-4 text-amber-700" />
              <span>Offline Mode Active: Changes will be stored in device cache and synchronized automatically when internet is restored.</span>
            </div>
            <span className="font-mono bg-amber-200 px-2 py-0.5 rounded text-[11px]">
              {offlineQueue.length} pending
            </span>
          </div>
        )}

        {syncing && (
          <div className="bg-blue-50 border border-blue-300 p-3 rounded-xl flex items-center gap-2 text-xs text-blue-900 font-bold animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-700" />
            <span>Synchronizing offline records with national health database...</span>
          </div>
        )}

        {/* Frontline Worker Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F5B4E] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              ASHA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user?.name || 'Sunita Madavi'}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  Frontline Worker
                </span>
                {isOnline ? (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    <Wifi className="w-3 h-3" /> Online
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold">
                    <WifiOff className="w-3 h-3" /> Offline
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Village: <strong>{user?.assignedVillage || 'Bilkisganj'}</strong> • ID: ASHA-MP-1042 • Sehore, MP
              </p>
            </div>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs overflow-x-auto scrollbar-thin">
          {[
            { id: 'overview', label: 'Console Overview', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'patients', label: `Village Patients (${patients.length})`, icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'register', label: 'Register Patient', icon: <UserPlus className="w-3.5 h-3.5" /> },
            { id: 'screening', label: 'AI Triage Screening', icon: <Stethoscope className="w-3.5 h-3.5" /> },
            { id: 'referrals', label: `Referrals (${referrals.length})`, icon: <Share2 className="w-3.5 h-3.5" /> },
            { id: 'followups', label: `Follow-ups (${followups.filter(f => f.status === 'PENDING').length} Due)`, icon: <CalendarCheck className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0F5B4E] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Loading frontline health worker workspace...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-3xl font-black text-slate-900">{patients.length}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Registered Patients</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs">
                    <div className="text-3xl font-black text-blue-600">
                      {referrals.filter(r => r.currentStatus !== 'COMPLETED').length}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Active In-Transit Referrals</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-2xs">
                    <div className="text-3xl font-black text-red-600">
                      {referrals.filter(r => r.priority === 'URGENT' || r.priority === 'EMERGENCY').length}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">High-Risk Cases</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-3xl font-black text-emerald-700">
                      {followups.filter(f => f.status === 'PENDING').length}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Home Visits Due Today</div>
                  </div>
                </div>

                {/* Priority Follow-up Tasks */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Today's Priority Outreach Queue</h3>
                    <span className="text-xs text-emerald-700 font-bold">ASHA Sangini Protocol</span>
                  </div>

                  <div className="space-y-3">
                    {followups.filter(f => f.status === 'PENDING').slice(0, 3).map((f) => (
                      <div key={f._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              f.priorityColor === 'red' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {f.priority}
                            </span>
                            <span className="font-bold text-slate-900 text-sm">{f.title}</span>
                          </div>
                          <div className="text-slate-500 mt-1">
                            Patient: <strong>{f.patient?.name}</strong> • {f.reason} • {f.dueDate}
                          </div>
                        </div>

                        <button
                          onClick={() => handleCompleteFollowup(f._id)}
                          className="px-4 py-2 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
                        >
                          Mark Completed
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PATIENTS TAB */}
            {activeTab === 'patients' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Registered Village Citizens</h3>
                  <button
                    onClick={() => setActiveTab('register')}
                    className="px-3 py-1.5 bg-[#0F5B4E] text-white font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Patient</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {patients.map((p) => (
                    <div key={p._id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                          <span className="font-mono text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            {p.kvcId}
                          </span>
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          {p.age} yrs • {p.gender} • Phone: {p.phone} • Village: {p.village}
                        </div>
                        <div className="text-slate-400 font-mono text-[10px]">ABHA: {p.abhaId}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedPatientId(p._id);
                            setActiveTab('screening');
                          }}
                          className="px-3 py-1.5 border border-emerald-600 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg font-bold"
                        >
                          Screen
                        </button>
                        <button
                          onClick={() => {
                            setRefPatientId(p._id);
                            setActiveTab('referrals');
                          }}
                          className="px-3 py-1.5 bg-[#0F5B4E] text-white rounded-lg font-bold"
                        >
                          Refer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REGISTER PATIENT TAB */}
            {activeTab === 'register' && (
              <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">New Patient Registration</h3>
                  <p className="text-xs text-slate-500">Auto-generates verified ABHA and KVC health identification records.</p>
                </div>

                {regSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>{regSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterPatient} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Patient Full Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Age</label>
                      <input
                        type="number"
                        required
                        value={regAge}
                        onChange={(e) => setRegAge(e.target.value)}
                        placeholder="45"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Gender</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98263 00000"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Village</label>
                    <input
                      type="text"
                      required
                      value={regVillage}
                      onChange={(e) => setRegVillage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg text-sm shadow-xs transition-colors"
                  >
                    Save & Generate ABHA Identifier
                  </button>
                </form>
              </div>
            )}

            {/* SCREENING TAB */}
            {activeTab === 'screening' && (
              <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI-Assisted Screening & Clinical Triage</h3>
                  <p className="text-xs text-slate-500">Evaluates vitals and symptoms under ICMR Standard Treatment Guidelines.</p>
                </div>

                <form onSubmit={handleCreateScreening} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Patient</label>
                    <select
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                    >
                      {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} ({p.kvcId} • {p.village})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Symptom Pills */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Common Symptoms (Tap to toggle):</label>
                    <div className="flex flex-wrap gap-1.5">
                      {['High Fever', 'Severe Headache', 'Chest Pain', 'Shortness of Breath', 'Vomiting', 'Pedal Edema', 'Abdominal Pain', 'High BP'].map((pill) => {
                        const active = selectedPills.includes(pill);
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => {
                              setSelectedPills(prev =>
                                active ? prev.filter(p => p !== pill) : [...prev, pill]
                              );
                            }}
                            className={`px-3 py-1.5 rounded-full font-bold transition-colors ${
                              active
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Additional Symptoms / Free-text</label>
                    <textarea
                      rows={2}
                      value={symptomsInput}
                      onChange={(e) => setSymptomsInput(e.target.value)}
                      placeholder="Describe patient's condition in plain English, Hindi, or Marathi..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1 text-[11px]">Systolic BP</label>
                      <input
                        type="number"
                        value={systolicBP}
                        onChange={(e) => setSystolicBP(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1 text-[11px]">Diastolic BP</label>
                      <input
                        type="number"
                        value={diastolicBP}
                        onChange={(e) => setDiastolicBP(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1 text-[11px]">Temp (°F)</label>
                      <input
                        type="number"
                        value={tempF}
                        onChange={(e) => setTempF(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1 text-[11px]">Pulse (bpm)</label>
                      <input
                        type="number"
                        value={pulse}
                        onChange={(e) => setPulse(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg text-sm shadow-xs transition-colors"
                  >
                    Run AI Triage & Match Facility
                  </button>
                </form>

                {/* Screening Output Card */}
                {screeningSuccess && (
                  <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        {screeningSuccess.aiSummary.title}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                        screeningSuccess.riskLevel === 'HIGH' || screeningSuccess.riskLevel === 'CRITICAL'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {screeningSuccess.riskLevel} PRIORITY
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {screeningSuccess.aiSummary.clinicalObservation}
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 text-slate-800 space-y-1">
                      <div className="font-bold text-emerald-900">Recommended Action Plan:</div>
                      {screeningSuccess.aiSummary.suggestedActions?.map((act: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      "{screeningSuccess.aiSummary.disclaimer}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div className="space-y-6">
                {/* Create Referral Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-900">Issue Inward Hospital Referral</h3>

                  {refSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>{refSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateReferral} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Patient</label>
                        <select
                          value={refPatientId}
                          onChange={(e) => setRefPatientId(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                        >
                          {patients.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.name} ({p.kvcId})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Destination Facility</label>
                        <select
                          value={refFacilityId}
                          onChange={(e) => setRefFacilityId(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                        >
                          {facilities.map((fac) => (
                            <option key={fac._id} value={fac._id}>
                              {fac.name} ({fac.distanceKm} km • {fac.bedCapacity.available} beds)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Specialty Required</label>
                        <input
                          type="text"
                          required
                          value={refSpecialty}
                          onChange={(e) => setRefSpecialty(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Priority</label>
                        <select
                          value={refPriority}
                          onChange={(e) => setRefPriority(e.target.value as any)}
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                        >
                          <option value="ROUTINE">Routine Consultation</option>
                          <option value="URGENT">Urgent (Within 24 Hours)</option>
                          <option value="EMERGENCY">Emergency (108 Ambulance Immediate)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Clinical Handover Summary</label>
                      <textarea
                        rows={2}
                        required
                        value={refSummary}
                        onChange={(e) => setRefSummary(e.target.value)}
                        placeholder="Vitals, symptoms, provisional diagnosis, and special care during transport..."
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg text-sm shadow-xs transition-colors"
                    >
                      Issue Digital Referral Package & Reserve Slot
                    </button>
                  </form>
                </div>

                {/* Existing Referrals Table */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <h3 className="text-base font-bold text-slate-900">Village Referrals Roster</h3>
                  <div className="divide-y divide-slate-100">
                    {referrals.map((ref) => (
                      <div key={ref._id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-mono font-bold text-slate-900">{ref.referralCode}</div>
                          <div className="text-slate-500">
                            Patient: <strong>{ref.patient?.name}</strong> • To: {ref.toFacility?.name}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ref.currentStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FOLLOWUPS TAB */}
            {activeTab === 'followups' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Post-Discharge Outreach & Home Recovery Visits</h3>
                  <span className="text-slate-500 font-semibold">{followups.length} Total Assigned</span>
                </div>

                <div className="space-y-3">
                  {followups.map((f) => (
                    <div
                      key={f._id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              f.priorityColor === 'red'
                                ? 'bg-red-100 text-red-800'
                                : f.priorityColor === 'amber'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {f.priority}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{f.title}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono">
                            {f.status}
                          </span>
                        </div>
                        <div className="text-slate-600 mt-1">
                          Patient: <strong>{f.patient?.name}</strong> ({f.patient?.village}) • {f.reason}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">Due: {f.dueDate}</div>
                      </div>

                      {f.status === 'PENDING' ? (
                        <button
                          onClick={() => handleCompleteFollowup(f._id)}
                          className="px-4 py-2 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
