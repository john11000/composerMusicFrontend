import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';
import { Iinvoices, InvoiceItems } from '@/features/invoices/models/Invoices.type';
import { Checkbox, TextField, Tooltip, Typography } from '@mui/material';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { City, IDepartments } from '@/features/customers/models/Customers.type';
import useGetDepartaments from '@/hooks/useGetCities';
import { warrantyDays } from '../helper/warrantyDaysRemaining';
interface Props {
  isDetails?: boolean;
  setIsEditReference?: (isEditReference: boolean) => void;
  invoicesItems: InvoiceItems[];
  invoices: Iinvoices[];
  selectedReferences: InvoiceItems[];
  setSelectedReferences: Dispatch<SetStateAction<InvoiceItems[]>>;
}

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
});

export default function ServiceInvoicesReferencesTableEditDialog({
  invoicesItems,
  invoices,
  selectedReferences,
  setSelectedReferences,
}: Props) {
  const [departaments, setDepartaments] = useState<IDepartments[]>([]);
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();
  const [cities, setCities] = useState<City[]>([]);

  const getDepartaments = async () => {
    try {
      const res = await getDepartamentsFromApi();
      if (res.data) setDepartaments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDepartaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCities(departaments.map((departament) => departament.cities).flat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departaments]);

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar por número de referencia',
    textLabels: {
      body: {
        noMatch: 'El cliente seleccionado no tiene facturas asociadas.',
        toolTip: 'Ordenar',
      },
      pagination: {
        next: 'Página siguiente',
        previous: 'Página anterior',
        rowsPerPage: 'filas por página:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Buscar',
        downloadCsv: 'Descargar CSV',
      },
      selectedRows: {
        text: 'Fila(s) seleccionadas',
        delete: 'Eliminar',
        deleteAria: 'Eliminar filas seleccionadas',
      },
    },
  };

  const [switchStates, setSwitchStates] = useState<boolean[]>([]);

  const handleSwitchChange = (index: number) => {
    const updatedSwitchStates = [...switchStates];
    updatedSwitchStates[index] = !updatedSwitchStates[index];
    setSwitchStates(updatedSwitchStates);

    if (!updatedSwitchStates[index]) {
      const updatedSelectedReferences = selectedReferences.filter(
        (selectedReference) => selectedReference.id !== invoicesItems[index].id
      );
      setSelectedReferences(updatedSelectedReferences);
    } else {
      setSelectedReferences([...selectedReferences, invoicesItems[index]]);
    }
  };

  const handleContact = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedSelectedReferences = selectedReferences.map((selectedReference) => {
      if (selectedReference.id === invoicesItems[index].id) {
        selectedReference.contact = e.target.value;
      }
      return selectedReference;
    });
    setSelectedReferences(updatedSelectedReferences);
  };

  const handleOptPhone = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedSelectedReferences = selectedReferences.map((selectedReference) => {
      if (selectedReference.id === invoicesItems[index].id) {
        selectedReference.optionalPhone = e.target.value;
      }
      return selectedReference;
    });
    setSelectedReferences(updatedSelectedReferences);
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    { name: 'invoiceId', options: { display: false } },
    { name: 'referenceCode', options: { display: false } },
    {
      name: 'invoiceNumber',
      label: 'Número de factura',
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography sx={{ fontSize: '14px' }}>
              {invoices.find((invoice) => invoice.id === dataTable.rowData[1])?.invoiceNumber}
            </Typography>
          );
        },
      },
    },
    {
      name: 'referenceDescription',
      label: 'Descripción de referencia',
      options: {
        customBodyRender: (_, dataTable) => {
          return <Typography sx={{ fontSize: '14px' }}>{`${dataTable.rowData[2]} ${dataTable.rowData[4]}`}</Typography>;
        },
      },
    },
    {
      name: 'address',
      label: 'Dirección',
    },
    {
      name: 'cityId',
      label: 'Ciudad',
      options: {
        customBodyRender: (_, dataTable) => {
          const currentCity = cities.find((city) => city.id === dataTable.rowData[6])?.name;
          return <Typography sx={{ fontSize: '14px' }}>{currentCity}</Typography>;
        },
      },
    },
    {
      name: 'Distribuidor',
      label: 'Distribuidor',
      options: {
        customBodyRender: (_, dataTable) => {
          const isDistributor =
            invoices.find((invoice) => invoice.id === dataTable.rowData[1])?.placeOfPurchase == 'distribuidor'
              ? true
              : false;
          let placeOfPurchase = '';
          if (isDistributor) {
            placeOfPurchase =
              invoices.filter((invoice) => invoice.id === dataTable.rowData[1])[0].distributor?.name ?? '';
          } else {
            placeOfPurchase = 'CLASIC';
          }
          return <Typography sx={{ fontSize: '14px' }}>{placeOfPurchase}</Typography>;
        },
      },
    },
    {
      name: 'contact',
      label: 'Contacto',
      options: {
        customBodyRender: (_, dataTable) => {
          const switchState = switchStates[dataTable.rowIndex] || false;

          if (!switchState) {
            return <Typography sx={{ fontSize: '14px' }}>{dataTable.rowData[8]}</Typography>; // Ocultar el campo si el interruptor no está activado
          }

          return (
            <Tooltip style={{ fontSize: '14px' }} title="Digite un contacto">
              <TextField
                size="small"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleContact(e, dataTable.rowIndex);
                }}
                value={dataTable.rowData[8]}
              />
            </Tooltip>
          );
        },
      },
    },

    {
      name: 'optionalPhone',
      label: 'Teléfono opcional',
      options: {
        customBodyRender: (_, dataTable) => {
          const switchState = switchStates[dataTable.rowIndex] || false;
          if (!switchState) {
            return <Typography sx={{ fontSize: '14px' }}>{dataTable.rowData[9]}</Typography>; // Ocultar el campo si el interruptor no está activado
          }

          return (
            <Tooltip title="Digite un teléfono opcional">
              <TextField
                size="small"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOptPhone(e, dataTable.rowIndex);
                }}
                value={dataTable.rowData[9]}
              />
            </Tooltip>
          );
        },
      },
    },
    {
      name: 'quantity',
      label: 'Cantidad',
    },
    {
      name: 'warrantyDays',
      label: 'Garantia',
      options: {
        customBodyRender: (_, dataTable) => {
          const dateofPurchase = invoices.filter((invoice) => invoice.id === dataTable.rowData[1])[0]?.dateOfPurchase;
          const daysWarranty = warrantyDays(dateofPurchase, dataTable.rowData[11]);
          return <Typography sx={{ fontSize: '14px' }}>{daysWarranty} días</Typography>;
        },
      },
    },
    {
      name: '',
      label: 'Seleccionar',
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <span>
              <Checkbox defaultChecked={false} onChange={() => handleSwitchChange(dataTable.rowIndex)}></Checkbox>
            </span>
          );
        },
      },
    },
  ];

  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        title="Lista de referencias"
        data={invoicesItems}
        columns={columns}
        options={options}
      ></MUIDataTable>
    </MuiThemeProvider>
  );
}
