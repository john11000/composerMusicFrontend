import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ServicesTable from '@/features/Services/components/ServicesTable';
import ServicesEditDialog from '@/features/Services/components/ServicesEditDialog';
import useGetServices from '@/features/Services/hooks/useGetServices';
import { IServices } from '@/features/Services/models/Services.type';
import { ServicesProvider } from '@/features/Services/context/Services.context';
import ServicesSettings from '@/features/Services/components/ServicesSettings';

const ServicesContainer = () => {
  const { getServices: getServicesFromApi, loading } = useGetServices();

  const [services, setServices] = useState<IServices[]>([]);

  const getServices = async () => {
    try {
      const res = await getServicesFromApi();

      if (res.data) {
        setServices(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ServicesProvider>
      <ServicesSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ServicesTable services={services} loading={loading} />
        </Grid>
      </Grid>
      <ServicesEditDialog getServices={getServices} />
    </ServicesProvider>
  );
};

export default ServicesContainer;
