import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Zap, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { Device } from './types';
import { ConfigSection } from './components/ConfigSection';
import { AddDeviceForm } from './components/AddDeviceForm';
import { DeviceList } from './components/DeviceList';
import { SummaryBoard } from './components/SummaryBoard';
import { TariffModal } from './components/TariffModal';

export default function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [tariff, setTariff] = useState<number>(1444.7);
  const [ppj, setPpj] = useState<number>(10);
  const [fixedFee, setFixedFee] = useState<number | ''>('');
  const [currentKwh, setCurrentKwh] = useState<number | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Security: Sanitize and validate localStorage data
  const sanitizeData = useCallback((data: any, type: 'devices' | 'settings') => {
    try {
      const parsed = JSON.parse(data);
      if (type === 'devices' && Array.isArray(parsed)) {
        return parsed.filter(d => 
          typeof d.id === 'string' && 
          typeof d.name === 'string' && 
          typeof d.watt === 'number' && 
          typeof d.duration === 'number' &&
          (d.unit === 'hour' || d.unit === 'minute')
        );
      }
      if (type === 'settings' && typeof parsed === 'object') {
        return {
          tariff: typeof parsed.tariff === 'number' ? parsed.tariff : 1444.7,
          ppj: typeof parsed.ppj === 'number' ? parsed.ppj : 10,
          fixedFee: typeof parsed.fixedFee === 'number' ? parsed.fixedFee : '',
          currentKwh: typeof parsed.currentKwh === 'number' ? parsed.currentKwh : '',
        };
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
    return null;
  }, []);

  useEffect(() => {
    const savedDevices = localStorage.getItem('electricity_calculator_devices');
    const savedSettings = localStorage.getItem('electricity_calculator_settings');
    
    if (savedDevices) {
      const sanitized = sanitizeData(savedDevices, 'devices');
      if (sanitized) setDevices(sanitized);
    }
    if (savedSettings) {
      const sanitized = sanitizeData(savedSettings, 'settings');
      if (sanitized) {
        setTariff(sanitized.tariff);
        setPpj(sanitized.ppj);
        setFixedFee(sanitized.fixedFee);
        setCurrentKwh(sanitized.currentKwh);
      }
    }
  }, [sanitizeData]);

  useEffect(() => {
    localStorage.setItem('electricity_calculator_devices', JSON.stringify(devices));
    localStorage.setItem('electricity_calculator_settings', JSON.stringify({ tariff, ppj, fixedFee, currentKwh }));
  }, [devices, tariff, ppj, fixedFee, currentKwh]);

  const handleAddDevice = (deviceData: Omit<Device, 'id'>) => {
    const device: Device = {
      id: crypto.randomUUID(),
      ...deviceData
    };
    setDevices([...devices, device]);
  };

  const totals = useMemo(() => {
    const dailyKwh = devices.reduce((sum, d) => {
      const hours = d.unit === 'hour' ? d.duration : d.duration / 60;
      return sum + (d.watt / 1000) * hours;
    }, 0);

    const baseDailyCost = dailyKwh * tariff;
    const dailyPpj = baseDailyCost * (ppj / 100);
    const totalDailyCost = baseDailyCost + dailyPpj;
    
    const monthlyKwh = dailyKwh * 30;
    const monthlyBaseCost = monthlyKwh * tariff;
    const monthlyPpj = monthlyBaseCost * (ppj / 100);
    const totalMonthlyCost = monthlyBaseCost + monthlyPpj + (typeof fixedFee === 'number' ? fixedFee : 0);

    // Remaining time calculation - Convert to Days and Hours
    let remainingTime = null;
    if (typeof currentKwh === 'number' && dailyKwh > 0) {
      const totalHours = Math.floor(currentKwh / dailyKwh * 24);
      if (totalHours >= 24) {
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        remainingTime = { 
          value: days.toLocaleString('id-ID'), 
          unit: hours > 0 ? `Hari ${hours} Jam` : 'Hari' 
        };
      } else {
        remainingTime = { value: totalHours.toLocaleString('id-ID'), unit: 'Jam' };
      }
    }

    // Calculate top 5 energy consumers - Excluding 'Always On' devices as they are basic needs
    const deviceConsumption = devices
      .filter(d => !d.isAlwaysOn)
      .map(d => {
        const hours = d.unit === 'hour' ? d.duration : d.duration / 60;
        const kwh = (d.watt / 1000) * hours;
        return { ...d, kwh };
      })
      .sort((a, b) => b.kwh - a.kwh)
      .slice(0, 5);

    return {
      dailyKwh,
      totalDailyCost,
      monthlyKwh,
      totalMonthlyCost,
      remainingTime,
      topDevices: deviceConsumption
    };
  }, [devices, tariff, ppj, fixedFee, currentKwh]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Subtle Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-16">
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200"
              >
                <Zap size={28} className="text-red-600" fill="currentColor" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Watt<span className="text-red-600">Wise</span>
                </h1>
                <p className="text-slate-500 font-medium text-sm">
                  Smart Electricity Management & Cost Prediction
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
            >
              <HelpCircle size={18} className="text-red-500" />
              Tarif PLN
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Inputs & List */}
          <div className="lg:col-span-7 space-y-10">
            <div className="grid grid-cols-1 gap-8">
              <ConfigSection
                tariff={tariff}
                ppj={ppj}
                fixedFee={fixedFee}
                currentKwh={currentKwh}
                setPpj={setPpj}
                setFixedFee={setFixedFee}
                setCurrentKwh={setCurrentKwh}
                setIsModalOpen={setIsModalOpen}
              />
              <AddDeviceForm onAddDevice={handleAddDevice} />
            </div>

            <DeviceList 
              devices={devices} 
              setDevices={setDevices} 
              onRemove={(id) => setDevices(devices.filter(d => d.id !== id))} 
            />
          </div>

          {/* Right Column: Dashboard Summary */}
          <div className="lg:col-span-5 space-y-10">
            <SummaryBoard 
              totals={totals}
              devices={devices}
              tariff={tariff}
            />
          </div>
        </div>
      </div>

      {/* Tariff Reference Modal */}
      <TariffModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTariff={setTariff}
      />
    </div>
  );
}
