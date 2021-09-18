import React from 'react';
import { Area, AreaChart, Tooltip, XAxis } from 'recharts';

const data = [
  {
    bulan: 'Januari',
    penjualan: 12
  },
  {
    bulan: 'February',
    penjualan: 23
  },
  {
    bulan: 'March',
    penjualan: 5
  },
  {
    bulan: 'April',
    penjualan: 25
  },
  {
    bulan: 'May',
    penjualan: 10
  },
  {
    bulan: 'Juni',
    penjualan: 6
  },
  {
    bulan: 'Juli',
    penjualan: 16
  },
  {
    bulan: 'Agustus',
    penjualan: 20
  },
  {
    bulan: 'September',
    penjualan: 3
  },
  {
    bulan: 'Oktober',
    penjualan: 23
  },
  {
    bulan: 'November',
    penjualan: 9
  },
  {
    bulan: 'Desember',
    penjualan: 10
  }
];

const ProductChart = () => {
  return (
    <AreaChart
      width={200}
      height={70}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}>
      <XAxis dataKey="bulan" style={{ display: 'none' }} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="penjualan"
        stroke="#8956FF"
        fill="rgba(137, 86, 255, .2)"
      />
    </AreaChart>
  );
};

export default ProductChart;
