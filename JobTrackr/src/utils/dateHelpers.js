import dayjs from 'dayjs';


export const formatDate = (iso) => (iso ? dayjs(iso).format('MMM D, YYYY') : '—');

export const daysUntil = (iso) => {
  if (!iso) return null;
  return dayjs(iso).diff(dayjs(), 'day');
};

export const isReminderSoon = (iso) => {
  const d = daysUntil(iso);
  return d !== null && d >= 0 && d <= 3;
};

export const isReminderOverdue = (iso) => {
  const d = daysUntil(iso);
  return d !== null && d < 0;
};
