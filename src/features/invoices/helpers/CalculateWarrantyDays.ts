import { differenceInDays, parse, startOfDay } from "date-fns";
const today = startOfDay(new Date()); // Obtener la fecha actual a las 00:00:00

export const CalculateWarrantyDays = (
  warrantyPeriod: string,
  warrantyDaysRefernce: number
): number => {
  const daysWarranty = differenceInDays(
    parse(warrantyPeriod, "yyyy-MM-dd", new Date()),
    today
  );
  const warranty = warrantyDaysRefernce - daysWarranty * -1;
  return warranty > 0 ? warranty : 0;
};
