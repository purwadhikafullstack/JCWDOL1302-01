import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  labels: any;
  datasets: any;
};

export default function PieChart({ labels, datasets }: Props) {
  const data = {
    labels,
    datasets,
  };

  return <Pie data={data} />;
}
