import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Skills() {
  const data = {
    labels: ['Python', 'Next.js', 'Google Cloud', 'Vertex AI', 'Socket.io', 'Node.js'],
    datasets: [
      {
        label: 'Skill Proficiency',
        data: [90, 85, 80, 75, 85, 70],
        backgroundColor: 'rgba(0, 243, 255, 0.2)',
        borderColor: 'rgba(0, 243, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 0, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 0, 255, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 14 } },
        ticks: { display: false, max: 100 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <section className="py-20 px-8 w-full min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold font-mono text-[var(--color-neon-blue)] mb-12 text-center drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
        Technical Arsenal
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full">
        {/* Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 glass-panel p-8 rounded-full"
        >
          <Radar data={data} options={options} />
        </motion.div>

        {/* Skill Trees placeholder */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {data.labels.map((skill, i) => (
            <motion.div 
              key={skill}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-4 rounded-lg flex items-center justify-between"
            >
              <span className="font-bold text-lg text-gray-900 dark:text-white">{skill}</span>
              <div className="w-1/2 bg-gray-300 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)] h-full"
                  style={{ width: `${data.datasets[0].data[i]}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
