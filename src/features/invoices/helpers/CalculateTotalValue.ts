import { InvoiceItems } from "../models/Invoices.type";

const calculateTotalValue = (items: InvoiceItems[]) => {
  let totalValue = 0;
  if (items) {
    totalValue = items.reduce((acc, item) => {
      return acc + item.quantity * item.unitValue;
    }, 0);
  }
  return totalValue;
};

export { calculateTotalValue };
