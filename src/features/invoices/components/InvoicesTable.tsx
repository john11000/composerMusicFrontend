import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableMeta, MUIDataTableOptions } from 'mui-datatables';
import { Typography, CircularProgress, Tooltip } from '@mui/material';
import { useInvoicesContext } from '../context/Invoices.context';
import { Iinvoices } from '../models/Invoices.type';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';
import { Visibility } from '@mui/icons-material';
import { useCustomersContext } from '@/features/customers/context/Customers.context';
import { ICustomers } from '@/features/customers/models/Customers.type';
import { RolesEnum } from '@/models/roles.enum';
import useGetRol from '@/hooks/useGetRol';

interface Props {
  invoices: Iinvoices[];
  loading: boolean;
}

export default function InvoicesTable({ invoices, loading }: Props) {
  const { setInvoiceToEdit, openEditInvoiceDialog, setTitleInvoiceDialog, setIsEdit, setOpenDetailsInvoiceDialog } =
    useInvoicesContext();
  const { setCustomerToEdit, setIsEditCustomer } = useCustomersContext();
  const rol = useGetRol();

  const handleEditInvoice = (invoices: Iinvoices) => {
    setInvoiceToEdit(invoices);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar factura',
    // search: false,
  };

  const renderReferencesFromInvoice = (invoice: Iinvoices) => {
    return invoice.invoiceItems?.map((item, index) => {
      return <div key={index}>{index + 1 + ' - ' + item?.referenceCode + ' - ' + item?.address}</div>;
    });
  };
  //eslint-disable-next-line
  const handleEditCustomerBtn = (dataTable: MUIDataTableMeta<any>) => {
    setIsEdit(true);
    setTitleInvoiceDialog('Editar Factura');
    handleEditInvoice(invoices[dataTable.rowIndex]);
    const customer: ICustomers = {
      id: invoices[dataTable.rowIndex].customer?.id || 0,
      firstName: invoices[dataTable.rowIndex].customer?.firstName || '',
      identificationNumber: invoices[dataTable.rowIndex].customer?.identificationNumber || '',
      address: invoices[dataTable.rowIndex].customer?.address || '',
      phone: invoices[dataTable.rowIndex].customer?.phone || '',
      email: invoices[dataTable.rowIndex].customer?.email || '',
      isActive: invoices[dataTable.rowIndex].customer?.isActive || false,
      lastName: invoices[dataTable.rowIndex].customer?.lastName || '',
      addressDescription: invoices[dataTable.rowIndex].customer?.addressDescription || '',
      neighborhood: invoices[dataTable.rowIndex].customer?.neighborhood || '',
      optionalPhone: invoices[dataTable.rowIndex].customer?.optionalPhone || '',
      departmentId: invoices[dataTable.rowIndex].customer?.departmentId.toString() || '',
      cityId: invoices[dataTable.rowIndex].customer?.cityId.toString() || '',
      departamentDrp: null,
      cityDrp: null,
    };
    setCustomerToEdit(customer);
    setIsEditCustomer(false);
    openEditInvoiceDialog();
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    {
      name: 'invoiceNumber',
      label: 'Número de factura',
      options: {
        customBodyRender: (_, dataTable) => {
          if (rol === RolesEnum.ADMINSTRADOR) {
            return (
              <Typography
                sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                onClick={() => handleEditCustomerBtn(dataTable)}
              >{`${dataTable.rowData[1]}`}</Typography>
            );
          } else {
            return <Typography>{`${dataTable.rowData[1]}`}</Typography>;
          }
        },
      },
    },
    {
      name: 'referenceNumber',
      label: 'Referencias y dirección de la factura',
      options: {
        customBodyRender: (_, dataTable) => {
          return renderReferencesFromInvoice(invoices[dataTable.rowIndex]);
        },
      },
    },
    {
      name: 'distributor',
      label: 'Distribuidor',
      options: {
        customBodyRender: (_, dataTable) => {
          return <Typography>{`${dataTable.rowData[2]?.name || 'CLASIC'}`}</Typography>;
        },
      },
    },
    {
      name: 'nitCustomer',
      label: 'NIT del cliente',
      options: {
        customBodyRender: (_, dataTable) => {
          return <span>{invoices[dataTable.rowIndex].customer?.identificationNumber}</span>;
        },
      },
    },
    {
      name: 'warranty',
      label: 'Garantía de factura',
      options: {
        customBodyRender: (warranty) => {
          return <span>{warranty ? 'Si' : 'No'}</span>;
        },
      },
    },
    {
      name: '',
      label: 'Opciones',
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <>
              <Tooltip title="Ver detalles de la Factura">
                <Visibility
                  sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}
                  onClick={() => {
                    setInvoiceToEdit(invoices[dataTable.rowIndex]);
                    setOpenDetailsInvoiceDialog(true);
                  }}
                />
              </Tooltip>
            </>
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
          'Lista de Facturas'
        )
      }
      data={invoices}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
