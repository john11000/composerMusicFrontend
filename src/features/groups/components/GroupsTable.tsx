import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useGroupsContext } from "../context/Groups.context";
import { IGroups } from "../models/Groups.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";

interface Props {
  groups: IGroups[];
  loading: boolean;
}

export default function GroupsTable({ groups, loading }: Props) {
  const {
    setGroupToEdit,
    openEditGroupDialog,
    setTitleGroupDialog,
    setIsEdit,
  } = useGroupsContext();

  const handleEditGroup = (groups: IGroups) => {
    setGroupToEdit(groups);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar grupo por nombre del grupo o nombre de referencia",
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleGroupDialog("Editar grupo");
    handleEditGroup(groups[dataTable.rowIndex]);
    openEditGroupDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "abbreviation",
      label: "Código Grupo",
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
      name: "name",
      label: "Nombre Grupo",
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
          "Lista de grupos"
        )
      }
      data={groups}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
