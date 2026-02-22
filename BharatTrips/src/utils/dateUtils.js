export const getToday = () => new Date();
export const formatDateInfo = (dateObj) => {
  if (!dateObj) return { dayNum: "", monthYear: "", dayName: "", full: "" };
  const d = new Date(dateObj);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return {
    dayNum: d.getDate(),
    monthYear: `${months[d.getMonth()]}'${String(d.getFullYear()).slice(2)}`,
    dayName: days[d.getDay()],
    full: d.toISOString().split("T")[0],
  };
};

export const generateTimeSlots = (selectedDate) => {
  const slots = [];
  const date = new Date(selectedDate);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  let startHour = 6;
  let endHour = 23;

  if (isToday) {
    startHour = now.getHours() + 3;
  }

  for (let i = startHour; i <= endHour; i++) {
    const hour = i;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const timeString = `${String(displayHour).padStart(2, "0")}:00 ${period}`;
    slots.push(timeString);
  }

  if (slots.length === 0 && isToday) {
    return ["Next Day Cabs Only"];
  }

  return slots;
};
