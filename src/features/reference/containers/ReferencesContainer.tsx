import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ReferencesTable from '@/features/reference/components/ReferencesTable';
import ReferencesEditDialog from '@/features/reference/components/ReferencesEditDialog';
import useGetReferences from '@/features/reference/hooks/useGetReferences';
import { IReferences } from '@/features/reference/models/References.type';
import { ReferencesProvider } from '@/features/reference/context/References.context';
import ReferencesSettings from '@/features/reference/components/ReferencesSettings';
import useGetGroups from '@/features/groups/hooks/useGetGroups';
import { IGroups } from '@/features/groups/models/Groups.type';

const ReferencesContainer = () => {
  const { getReferences: getReferencesFromApi, loading } = useGetReferences();
  const { getGroups: getGroupsFromApi } = useGetGroups();

  const [references, setReferences] = useState<IReferences[]>([]);
  const [groups, setGroups] = useState<IGroups[]>([]);

  const getGroups = async () => {
    try {
      const res = await getGroupsFromApi();

      if (res.data) {
        setGroups(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getReferences = async () => {
    try {
      const res = await getReferencesFromApi();

      if (res.data) {
        setReferences(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReferences();
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReferencesProvider>
      <ReferencesSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ReferencesTable references={references} loading={loading} groups={groups} />
        </Grid>
      </Grid>
      <ReferencesEditDialog getReferences={getReferences} />
    </ReferencesProvider>
  );
};

export default ReferencesContainer;
