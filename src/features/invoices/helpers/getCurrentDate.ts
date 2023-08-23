import { formatISO, startOfDay } from 'date-fns';

export const getCurrentDate = () => {
  const today = startOfDay(new Date()); // Obtener la fecha actual a las 00:00:00
  const formattedToday = formatISO(today, { representation: 'date' }); // Obtener fecha actual en formato YYYY-MM-DD
  return formattedToday;
};
