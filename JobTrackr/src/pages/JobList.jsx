import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import EmptyState from '../components/common/EmptyState';
import { Plus } from 'lucide-react';

export default function JobList() {
  const jobs = useSelector((state) => state.jobs?.jobs ?? []);
  const { statusFilter, searchQuery } = useSelector((state) => state.ui);

  const filteredJobs = jobs.filter((job) => {
    const matchStatus = statusFilter === 'All' || job.status === statusFilter;
    const query = (searchQuery || '').toLowerCase();
    const matchSearch = !query
      || job.company?.toLowerCase().includes(query)
      || job.role?.toLowerCase().includes(query)
      || job.location?.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">My Applications</h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed m-0 sm:!mb-0">{jobs.length} total applications</p>
        </div>
        <Link
          to="/add-job"
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-50 dark:text-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Application
        </Link>
      </div>

      <JobFilters />

      {filteredJobs.length === 0 ? (
        <EmptyState
          title={jobs.length === 0 ? 'No applications yet' : 'No results found'}
          subtitle={jobs.length === 0 ? 'Start tracking your career journey by adding your first job.' : 'Try a different search term or status filter.'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

