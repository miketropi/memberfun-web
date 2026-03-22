import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatBlockPointsAnalysis = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Points',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(139, 92, 246, 0.45)',
        borderColor: 'rgb(124, 58, 237)',
        borderWidth: 1,
      },
    ],
  };

  const chartData = data || defaultData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Points Analysis Over Time',
      },
    },
  };

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default StatBlockPointsAnalysis;