import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Filler,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { STATUS_COLORS } from '../utils/statusColors';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Filler,
);

ChartJS.defaults.font.family = "'Inter', system-ui, sans-serif";

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function Analytics() {
  const jobs = useSelector((state) => state.jobs?.jobs ?? []);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const textColor = darkMode ? '#94a3b8' : '#64748b';
  const gridColor = darkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)';

  const statusCounts = STATUSES.map((status) => jobs.filter((job) => job.status === status).length);
  const doughnutData = {
    labels: STATUSES,
    datasets: [{
      data: statusCounts,
      backgroundColor: STATUSES.map((status) => STATUS_COLORS[status]?.mui || '#a1a1aa'),
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };
  const doughnutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
          usePointStyle: true,
          font: { size: 11, weight: '600', family: "'Outfit', sans-serif" }
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#18181b' : '#ffffff',
        titleColor: darkMode ? '#fafafa' : '#09090b',
        bodyColor: textColor,
        borderColor: darkMode ? '#27272a' : '#e4e4e7',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        font: { family: "'Outfit', sans-serif" },
      }
    },
  };

  const now = dayjs();
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const start = now.subtract(7 - i, 'week').startOf('isoWeek');
    const end = start.endOf('isoWeek');
    return {
      label: start.format('MMM D'),
      count: jobs.filter((job) => {
        const d = dayjs(job.appliedDate);
        return d.isAfter(start) && d.isBefore(end);
      }).length,
    };
  });
  const lineData = {
    labels: weeks.map((w) => w.label),
    datasets: [{
      label: 'Applications',
      data: weeks.map((w) => w.count),
      borderColor: '#6366f1',
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: darkMode ? '#09090b' : '#ffffff',
      pointBorderWidth: 1.5,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };
  const lineOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: textColor, font: { size: 10, weight: '500' } }, grid: { display: false } },
      y: {
        ticks: { color: textColor, font: { size: 10 }, stepSize: 1 },
        grid: { color: gridColor, drawTicks: false },
        border: { dash: [4, 4] },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#18181b' : '#ffffff',
        titleColor: darkMode ? '#fafafa' : '#09090b',
        bodyColor: textColor,
        borderColor: darkMode ? '#27272a' : '#e4e4e7',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        font: { family: "'Outfit', sans-serif" },
      }
    },
  };

  const funnelSteps = ['Applied', 'Interview', 'Offer'];
  const barData = {
    labels: funnelSteps,
    datasets: [{
      label: 'Count',
      data: funnelSteps.map((status) => jobs.filter((job) => job.status === status).length),
      backgroundColor: ['#38bdf8', '#fbbf24', '#34d399'],
      borderRadius: 6,
    }],
  };
  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: textColor, font: { size: 11, weight: '600' } }, grid: { display: false } },
      y: {
        ticks: { color: textColor, font: { size: 10 }, stepSize: 1 },
        grid: { color: gridColor, drawTicks: false },
        border: { dash: [4, 4] },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#18181b' : '#ffffff',
        titleColor: darkMode ? '#fafafa' : '#09090b',
        bodyColor: textColor,
        borderColor: darkMode ? '#27272a' : '#e4e4e7',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        font: { family: "'Outfit', sans-serif" },
      }
    },
  };

  const successRate = jobs.filter((job) => job.status === 'Applied').length > 0
    ? Math.round((jobs.filter((job) => job.status === 'Interview').length / jobs.filter((job) => job.status !== 'Wishlist').length) * 100)
    : 0;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Analytics</h2>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed">Visual insights into your job search performance and conversion rates.</p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">No Data Available</p>
          <p className="text-xs font-medium text-zinc-500 mt-2">Start adding applications to see your analytics.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                label: 'Total Apps',
                value: jobs.length,
                textClass: 'text-indigo-600 dark:text-indigo-400',
                borderClass: 'border-indigo-100/50 dark:border-indigo-900/20 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]',
                accentClass: 'bg-indigo-500',
              },
              {
                label: 'Interview Rate',
                value: `${successRate}%`,
                textClass: 'text-amber-600 dark:text-amber-400',
                borderClass: 'border-amber-100/50 dark:border-amber-900/20 hover:border-amber-500/30 dark:hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]',
                accentClass: 'bg-amber-500',
              },
              {
                label: 'Offers',
                value: jobs.filter((job) => job.status === 'Offer').length,
                textClass: 'text-emerald-600 dark:text-emerald-400',
                borderClass: 'border-emerald-100/50 dark:border-emerald-900/20 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
                accentClass: 'bg-emerald-500',
              },
              {
                label: 'Network Score',
                value: '72/100',
                textClass: 'text-sky-600 dark:text-sky-400',
                borderClass: 'border-sky-100/50 dark:border-sky-900/20 hover:border-sky-500/30 dark:hover:border-sky-500/30 hover:shadow-[0_8px_30px_rgba(14,165,233,0.06)] dark:hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]',
                accentClass: 'bg-sky-500',
              },
            ].map(({ label, value, textClass, borderClass, accentClass }) => (
              <div
                key={label}
                className={`relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col gap-2 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border ${borderClass} shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1`}
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${accentClass} opacity-80`} />
                <p className={`text-2xl font-bold tracking-tight leading-none mb-1 ${textClass}`}>{value}</p>
                <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-6 uppercase tracking-wider">Status Distribution</h3>
              <div className="h-64">
                <Doughnut data={doughnutData} options={doughnutOpts} />
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-6 uppercase tracking-wider">Success Funnel</h3>
              <div className="h-64">
                <Bar data={barData} options={barOpts} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-6 uppercase tracking-wider">Weekly Velocity</h3>
            <div className="h-72">
              <Line data={lineData} options={lineOpts} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

