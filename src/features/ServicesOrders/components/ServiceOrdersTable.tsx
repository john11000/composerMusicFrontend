import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";
import { IServiceOrders } from "../models/ServiceOrders.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import useGetRol from "@/hooks/useGetRol";
import { RolesEnum } from "@/models/roles.enum";
import { Container } from "@mui/system";
import ServiceOrdersTableMenu from "./ServiceOrdersTableMenu";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  serviceOrders: IServiceOrders[];
  loading: boolean;
}
interface CheckedItems {
  [key: number]: boolean;
}

export default function ServiceOrdersTable({ serviceOrders, loading }: Props) {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const rol = useGetRol();
  const {
    setServiceOrderToEdit,
    openEditServiceOrderDialog,
    setTitleServiceOrderDialog,
    setIsEdit,
  } = useServiceOrdersContext();
  const handleEditServiceOrder = (serviceOrders: IServiceOrders) => {
    setServiceOrderToEdit(serviceOrders);
  };

  const handleClickEditServiceOrders = (
    dataTable: MUIDataTableMeta<unknown>
  ) => {
    setIsEdit(true);
    setTitleServiceOrderDialog("Editar orden de servicio");
    handleEditServiceOrder(serviceOrders[dataTable.rowIndex]);
    openEditServiceOrderDialog();
  };

  const handleChangeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[rowIndex] = e.target.checked;
    setCheckedItems(newCheckedItems);

    const selectedValues = Object.values(newCheckedItems);
    setIsCheckboxSelected(selectedValues.some((value) => value));
  };

  const handleAsignarCliente = () => {
    console.error("Asignar cliente");
  };

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: "Buscar Ordenes de servicios",
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "",
      options: {
        display: rol === RolesEnum.TECNICO ? false : true,
        customBodyRenderLite: (dataIndex) => {
          const isChecked = checkedItems[dataIndex] || false;

          return (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleChangeCheck(e, dataIndex)}
            />
          );
        },
      },
    },
    {
      name: "abbreviation",
      label: "NIT",
      options: {
        customBodyRender: (_, dataTable) => {
          if (rol === RolesEnum.TECNICO) {
            return <Typography>{`${dataTable.rowData[1]}`}</Typography>;
          } else {
            return (
              <Typography
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                }}
                onClick={() => handleClickEditServiceOrders(dataTable)}
              >{`${dataTable.rowData[1]}`}</Typography>
            );
          }
        },
      },
    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "name",
      label: "Tipo de servicio",
    },
    {
      name: "name",
      label: "Falla reportada",
    },
    {
      name: "name",
      label: "Técnico asignado",
      options: {
        display: rol === RolesEnum.TECNICO ? false : true,
        customBodyRender: (tecnicoAsignado) => {
          if (tecnicoAsignado) {
            return <Typography>{`Técnico asignado`}</Typography>;
          }
          return <Typography>{`Sin asignar`}</Typography>;
        },
      },
    },
    {
      name: "name",
      label: "Fecha del servicio",
    },
    {
      name: "name",
      label: "Fecha de cierre del servicio",
    },
    {
      name: "name",
      label: "Estado de la orden",
    },
    {
      name: "",
      label: "Opciones",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Container>
              <ServiceOrdersTableMenu
                seviceOrder={serviceOrders[dataTable.rowIndex]}
              />
            </Container>
          );
        },
      },
    },
  ];

  return (
    <div>
      {isCheckboxSelected && (
        <LoadingButton
          sx={{ position: "relative", zIndex: "10", left: "78%", top: "49px" }}
          variant="contained"
          color="primary"
          onClick={handleAsignarCliente}
        >
          Asignar cliente
        </LoadingButton>
      )}

      <MUIDataTable
        title={
          loading ? (
            <Typography>
              Cargando...
              <CircularProgress size={20} />
            </Typography>
          ) : (
            "Lista de Ordenes de Servicios"
          )
        }
        data={[{}]}
        columns={columns}
        options={options}
      ></MUIDataTable>
    </div>
  );
}
