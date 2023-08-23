import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';
import { InvoiceItems } from '../models/Invoices.type';
import { Delete, Edit } from '@mui/icons-material';
import { Tooltip } from '@material-ui/core';
import { UseFormSetValue } from 'react-hook-form';
import { desestructuAddress, formatAddress } from '../helpers/formatAddress';
import useGetDepartaments from '@/hooks/useGetCities';
import { useEffect, useState } from 'react';
import { IDepartments } from '@/features/customers/models/Customers.type';

interface Props {
  invoicesItem: InvoiceItems[];
  setInvoicesItem?: (invoicesItem: InvoiceItems[]) => void;
  setValue?: UseFormSetValue<InvoiceItems>;
  saveInvoice?: (invoicesItem: InvoiceItems[]) => void;
  isDetails?: boolean;
  setIsEditReference?: (isEditReference: boolean) => void;
}

export default function InvoicesTableReferences({
  invoicesItem,
  setInvoicesItem,
  setValue,
  saveInvoice,
  isDetails,
  setIsEditReference,
}: Props) {
  const [departaments, setDepartaments] = useState<IDepartments[]>([]);
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();
  const getDepartaments = async () => {
    try {
      const res = await getDepartamentsFromApi();
      if (res.data) {
        setDepartaments(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDepartaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editItem = (id: number) => {
    if (!setValue) return;
    const auxDrp = {
      id: invoicesItem[id]?.auxDrp?.id ?? 0,
      label:
        invoicesItem[id]?.auxDrp?.label ??
        `${invoicesItem[id]?.product.referenceCode} - ${invoicesItem[id]?.product.referenceDescription}`,
      value: invoicesItem[id]?.auxDrp?.value ?? invoicesItem[id]?.productId.toString() ?? '',
    };

    const codeCityToFind = invoicesItem[id]?.cityId;
    const selectedDepartment = departaments.find((department) =>
      department.cities.some((city) => city.id === codeCityToFind)
    );
    const departmentIndex = departaments.findIndex((department) =>
      department.cities.some((city) => city.id === codeCityToFind)
    );

    const departamentDrp = {
      id: departmentIndex ?? 0,
      label: selectedDepartment?.name ?? '',
      value: selectedDepartment?.id.toString() ?? '',
    };

    const selectedCity = selectedDepartment?.cities.find((city) => city.id === invoicesItem[id]?.cityId);
    const cityDrp = {
      id: 0,
      value: selectedCity?.id.toString() ?? '',
      label: selectedCity?.name ?? '',
    };

    setTimeout(() => {
      setValue('cityDrp', cityDrp);
    }, 500);

    setValue('id', invoicesItem[id]?.id ?? 0);
    setValue('auxDrp', auxDrp);
    setValue('referenceDescription', invoicesItem[id]?.referenceDescription ?? '');
    setValue('serial', invoicesItem[id]?.serial ?? '');
    setValue('quantity', invoicesItem[id]?.quantity ?? 0);
    setValue('unitValue', invoicesItem[id]?.unitValue ?? 0);
    setValue('warrantyDays', invoicesItem[id]?.warrantyDays ?? 0);
    setValue('isActive', invoicesItem[id]?.isActive);
    setValue('address', invoicesItem[id]?.address ?? '');
    setValue('location', invoicesItem[id]?.location ?? '');
    setValue('neighborhood', invoicesItem[id]?.neighborhood ?? '');
    setValue('optionalPhone', invoicesItem[id]?.optionalPhone ?? '');
    setValue('departamentDrp', departamentDrp);
    setValue('principalPhone', invoicesItem[id]?.principalPhone ?? '');
    setValue('contact', invoicesItem[id]?.contact ?? '');
    setValue('typeLocation', invoicesItem[id]?.typeLocation ?? '');
    setValue('locationNumber', invoicesItem[id]?.locationNumber ?? '');
    setValue('numberLocation', invoicesItem[id]?.numberLocation ?? '');
    setValue('secondNumberLocation', invoicesItem[id]?.secondNumberLocation ?? '');

    if (
      invoicesItem[id]?.address !== '' &&
      invoicesItem[id]?.address !== undefined &&
      invoicesItem[id]?.address !== null
    ) {
      const { typeLocation, locationNumber, numberLocation, secondNumberLocation } = desestructuAddress(
        invoicesItem[id]?.address
      );
      setValue('typeLocation', typeLocation);
      setValue('locationNumber', locationNumber);
      setValue('numberLocation', numberLocation);
      setValue('secondNumberLocation', secondNumberLocation);
    }
    setIsEditReference && setIsEditReference(true);
    deleteItem(id);
  };

  const deleteItem = (id: number) => {
    invoicesItem.splice(id, 1);
    if (setInvoicesItem && invoicesItem && saveInvoice) {
      setInvoicesItem([...invoicesItem]);
      saveInvoice(invoicesItem);
    }
  };

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar referencia por nombre de referencia',
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    {
      name: 'referenceCode',
      label: 'Código de referencia',
    },
    {
      name: 'referenceDescription',
      label: 'Descripción',
      options: {
        customBodyRender: (_, dataTable) => {
          return <span>{invoicesItem[dataTable.rowIndex]?.referenceDescription}</span>;
        },
      },
    },
    {
      name: 'isActive',
      label: 'Vigente',
      options: {
        customBodyRender: (value) => {
          return <span>{value ? 'Si' : 'No'}</span>;
        },
      },
    },
    {
      name: 'serial',
      label: 'Serial',
    },
    // { name: 'quantity', label: 'Cantidad' },
    // { name: 'unitValue', label: 'Valor unidad' },
    // {
    //   name: 'referenceDescription',
    //   label: 'Valor total',
    //   options: {
    //     customBodyRender: (_, dataTable) => {
    //       return <span>{dataTable.rowData[5] * dataTable.rowData[6]}</span>;
    //     },
    //   },
    // },
    {
      name: 'warrantyDays',
      label: 'Garantía',
      options: {
        customBodyRender: (_, dataTable) => {
          return <span>{invoicesItem[dataTable.rowIndex]?.warrantyDays}</span>;
        },
      },
    },
    {
      name: 'contactNumber',
      label: 'Contacto',
      options: {
        customBodyRender: (_, dataTable) => {
          return <span>{invoicesItem[dataTable.rowIndex]?.contact}</span>;
        },
      },
    },
    {
      name: 'address',
      label: 'Dirección  ',
      options: {
        customBodyRender: (address, dataTable) => {
          if (address !== '') return <span>{address}</span>;
          return <span>{formatAddress(invoicesItem[dataTable.rowIndex])}</span>;
        },
      },
    },
    {
      name: 'Opciones',
      label: 'Opciones',
      options: {
        display: !isDetails,
        customBodyRender: (_, dataTable) => {
          return (
            <span>
              <Tooltip title="Editar">
                <Edit sx={{ cursor: 'pointer' }} onClick={() => editItem(dataTable.rowIndex)} />
              </Tooltip>

              <Tooltip title="Eliminar">
                <Delete sx={{ cursor: 'pointer' }} onClick={() => deleteItem(dataTable.rowIndex)} />
              </Tooltip>
            </span>
          );
        },
      },
    },
  ];

  return (
    <MUIDataTable title="Lista de referencias" data={invoicesItem} columns={columns} options={options}></MUIDataTable>
  );
}
