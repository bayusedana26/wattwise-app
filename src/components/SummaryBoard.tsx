import React from 'react';
import { motion } from 'motion/react';
import { Zap, Info, Check } from 'lucide-react';
import { CalculatorTotals, Device } from '../types';
import { formatCurrency } from '../utils/constants';

interface SummaryBoardProps {
  totals: CalculatorTotals;
  devices: Device[];
  tariff: number;
}

export function SummaryBoard({ totals, devices, tariff }: SummaryBoardProps) {
  return (
    <div className="sticky top-10 space-y-10">
      {/* Main Summary Card */}
      <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Summary Board</h2>
            <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Estimate</div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Konsumsi Harian</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">{totals.dailyKwh.toFixed(2)}</span>
                <span className="text-slate-400 font-bold">kWh</span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Biaya Harian</p>
              <p className="text-2xl font-black text-red-600">{formatCurrency(totals.totalDailyCost)}</p>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Estimasi Tagihan Bulanan</p>
            <p className="text-5xl font-black tracking-tighter mb-4">{formatCurrency(totals.totalMonthlyCost)}</p>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold">
              <Info size={12} />
              <span>Sudah termasuk PPJ & Biaya Admin</span>
            </div>
          </div>

          {/* Token Status */}
          {totals.remainingTime && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center justify-between"
            >
              <div>
                <p className="text-amber-900/50 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Status Token</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-700">{totals.remainingTime.value}</span>
                  <span className="text-amber-800/60 font-bold text-sm">{totals.remainingTime.unit} Tersisa</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                <Zap size={24} fill="currentColor" />
              </div>
            </motion.div>
          )}

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total: {totals.monthlyKwh.toFixed(1)} kWh / Bln</span>
            </div>
            <Check size={16} className="text-slate-300" />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
            <Zap size={20} />
          </div>
          Analisis Penggunaan
        </h3>

        {devices.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <p className="text-xs text-slate-400 font-bold italic">Tambahkan perangkat untuk melihat analisis.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              {totals.topDevices.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold italic text-center">Hanya perangkat non-rutin yang dianalisis di sini.</p>
              ) : (
                totals.topDevices.map((d, i) => (
                  <div key={d.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-300 w-4">{i + 1}.</span>
                      <p className="text-sm font-black text-slate-700">{d.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(d.kwh / totals.dailyKwh) * 100}%` }}
                          className="h-full bg-red-500"
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 w-10 text-right">{Math.round((d.kwh / totals.dailyKwh) * 100)}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totals.topDevices.length > 0 && (
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">Rekomendasi Utama</p>
                <p className="text-sm font-bold text-red-900 leading-relaxed">
                  Optimalkan penggunaan <span className="font-black underline decoration-red-300 underline-offset-4">{totals.topDevices[0]?.name}</span> untuk menghemat hingga <span className="font-black text-red-600">{formatCurrency(totals.topDevices[0].kwh * tariff * 30 * 0.15)}</span> per bulan.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
