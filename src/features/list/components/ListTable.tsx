import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useListsContext } from "../context/List.context";
import { ILists } from "../models/List.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";

interface Props {
  Lists: ILists[];
  loading: boolean;
}

export default function ListsTable({ Lists, loading }: Props) {
  const { setListToEdit, openEditListDialog, setTitleListDialog, setIsEdit } =
    useListsContext();

  const handleEditList = (Lists: ILists) => {
    setListToEdit(Lists);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar grupo por nombre del grupo o nombre de referencia",
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleListDialog("Editar grupo");
    handleEditList(Lists[dataTable.rowIndex]);
    openEditListDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "abbreviation",
      label: "Código",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleEditClick(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    {
      name: "Nombre",
      label: "Nombre",
    },
    {
      name: "tonalidad",
      label: "Tonalidad",
    },
    {
      name: "descargar",
      label: "Descargar",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Button
              sx={{
                cursor: "pointer",
              }}
              // onClick={() => handleEditClick(dataTable)}
              endIcon={<Download />}
            >
              Descargar
            </Button>
          );
        },
      },
    },
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
          "Lista de melodias"
        )
      }
      data={Lists}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
