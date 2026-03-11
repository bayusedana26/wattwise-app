import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, Info } from 'lucide-react';
import { TARIFF_DATA } from '../utils/constants';

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTariff: (value: number) => void;
}

export function TariffModal({ isOpen, onClose, onSelectTariff }: TariffModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-10 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-2xl text-white">
                  <Zap size={24} fill="currentColor" className="text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">Golongan Tarif</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update Maret 2026</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-8">
              <div className="grid grid-cols-1 gap-4">
                {TARIFF_DATA.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelectTariff(item.value);
                      onClose();
                    }}
                    className="flex items-center justify-between p-6 bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/5 rounded-[2rem] transition-all group text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{item.description}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-800">{item.label}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">Rp {item.value.toLocaleString('id-ID')}</p>
                      <p className="text-[10px] font-black text-slate-400 group-hover:text-red-600 transition-colors">Pilih Tarif</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-black">
                  <Info size={18} />
                  <span>Informasi Penting</span>
                </div>
                <ul className="text-xs text-amber-800/70 font-bold space-y-3 leading-relaxed">
                  <li className="flex gap-2"><span>•</span> <span>Tarif Adjustment PLN dapat berubah sewaktu-waktu sesuai kebijakan pemerintah.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>PPJ (Pajak Penerangan Jalan) bervariasi antara 3% hingga 10% tergantung wilayah.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>Daya 900 VA Subsidi khusus untuk masyarakat yang terdaftar di DTKS.</span></li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official PLN Data • Estimated Values</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
