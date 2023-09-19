import { InvoiceItems } from "../models/Invoices.type";
import { Iinvoices } from "../models/Invoices.type";

const newInvoiceItem = (data: InvoiceItems) => {
  return {
    id: data.id,
    productId: data.productId,
    isActive: data.isActive,
    quantity: data.quantity,
    unitValue: data.unitValue || 0,
    serial: data.serial,
    address: data.address,
    referenceCode: data.referenceCode,
    warrantyDays: data.warrantyDays,
    referenceDescription: data.referenceDescription,
    neighborhood: data.neighborhood,
    location: data.location,
    contact: data.contact,
    principalPhone: data.principalPhone,
    optionalPhone: data.optionalPhone,
    cityId: data.cityId,
  };
};

const AdapterNewInvoice = (data: Iinvoices) => {
  const newitems = data.invoiceItems?.map((item) => newInvoiceItem(item));
  return {
    // id: data.id || 0,
    userId: data.userId || 0,
    invoiceNumber: data.invoiceNumber || "",
    dateOfPurchase: new Date(data.dateOfPurchase) || "",
    placeOfPurchase: data.placeOfPurchase || "",
    distributorId: data.distributorId || undefined,
    // file: data.file || null,
    invoiceItems: newitems || [],
  };
};

export { AdapterNewInvoice, newInvoiceItem };
