import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress, Tooltip, Switch } from "@mui/material";
import { useCustomersContext } from "../context/Customers.context";
import { ICustomers, IDepartments } from "../models/Customers.type";
import { NoteAdd } from "@mui/icons-material";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { ChangeEvent } from "react";
import { toastsManager } from "@/utilities";
import useUpdateCustomer from "../hooks/useUpdateCustomers";
import { useInvoicesContext } from "@/features/invoices/context/Invoices.context";
import { RolesEnum } from "@/models/roles.enum";
import useGetRol from "@/hooks/useGetRol";

interface Props {
  customers: ICustomers[];
  loading: boolean;
  departaments: IDepartments[];
}

export default function CustomersTable({
  customers,
  loading,
  departaments,
}: Props) {
  const {
    setCustomerToEdit,
    openEditCustomerDialog,
    setTitleCustomerDialog,
    setIsEdit,
    setIsEditCustomer,
  } = useCustomersContext();
  const {
    openEditInvoiceDialog,
    setTitleInvoiceDialog,
    setIsEdit: setIsEditinvoice,
  } = useInvoicesContext();
  const { updateCustomer, loading: loadingUpdateCustomer } =
    useUpdateCustomer();
  const role = useGetRol();

  const handleEditCustomer = (Customers: ICustomers, openModal: boolean) => {
    departaments.forEach((departament, indice) => {
      if (departament.id === parseInt(Customers.departmentId)) {
        Customers.departamentDrp = {
          id: departament.id,
          value: departament.id,
          label: departament.name,
        };
        departaments[indice].cities.forEach((city) => {
          if (city.id === parseInt(Customers.cityId)) {
            Customers.cityDrp = {
              id: city.id,
              value: city.id,
              label: city.name,
              departmentId: city.departmentId,
            };
          }
        });
      }
    });
    setIsEditinvoice(true);
    setTitleCustomerDialog("Editar Cliente");
    setCustomerToEdit(Customers);
    if (openModal) {
      openEditCustomerDialog();
    }
  };
  const handleAddInvoice = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleInvoiceDialog("Añadir Facturas");
    setCustomerToEdit(customers[dataTable.rowIndex]);
    openEditInvoiceDialog();
    setIsEditCustomer(false);
  };

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: "Buscar Cliente por NIT",
    downloadOptions: {
      filename: "costumers.csv",
      separator: ",",
      filterOptions: {
        useDisplayedColumnsOnly: true, // Solo utiliza las columnas visibles en la descarga
      },
    },
  };

  const handleEditStateCustomer = async (
    e: ChangeEvent<HTMLInputElement>,
    dataTable: MUIDataTableMeta<unknown>
  ) => {
    const rowIndex = dataTable.rowIndex;
    const updatedUsers = [...customers];
    updatedUsers[rowIndex].isActive = e.target.checked;
    try {
      const res = await updateCustomer({
        id: updatedUsers[rowIndex].id,
        isActive: updatedUsers[rowIndex].isActive,
      });

      if (res.data) {
        toastsManager.showToast("success", "Cliente actualizado correctamente");
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "identificationNumber",
      label: "NIT",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Tooltip title="Editar Cliente">
              <Typography
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                }}
                onClick={() => {
                  handleEditCustomer(customers[dataTable.rowIndex], true);
                }}
              >{`${dataTable.rowData[1]}`}</Typography>
            </Tooltip>
          );
        },
      },
    },
    {
      name: "firstName",
      label: "Nombres",
      options: {
        customBodyRender(firstName, dataTable) {
          return (
            <th
              key={firstName.index}
              className={firstName.classes}
              style={{ textAlign: "center" }}
            >
              {firstName} - {dataTable.rowData[8]}
            </th>
          );
        },
      },
    },
    { name: "lastName", label: "Apellidos", options: { display: false } },
    { name: "address", label: "Dirección" },
    { name: "phone", label: "Teléfono principal" },
    { name: "email", label: "Correo electrónico" },
    {
      name: "isActive",
      label: "Estado",
      options: {
        display: "excluded",
        customBodyRender: (_, dataTable) => {
          if (role === RolesEnum.ADMINSTRADOR) {
            return (
              <Typography>
                <Switch
                  checked={dataTable.rowData[6]}
                  onChange={(e) => handleEditStateCustomer(e, dataTable)}
                />
                {dataTable.rowData[6] ? "Activado" : "Desactivado"}
              </Typography>
            );
          } else {
            return (
              <Typography>
                {dataTable.rowData[6] ? "Activado" : "Desactivado"}
              </Typography>
            );
          }
        },
      },
    },
    {
      name: "options",
      label: "Opciones",
      options: {
        customBodyRender: (_, dataTable) => {
          // Renderizado personalizado para la columna 'options'
          return (
            <Tooltip title="Añadir facturas">
              <NoteAdd
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "inherit",
                }}
                onClick={() => handleAddInvoice(dataTable)}
              />
            </Tooltip>
          );
        },
      },
    },
  ];

  return (
    <MUIDataTable
      title={
        loading || loadingUpdateCustomer ? (
          <Typography>
            Cargando...
            <CircularProgress size={20} />
          </Typography>
        ) : (
          "Lista de Clientes"
        )
      }
      data={customers}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
