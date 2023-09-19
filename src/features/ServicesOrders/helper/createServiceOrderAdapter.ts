import {
  IServiceOrders,
  POSTServiceOrders,
} from "../models/ServiceOrders.type";
import { InvoiceItems } from "@/features/invoices/models/Invoices.type";

const CreateNewServiceOrderDto = (
  data: IServiceOrders,
  invoiceItems: InvoiceItems[]
) => {
  const today = new Date();
  const serviceOrder: POSTServiceOrders = {
    customerId: parseInt(data.drpSelectCustomer?.value ?? "0"),
    technicianId: parseInt(data.drpSelectTecnic?.value ?? "0"),
    failureId: parseInt(data.drpSelectFailure?.value ?? "0"),
    serviceId: parseInt(data.drpSelectServices?.value ?? "0"),
    serviceDate: today.toISOString().split("T")[0],
    invoiceItems: invoiceItems.map((item) => item.id),
    // serviceClosingDate: '',
  };
  return serviceOrder;
};

export { CreateNewServiceOrderDto };
