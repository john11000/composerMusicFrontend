import { InvoiceItems } from "../models/Invoices.type";

const formatAddress = (data: InvoiceItems) => {
  const { typeLocation, locationNumber, numberLocation, secondNumberLocation } =
    data;
  const address = `${typeLocation} ${locationNumber} # ${numberLocation} - ${secondNumberLocation}`;
  return address;
};

const desestructuAddress = (address: string) => {
  // address = address.replace(/,/g, '');
  //  Diagonal 06 # 69 - 04
  address = address.replace(/# /g, "");
  address = address.replace(/- /g, "");
  const [typeLocation, locationNumber, numberLocation, secondNumberLocation] =
    address.split(" ");
  return { typeLocation, locationNumber, numberLocation, secondNumberLocation };
};

export { formatAddress, desestructuAddress };
