import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import useGetDistributors from "@/features/distributor/hooks/useGetdDistributors";
import { DistributorsProvider } from "@/features/distributor/context/Distributors.context";
import DistributorsSettings from "@/features/distributor/components/DistributorsSettings";
import DistributorsTable from "@/features/distributor/components/DistributorsTable";
import DistributorsEditDialog from "@/features/distributor/components/DistributorsEditDialog";
import { IDistributors } from "@/features/distributor/models/Distributors.type";

const DistributorsContainer: React.FC = () => {
  const { getDistributors: getDistributorsFromApi, loading } =
    useGetDistributors();
  const [distributors, setDistributors] = useState<IDistributors[]>([]);
  const dispatcher = useDispatch();

  const getDistributors = async () => {
    try {
      const res = await getDistributorsFromApi();

      if (res.data) {
        setDistributors(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatcher(setAppBarTitle("Distribuidores"));
    getDistributors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatcher]);

  return (
    <DistributorsProvider>
      <DistributorsSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <DistributorsTable distributors={distributors} loading={loading} />
        </Grid>
      </Grid>
      <DistributorsEditDialog getDistributors={getDistributors} />
    </DistributorsProvider>
  );
};

export default DistributorsContainer;
