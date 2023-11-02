import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useListsContext } from "../context/List.context";
import { ILists } from "../models/List.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { Download, PlayCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
// Type declaration for the `base64-js` package// Type declaration for the `base64-js` package
declare global {
  interface Base64 {
    atob(str: string): string;
  }
}
import * as base64 from 'base64-js';
import { URL_API_BASE } from "@/constants/url-apis.constants";

interface Props {
  Lists: ILists[];
  loading: boolean;
}

export default function ListsTable({ Lists, loading }: Props) {
  const { setListToEdit, openEditListDialog, setTitleListDialog, setIsEdit } = useListsContext();

  const handleEditList = (Lists: ILists) => {
    setListToEdit(Lists);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar melodias generadas",
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleListDialog("Editar melodia");
    handleEditList(Lists[dataTable.rowIndex]);
    openEditListDialog();
  };

  const handleDownloadButton = (midi_data_url: string) => {
    const urlDownload = `${URL_API_BASE}/public/${midi_data_url}`;
    window.open(urlDownload);
  };
  
  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    { name: "", options: {
      customBodyRender: (_, dataTable) => {
        return (
          <Button
            endIcon={<PlayCircle />}
            variant="contained"
          >
            Play
          </Button>
        );
      },
     } },
    {
      name: "filename",
      label: "Código",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography
              sx={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
              onClick={() => handleEditClick(dataTable)}
            >{`${dataTable.rowData[2].split('/')[0]}`}</Typography>
          );
        },
      },
    },
    { name: "filename", label: "Nombre",
    options: {
      customBodyRender: (_, dataTable) => {
        return (
          <Typography
          >{`${dataTable.rowData[2].split('/')[1]}`}</Typography>
        );
      },
    }, },
    { name: "key", label: "Tonalidad" },
    {
      name: "midi_data",
      label: "Descargar",
      options: {
        customBodyRender: (midi_data, dataTable) => {
          return (
            <Button
              sx={{ cursor: "pointer" }}
              onClick={() => handleDownloadButton(dataTable.rowData[2])}
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
      title={loading ? <Typography>Cargando... <CircularProgress size={20} /></Typography> : "Lista de melodias"}
      data={Lists}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}