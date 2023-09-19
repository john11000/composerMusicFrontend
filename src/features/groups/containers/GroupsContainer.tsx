import React, { useEffect, useState } from "react";
import GroupsTable from "@/features/groups/components/GroupsTable";
import { IGroups } from "@/features/groups/models/Groups.type";
import useGetGroups from "@/features/groups/hooks/useGetGroups";
import { GroupsProvider } from "@/features/groups/context/Groups.context";
import GroupsSettings from "@/features/groups/components/GroupsSettings";
import GroupsEditDialog from "@/features/groups/components/GroupsEditDialog";

const GroupsContainer = () => {
  const { getGroups: getGroupsFromApi, loading } = useGetGroups();
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

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GroupsProvider>
      <GroupsSettings />
      <GroupsTable groups={groups} loading={loading} />
      <GroupsEditDialog getGroups={getGroups} />
    </GroupsProvider>
  );
};

export default GroupsContainer;
