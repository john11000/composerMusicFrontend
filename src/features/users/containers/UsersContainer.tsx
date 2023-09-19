import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import UsersTable from "@/features/users/components/UsersTable";
import useGetUsers from "@/features/users/hooks/useGetUsers";
import { UsersProvider } from "@/features/users/context/users.context";
import EditUserDialog from "@/features/users/components/EditUserDialog";
import { IUser } from "@/features/users/models/users.type";
import UserSettings from "@/features/users/components/UserSettings";

const UsersContainer = () => {
  const { getUsers: getUsersFromApi, loading } = useGetUsers();

  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const res = await getUsersFromApi();

      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersProvider>
      <UserSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <UsersTable users={users} loading={loading} />
        </Grid>
      </Grid>
      <EditUserDialog getUsers={getUsers} />
    </UsersProvider>
  );
};

export default UsersContainer;
