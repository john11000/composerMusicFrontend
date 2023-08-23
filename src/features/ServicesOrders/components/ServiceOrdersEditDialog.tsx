import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useServiceOrdersContext } from '../context/ServiceOrders.context';
import { ServiceOrdersFormEdit } from './ServiceOrdersFormEdit';
import { IServiceOrders } from '../models/ServiceOrders.type';
import { ICustomers } from '@/features/customers/models/Customers.type';
import { IServices } from '@/features/Services/models/Services.type';
import { IUser } from '@/features/users/models/users.type';
import useUpdateCustomer from '@/features/customers/hooks/useUpdateCustomers';
import { useCustomersContext } from '@/features/customers/context/Customers.context';
import { InvoiceItems } from '@/features/invoices/models/Invoices.type';
import { useInvoicesContext } from '@/features/invoices/context/Invoices.context';
import useCreateServiceOrder from '../hooks/useCreateServiceOrders';
import { CreateNewServiceOrderDto } from '../helper/createServiceOrderAdapter';
import useUpdateInvoice from '@/features/invoices/hooks/useUpdateInvoices';
import { AxiosResponse } from 'axios';

interface Props {
  getServiceOrders: () => void;
  customers: ICustomers[];
  getCustomers: () => void;
  getServices: () => void;
  services: IServices[];
  users: IUser[];
}

export default function ServiceOrdersEditDialog({ getServiceOrders, customers, getCustomers, services, users }: Props) {
  const { openEditServiceOrderDialogState, closeEditServiceOrderDialog, titleServiceOrderDialog } =
    useServiceOrdersContext();
  // const { serviceOrderToEdit } = useServiceOrdersContext();
  const { createServiceOrder, loading: loadingCreate } = useCreateServiceOrder();
  // const { updateServiceOrder, loading } = useUpdateServiceOrder();
  const { customerIdentification, invoices } = useInvoicesContext();
  const { closeEditCustomerDialog, setCustomerToEdit } = useCustomersContext();
  const { updateCustomer } = useUpdateCustomer();
  const { updateInvoice } = useUpdateInvoice();

  const [selectedReferences, setSelectedReferences] = useState<InvoiceItems[]>([]);
  const {
    reset,
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IServiceOrders>();

  const onSubmit = async (data: IServiceOrders) => {
    if (selectedReferences.length !== 0) {
      try {
        const text = 'creado';
        const res = await createServiceOrder(CreateNewServiceOrderDto(data, selectedReferences));
        const customerData = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          neighborhood: data.neighborhood,
          phone: data.phone,
          optionalPhone: data.optionalPhone ?? '',
          addressDescription: data.addressDescription ?? '',
          // Hasta aqui van los datos del formulario
          cityId: data.cityId.toString(),
          departmentId: data.departmentId,
          email: data.email,
        };
        await updateCustomer(customerData);
        //eslint-disable-next-line
        const queries: Promise<AxiosResponse<unknown, any>>[] = [];

        selectedReferences.map((reference) => {
          const invoiceFromReference = invoices.filter((invoice) => invoice.id === reference.invoiceId);
          const newInvoice = {
            ...invoiceFromReference[0],
            inoviceItems: selectedReferences.filter((invoice) => invoice.invoiceId === reference.invoiceId),
          };

          queries.push(updateInvoice(newInvoice));
        });

        await Promise.all(queries);

        if (res.data) {
          closeEditServiceOrderDialog();
          closeEditCustomerDialog();
          toastsManager.showToast('success', 'Ordenes de servicio ' + text + ' correctamente');
          getCustomers();
        } else {
          toastsManager.showToast('error', 'Respuesta inesperada');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toastsManager.showToast('warning', 'Debe seleccionar al menos una referencia para crear la orden de servicio');
    }
  };

  useEffect(() => {
    setSelectedReferences([]);
  }, []);

  useEffect(() => {
    const customerSelected = customers.find((customer) => customer.id.toString() === customerIdentification);
    if (customerSelected) {
      setCustomerToEdit(customerSelected);
      setValue('identificationNumber', customerSelected.identificationNumber);
      setValue('firstName', customerSelected.firstName);
      setValue('lastName', customerSelected.lastName);
      setValue('address', customerSelected.address);
      setValue('phone', customerSelected.phone);
      setValue('departmentId', customerSelected.departmentId.toString());
      setValue('cityId', customerSelected.cityId);
      setValue('email', customerSelected.email);
      setValue('optionalPhone', customerSelected.optionalPhone);
      setValue('neighborhood', customerSelected.neighborhood);
      setValue('addressDescription', customerSelected.addressDescription);
      setValue('id', customerSelected.id);
      setValue('id', customerSelected.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerIdentification]);

  useEffect(() => {
    if (openEditServiceOrderDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditServiceOrderDialogState]);

  return (
    <Dialog
      sx={{ overflowY: 'hidden' }}
      open={openEditServiceOrderDialogState}
      onClose={closeEditServiceOrderDialog}
      maxWidth="xl"
      fullWidth
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{titleServiceOrderDialog}</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <ServiceOrdersFormEdit
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            customers={customers}
            getCustomers={getCustomers}
            setValue={setValue}
            services={services}
            getServices={getServiceOrders}
            users={users}
            selectedReferences={selectedReferences}
            setSelectedReferences={setSelectedReferences}
          ></ServiceOrdersFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loadingCreate} type="submit">
            Generar orden de servicio
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditServiceOrderDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
