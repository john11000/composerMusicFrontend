import { differenceInDays, startOfDay } from "date-fns";

const today = startOfDay(new Date()); // Obtener la fecha actual a las 00:00:00

export const warrantyDays = (
  dateOfPurchase: string,
  warrantyDaysReference: number
): number => {
  const dateOfPurchaseFormated = new Date(dateOfPurchase);
  const daysSincePurchase = differenceInDays(today, dateOfPurchaseFormated);
  const warrantyRemaining = Math.max(
    warrantyDaysReference - daysSincePurchase,
    0
  );
  if (warrantyRemaining <= 0) {
    return 0;
  } else {
    return warrantyRemaining;
  }
};
