import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Trash2 } from 'lucide-react';
import { Device } from '../types';

interface DeviceListProps {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  onRemove: (id: string) => void;
}

export function DeviceList({ devices, setDevices, onRemove }: DeviceListProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black text-slate-900">Daftar Perangkat</h2>
        {devices.length > 0 && (
          <button 
            onClick={() => confirm('Hapus semua?') && setDevices([])}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors"
          >
            Hapus Semua
          </button>
        )}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {devices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Zap size={40} />
              </div>
              <p className="text-slate-400 font-bold">Belum ada perangkat yang terdaftar.</p>
              <p className="text-slate-300 text-sm mt-1">Gunakan formulir di atas untuk memulai.</p>
            </motion.div>
          ) : (
            devices.map((device) => (
              <motion.div
                key={device.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${device.isAlwaysOn ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                    <Zap size={24} fill={device.isAlwaysOn ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">{device.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{device.watt}W</span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {device.isAlwaysOn ? '24 Jam' : `${device.duration}${device.unit === 'hour' ? 'j' : 'm'}`}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                        {((device.watt / 1000) * (device.unit === 'hour' ? device.duration : device.duration / 60)).toFixed(2)} kWh / hari
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(device.id)}
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
