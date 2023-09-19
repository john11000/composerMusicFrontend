import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useGetFaultCausals from "@/features/faultCausal/hooks/useGetFaultCausals";
import { IFaultCausals } from "@/features/faultCausal/models/FaultCausals.type";
import { FaultCausalsProvider } from "@/features/faultCausal/context/FaultCausals.context";
import FaultCausalsSettings from "@/features/faultCausal/components/FaultCausalsSettings";
import FaultCausalsTable from "@/features/faultCausal/components/FaultCausalsTable";
import FaultCausalsEditDialog from "@/features/faultCausal/components/FaultCausalsEditDialog";

const FaultCausalsContainer: React.FC = () => {
  const { getFaultCausals: getFaultCausalsFromApi, loading } =
    useGetFaultCausals();

  const [faultCausals, setFaultCausals] = useState<IFaultCausals[]>([]);

  const getFaultCausals = async () => {
    try {
      const res = await getFaultCausalsFromApi();

      if (res.data) {
        setFaultCausals(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFaultCausals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FaultCausalsProvider>
      <FaultCausalsSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <FaultCausalsTable faultCausals={faultCausals} loading={loading} />
        </Grid>
      </Grid>
      <FaultCausalsEditDialog getFaultCausals={getFaultCausals} />
    </FaultCausalsProvider>
  );
};

export default FaultCausalsContainer;
