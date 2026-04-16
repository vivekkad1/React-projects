import { STATUS_COLORS } from '../../utils/statusColors';

export default function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS['Applied'];
  return (
    <span className={`inline-flex justify-center items-center px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
      {status}
    </span>
  );
}
