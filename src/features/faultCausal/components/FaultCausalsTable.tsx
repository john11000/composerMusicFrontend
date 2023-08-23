import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Typography, CircularProgress, Tooltip } from '@mui/material';
import { useFaultCausalsContext } from '../context/FaultCausals.context';
import { IFaultCausals } from '../models/FaultCausals.type';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';

interface Props {
  faultCausals: IFaultCausals[];
  loading: boolean;
}

export default function FaultCausalsTable({ faultCausals, loading }: Props) {
  const { setFaultCausalToEdit, openEditFaultCausalDialog, setTitleFaultCausalDialog, setIsEdit } =
    useFaultCausalsContext();

  const handleEditFaultCausal = (faultCausals: IFaultCausals) => {
    setFaultCausalToEdit(faultCausals);
  };

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar falla por código de la falla',
  };
  //eslint-disable-next-line
  const handleEditClick = (dataTable: any) => {
    setIsEdit(true);
    setTitleFaultCausalDialog('Editar Fallas y causales');
    handleEditFaultCausal(faultCausals[dataTable.rowIndex]);
    openEditFaultCausalDialog();
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    {
      name: 'errorCode',
      label: 'Código',
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Tooltip title="Editar">
              <Typography
                sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                onClick={() => handleEditClick(dataTable)}
              >{`${dataTable.rowData[1]}`}</Typography>
            </Tooltip>
          );
        },
      },
    },
    { name: 'description', label: 'Descripción de la falla.' },
    { name: 'cause', label: 'Causal de la falla.' },
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
          'Lista de Fallas y causales'
        )
      }
      data={faultCausals}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
