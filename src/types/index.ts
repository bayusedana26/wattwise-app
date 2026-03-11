export interface Device {
  id: string;
  name: string;
  watt: number;
  duration: number;
  unit: 'hour' | 'minute';
  isAlwaysOn?: boolean;
}

export interface TariffReference {
  label: string;
  value: number;
  category: string;
  description?: string;
}

export interface CalculatorTotals {
  dailyKwh: number;
  totalDailyCost: number;
  monthlyKwh: number;
  totalMonthlyCost: number;
  remainingTime: { value: string; unit: string } | null;
  topDevices: (Device & { kwh: number })[];
}
