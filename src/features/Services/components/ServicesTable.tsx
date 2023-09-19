import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useServicesContext } from "../context/Services.context";
import { IServices } from "../models/Services.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";

interface Props {
  services: IServices[];
  loading: boolean;
}

export default function ServicesTable({ services, loading }: Props) {
  const {
    setServiceToEdit,
    openEditServiceDialog,
    setTitleServiceDialog,
    setIsEdit,
  } = useServicesContext();

  const handleEditService = (services: IServices) => {
    setServiceToEdit(services);
  };
  //eslint-disable-next-line
  const handleClickEditServices = (dataTable: MUIDataTableMeta<any>) => {
    setIsEdit(true);
    setTitleServiceDialog("Editar Servicio");
    handleEditService(services[dataTable.rowIndex]);
    openEditServiceDialog();
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar servicio por nomenclatura o descripción del servicio",
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "name",
      label: "Código servicio",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleClickEditServices(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    { name: "description", label: "Descripción", options: { display: true } },
  ];

  return (
    <MUIDataTable
      title={
        loading ? (
          <Typography>
            Cargando...
            <CircularProgress size={20} />
          </Typography>
        ) : (
          "Lista de servicios"
        )
      }
      data={services}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
