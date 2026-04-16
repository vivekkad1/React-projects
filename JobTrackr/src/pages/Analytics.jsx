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

  const textColor = darkMode ? '#a1a1aa' : '#52525b';
  const gridColor = darkMode ? 'rgba(161,161,170,0.1)' : 'rgba(82,82,91,0.1)';
  const lineColor = darkMode ? '#fafafa' : '#09090b';
  const lineBg    = darkMode ? 'rgba(250,250,250,0.08)' : 'rgba(9,9,11,0.06)';

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
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, boxWidth: 10, padding: 20, font: { size: 11, weight: '500' } },
      },
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
      borderColor: lineColor,
      backgroundColor: lineBg,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: lineColor,
      pointRadius: 3,
    }],
  };
  const lineOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
      y: {
        ticks: { color: textColor, font: { size: 10 }, stepSize: 1 },
        grid: { color: gridColor },
        beginAtZero: true,
      },
    },
    plugins: { legend: { display: false } },
  };

  const funnelSteps = ['Applied', 'Interview', 'Offer'];
  const barData = {
    labels: funnelSteps,
    datasets: [{
      label: 'Count',
      data: funnelSteps.map((status) => jobs.filter((job) => job.status === status).length),
      backgroundColor: darkMode ? ['#a1a1aa', '#71717a', '#fafafa'] : ['#d4d4d8', '#71717a', '#09090b'],
      borderRadius: 6,
    }],
  };
  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: textColor, font: { size: 11, weight: '500' } }, grid: { display: false } },
      y: {
        ticks: { color: textColor, font: { size: 10 }, stepSize: 1 },
        grid: { color: gridColor },
        beginAtZero: true,
      },
    },
    plugins: { legend: { display: false } },
  };

  const successRate = jobs.filter((job) => job.status === 'Applied').length > 0
    ? Math.round((jobs.filter((job) => job.status === 'Interview').length / jobs.filter((job) => job.status !== 'Wishlist').length) * 100)
    : 0;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Analytics</h2>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed">Visual insights into your application performance and trends.</p>
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
              { label: 'Total Apps', value: jobs.length },
              { label: 'Interview Rate', value: `${successRate}%` },
              { label: 'Offers', value: jobs.filter((job) => job.status === 'Offer').length },
              { label: 'Network Score', value: '72/100' },
            ].map(({ label, value }) => (
              <div key={label} className="relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col gap-2 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-600/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent dark:before:from-white/5 dark:before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 before:pointer-events-none hover:before:opacity-100">
                <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1">{value}</p>
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

