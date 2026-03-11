import { TariffReference } from '../types';

export const TARIFF_DATA: TariffReference[] = [
  { label: '900 VA (Subsidi)', value: 605, category: 'Rumah Tangga', description: 'R-1/TR Subsidi' },
  { label: '900 VA (Nonsubsidi)', value: 1352, category: 'Rumah Tangga', description: 'R-1/TR Nonsubsidi' },
  { label: '1.300 VA - 2.200 VA', value: 1444.7, category: 'Rumah Tangga', description: 'R-1/TR' },
  { label: '3.500 VA - 5.500 VA', value: 1699.53, category: 'Rumah Tangga', description: 'R-2/TR' },
  { label: '6.600 VA ke atas', value: 1699.53, category: 'Rumah Tangga', description: 'R-3/TR' },
  { label: 'Industri Menengah', value: 996.74, category: 'Industri', description: 'I-3/TM' },
  { label: 'Industri Besar', value: 1114.74, category: 'Industri', description: 'I-4/TT' },
];

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};
