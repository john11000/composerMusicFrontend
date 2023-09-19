import { Iinvoices } from "../models/Invoices.type";

const CreateNewInvoiceDto = () => {
  const invoice: Partial<Iinvoices> = {
    id: 0,
    userId: 0,
    distributorId: 0,
    customer: null,
    invoiceNumber: "",
    dateOfPurchase: "",
    placeOfPurchase: "",
    invoiceItems: [],
    file: new Blob(),
    distributor: null,
    receiptKey: "",
    receiptUrl: "",
  };
  return invoice;
};

export { CreateNewInvoiceDto };
