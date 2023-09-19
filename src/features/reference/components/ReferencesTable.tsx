import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useReferencesContext } from "../context/References.context";
import { IReferences } from "../models/References.type";
import { IGroups } from "@/features/groups/models/Groups.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";

interface Props {
  references: IReferences[];
  loading: boolean;
  groups: IGroups[];
}

export default function ReferencesTable({
  references,
  loading,
  groups,
}: Props) {
  const {
    setReferenceToEdit,
    openEditReferenceDialog,
    setTitleReferenceDialog,
    setIsEdit,
  } = useReferencesContext();

  const handleEditReference = (references: IReferences) => {
    setReferenceToEdit(references);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: "Buscar referencia por nombre de referencia",
  };

  const handleClickEditReferences = (dataTable: MUIDataTableMeta<unknown>) => {
    const groupToEdit = groups.find(
      (group) => group.id === dataTable.rowData[3]
    );
    (references[dataTable.rowIndex] as IReferences).groupReference = {
      id: groupToEdit?.id || 0,
      label: groupToEdit?.abbreviation + " - " + groupToEdit?.name || "",
      value: groupToEdit?.abbreviation || "",
    };
    setIsEdit(true);
    setTitleReferenceDialog("Editar referencia");
    handleEditReference(references[dataTable.rowIndex]);
    openEditReferenceDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "referenceCode",
      label: "Código referencia",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleClickEditReferences(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    { name: "referenceDescription", label: "Descripción" },
    {
      name: "groupId",
      label: "Grupo",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography>
              {groups.find((group) => group.id === dataTable.rowData[3])?.name}
            </Typography>
          );
        },
      },
    },
    { name: "warrantyDays", label: "Garantía" },
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
          "Lista de referencias"
        )
      }
      data={references}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
