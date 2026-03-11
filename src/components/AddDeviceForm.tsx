import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { Device } from '../types';

interface AddDeviceFormProps {
  onAddDevice: (device: Omit<Device, 'id'>) => void;
}

export function AddDeviceForm({ onAddDevice }: AddDeviceFormProps) {
  const [newDevice, setNewDevice] = useState({ 
    name: '', 
    watt: '', 
    duration: '', 
    unit: 'hour' as 'hour' | 'minute',
    isAlwaysOn: false 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const watt = parseFloat(newDevice.watt);
    let duration = parseFloat(newDevice.duration);
    let unit = newDevice.unit;

    // Reject extremely large numbers that could cause floating-point or layout issues
    if (watt > 999999 || duration > 999999) {
      alert('Input value is too large.');
      return;
    }

    if (newDevice.isAlwaysOn) {
      duration = 24;
      unit = 'hour';
    }

    if (!newDevice.name || isNaN(watt) || (!newDevice.isAlwaysOn && (isNaN(duration) || duration < 0)) || watt < 0) {
      return;
    }

    // Validation for max duration
    if (!newDevice.isAlwaysOn) {
      if (unit === 'hour' && duration > 24) {
        alert('Durasi maksimal adalah 24 jam per hari.');
        return;
      }
      if (unit === 'minute' && duration > 1440) {
        alert('Durasi maksimal adalah 1440 menit per hari.');
        return;
      }
    }

    // Sanitize string input to prevent any implicit script tags (React automatically escapes, but preventing control characters is good)
    const sanitizedName = newDevice.name.trim().replace(/[<>]/g, '').substring(0, 50);

    onAddDevice({
      name: sanitizedName || 'Unknown Device',
      watt,
      duration,
      unit,
      isAlwaysOn: newDevice.isAlwaysOn,
    });

    setNewDevice({ name: '', watt: '', duration: '', unit: 'hour', isAlwaysOn: false });
  };

  return (
    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
          <Plus size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Tambah Perangkat</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Nama Alat Elektronik <span className="text-red-500">*</span></label>
            <input
              type="text"
              maxLength={50}
              placeholder="Contoh: AC Inverter, Mesin Cuci, TV"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 outline-none transition-all font-bold text-slate-800"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1 h-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Daya (Watt) <span className="text-red-500">*</span></label>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Contoh: 350"
                value={newDevice.watt}
                onChange={(e) => setNewDevice({ ...newDevice, watt: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 outline-none transition-all font-bold text-slate-800"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">W</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1 h-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Durasi / Hari <span className="text-red-500">*</span></label>
              <button
                type="button"
                onClick={() => setNewDevice({ ...newDevice, isAlwaysOn: !newDevice.isAlwaysOn })}
                className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-all border ${
                  newDevice.isAlwaysOn 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                Selalu Aktif
              </button>
            </div>
            
            {!newDevice.isAlwaysOn ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    value={newDevice.duration}
                    onChange={(e) => setNewDevice({ ...newDevice, duration: e.target.value })}
                    className={`flex-1 px-5 py-4 bg-slate-50 rounded-2xl border focus:ring-4 outline-none transition-all font-bold text-slate-800 ${
                      (newDevice.unit === 'hour' && parseFloat(newDevice.duration) > 24) || (newDevice.unit === 'minute' && parseFloat(newDevice.duration) > 1440)
                        ? 'border-red-500 focus:ring-red-500/5 focus:border-red-500'
                        : 'border-slate-200 focus:ring-red-500/5 focus:border-red-500'
                    }`}
                  />
                  <select 
                    value={newDevice.unit}
                    onChange={(e) => setNewDevice({ ...newDevice, unit: e.target.value as 'hour' | 'minute' })}
                    className="px-4 py-4 bg-slate-100 rounded-2xl border border-slate-200 font-black text-slate-600 outline-none"
                  >
                    <option value="hour">Jam</option>
                    <option value="minute">Min</option>
                  </select>
                </div>
                {newDevice.unit === 'hour' && parseFloat(newDevice.duration) > 24 && (
                  <p className="text-[10px] font-bold text-red-500 ml-1">Durasi maksimal adalah 24 jam per hari.</p>
                )}
                {newDevice.unit === 'minute' && parseFloat(newDevice.duration) > 1440 && (
                  <p className="text-[10px] font-bold text-red-500 ml-1">Durasi maksimal adalah 1440 menit (24 jam) per hari.</p>
                )}
              </div>
            ) : (
              <div className="px-5 py-4 bg-red-50/50 rounded-2xl border border-red-100 text-red-700 font-bold text-sm flex items-center gap-2">
                <Zap size={14} fill="currentColor" />
                Dihitung 24 Jam Penuh
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!newDevice.name || !newDevice.watt || (!newDevice.isAlwaysOn && !newDevice.duration)}
          className="w-full bg-slate-900 hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-[0.98]"
        >
          <Plus size={20} strokeWidth={3} /> Tambahkan ke Daftar
        </button>
      </form>
    </section>
  );
}
