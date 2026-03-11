import React from 'react';
import { Calculator } from 'lucide-react';

interface ConfigSectionProps {
  tariff: number;
  ppj: number;
  fixedFee: number | '';
  currentKwh: number | '';
  setPpj: (value: number) => void;
  setFixedFee: (value: number | '') => void;
  setCurrentKwh: (value: number | '') => void;
  setIsModalOpen: (value: boolean) => void;
}

export function ConfigSection({
  tariff,
  ppj,
  fixedFee,
  currentKwh,
  setPpj,
  setFixedFee,
  setCurrentKwh,
  setIsModalOpen,
}: ConfigSectionProps) {
  return (
    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
          <Calculator size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Konfigurasi Biaya</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Golongan Tarif Listrik</label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-slate-900">Rp {tariff.toLocaleString('id-ID')}</span>
              <span className="text-slate-400 text-sm font-bold">/ kWh</span>
            </div>
            <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">Ubah Tarif →</span>
          </button>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Pajak (PPJ) % <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type="number"
              value={ppj}
              onChange={(e) => setPpj(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 outline-none transition-all font-bold text-slate-800"
              placeholder="Contoh: 10"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">%</span>
          </div>
        </div>

        <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Biaya Admin (Rp) <span className="text-slate-300 normal-case font-medium">(Opsional)</span></label>
          <div className="relative">
            <input
              type="number"
              max="9999999"
              value={fixedFee}
              onChange={(e) => setFixedFee(e.target.value === '' ? '' : Math.min(9999999, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 outline-none transition-all font-bold text-slate-800"
              placeholder="Contoh: 2500"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">Rp</span>
          </div>
          <p className="mt-2 ml-1 text-[10px] font-bold text-slate-400 italic">Biaya tambahan per bulan (misal: biaya admin bank/aplikasi).</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Sisa Token Saat Ini (kWh) <span className="text-slate-300 normal-case font-medium">(Opsional)</span></label>
          <div className="relative">
            <input
              type="number"
              max="999999"
              value={currentKwh}
              onChange={(e) => setCurrentKwh(e.target.value === '' ? '' : Math.min(999999, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition-all font-bold text-slate-800"
              placeholder="Contoh: 50.5 (Membantu prediksi waktu habis)"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">kWh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
