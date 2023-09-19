export const FormatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Añadir un cero inicial si el mes es menor a 10
  const day = ("0" + date.getDate()).slice(-2); // Añadir un cero inicial si el día es menor a 10
  return `${year}-${month}-${day}`;
};
