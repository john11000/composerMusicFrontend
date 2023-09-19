import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress, Tooltip } from "@mui/material";
import { useDistributorsContext } from "../context/Distributors.context";
import { IDistributors } from "../models/Distributors.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
// import { toastsManager } from '@/utilities';
// import { ChangeEvent } from 'react';
// import useUpdateDistributor from '../hooks/useUpdateDistributors';
// import { RolesEnum } from '@/models/roles.enum';
// import useGetRol from '@/hooks/useGetRol';

interface Props {
  distributors: IDistributors[];
  loading: boolean;
}

export default function DistributorsTable({ distributors, loading }: Props) {
  const {
    setDistributorToEdit,
    openEditDistributorDialog,
    setTitleDistributorDialog,
    setIsEdit,
  } = useDistributorsContext();
  // const { updateDistributor } = useUpdateDistributor();
  // const role = useGetRol();

  const handleEditDistributor = (distributors: IDistributors) => {
    setDistributorToEdit(distributors);
  };

  // const handleEditStateClient = async (e: ChangeEvent<HTMLInputElement>, dataTable: MUIDataTableMeta<any>) => {
  //   const rowIndex = dataTable.rowIndex;
  //   const updatedDistributors = [...distributors];
  //   updatedDistributors[rowIndex].isActive = e.target.checked;
  //   try {
  //     const res = await updateDistributor({
  //       id: updatedDistributors[rowIndex].id,
  //       isActive: updatedDistributors[rowIndex].isActive,
  //     });

  //     if (res.data) {
  //       toastsManager.showToast('success', 'Cliente actualizado Correctamente');
  //     } else {
  //       toastsManager.showToast('error', 'Respuesta no esperada');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //eslint-disable-next-line
  const handleEditDistributorBtn = (dataTable: MUIDataTableMeta<any>) => {
    setIsEdit(true);
    setTitleDistributorDialog("Editar Distribuidores");
    handleEditDistributor(distributors[dataTable.rowIndex]);
    openEditDistributorDialog();
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: "Buscar Distribuidor",
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "name",
      label: "Nombre del Distribuidor",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Tooltip title="Editar Distribuidor">
              <Typography
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                }}
                onClick={() => handleEditDistributorBtn(dataTable)}
              >{`${dataTable.rowData[1]}`}</Typography>
            </Tooltip>
          );
        },
      },
    },
    { name: "nameOfPersonInCharge", label: "Nombres del Responsable" },
    { name: "lastNameOfPersonInCharge", label: "Apellidos del Responsable." },
    { name: "documentNumber", label: "Número de documento" },
    // {
    //   name: 'isActive',
    //   label: 'Estado',
    //   options: {
    //     customBodyRender: (_, dataTable) => {
    //       if (role === RolesEnum.ADMINSTRADOR) {
    //         return (
    //           <Typography>
    //             <Tooltip title="Editar Estado">
    //               <Switch checked={dataTable.rowData[6]} onChange={(e) => handleEditStateClient(e, dataTable)} />
    //             </Tooltip>
    //             {dataTable.rowData[6] ? ' Activado        ' : 'Desactivado'}
    //           </Typography>
    //         );
    //       } else {
    //         return <Typography>{dataTable.rowData[6] ? ' Activado        ' : 'Desactivado'}</Typography>;
    //       }
    //     },
    //   },
    // },
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
          "Lista de Distribuidores"
        )
      }
      data={distributors}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
