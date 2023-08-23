import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { useCustomersContext } from '../context/Customers.context';
import { ICustomers, IDepartments } from '../models/Customers.type';
import { toastsManager } from '@/utilities';
import useUpdateCustomer from '../hooks/useUpdateCustomers';
import useCreateCustomer from '../hooks/useCreateCustomers';
import CustomersFormEdit from './CustomersFormEdit';

interface Props {
  getCustomers: () => Promise<void>;
  departaments: IDepartments[];
  customers: ICustomers[];
}

const CustomersEditDialog = ({ getCustomers, departaments, customers }: Props) => {
  const { customerToEdit, setCustomerToEdit, setOpenModalCreateInvoice } = useCustomersContext();
  const { updateCustomer, loading: updateLoading } = useUpdateCustomer();
  const { openEditCustomerDialogState, closeEditCustomerDialog, titleCustomerDialog } = useCustomersContext();
  const { createCustomer, loading: createLoading } = useCreateCustomer();

  const {
    reset,
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICustomers>();

  const handleOnSave = async (data: ICustomers) => {
    try {
      const isEditMode = customerToEdit?.id !== undefined;
      const text = isEditMode ? 'Actualizado' : 'Creado';

      const customerData = {
        id: isEditMode ? customerToEdit?.id : 0,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        addressDescription: data.addressDescription,
        neighborhood: data.neighborhood,
        identificationNumber: data.identificationNumber,
        phone: data.phone,
        optionalPhone: data.optionalPhone,
        cityId: data.cityDrp?.id.toString(),
        departmentId: data.departamentDrp?.value.toString(),
      };

      const res = isEditMode ? await updateCustomer(customerData) : await createCustomer(customerData);

      if (res.data) {
        closeEditCustomerDialog();
        toastsManager.showToast('success', `Cliente ${text} correctamente`);
        await getCustomers();
        setCustomerToEdit(customerData);
        setOpenModalCreateInvoice && setOpenModalCreateInvoice(true);
      } else {
        toastsManager.showToast('error', 'Respuesta inesperada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const findId = customers?.find(
      (customer) => customer.identificationNumber === customerToEdit?.identificationNumber
    );
    setCustomerToEdit(findId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerToEdit]);

  useEffect(() => {
    if (openEditCustomerDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditCustomerDialogState]);

  return (
    <Dialog open={openEditCustomerDialogState} onClose={closeEditCustomerDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleCustomerDialog}</DialogTitle>
        <DialogContent>
          <CustomersFormEdit
            register={register}
            errors={errors}
            watch={watch}
            control={control}
            departaments={departaments}
            setValue={setValue}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={updateLoading || createLoading} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditCustomerDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomersEditDialog;
