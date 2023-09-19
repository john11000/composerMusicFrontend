import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress, Switch } from "@mui/material";
import { toastsManager } from "@/utilities";
import { useUsersContext } from "../context/users.context";
import { IUser, roles } from "../models/users.type";
import { ChangeEvent } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { RolesEnum } from "@/models/roles.enum";
import useGetRol from "@/hooks/useGetRol";
interface Props {
  users: IUser[];
  loading: boolean;
}

export default function UsersTable({ users, loading }: Props) {
  const { setUserToEdit, openEditUserDialog, setTitleUserDialog, setIsEdit } =
    useUsersContext();
  const { updateUserState, loading: loadingUpdateUserState } = useUpdateUser();
  const role = useGetRol();

  const handleEditUser = (user: IUser) => {
    setUserToEdit(user);
  };
  const handleClickEditUsers = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleUserDialog("Editar usuario");
    handleEditUser(users[dataTable.rowIndex]);
    openEditUserDialog();
  };

  const onChangeUserState = async (
    e: ChangeEvent<HTMLInputElement>,
    dataTable: MUIDataTableMeta<unknown>
  ) => {
    const rowIndex = dataTable.rowIndex;
    const updatedUsers = [...users];
    updatedUsers[rowIndex].isActive = e.target.checked;
    handleEditUser(users[dataTable.rowIndex]);
    try {
      const res = await updateUserState({
        id: updatedUsers[rowIndex].id,
        isActive: updatedUsers[rowIndex].isActive,
      });

      if (res.data) {
        toastsManager.showToast("success", "Usuario actualizado Correctamente");
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: "Buscar Usuario",
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    { name: "firstName", options: { display: false } },
    { name: "lastName", options: { display: false } },
    {
      name: "firstName",
      label: "Nombre Completo",
      options: {
        customBodyRender: (_, dataTable) => {
          if (role === RolesEnum.ADMINSTRADOR) {
            return (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                }}
                onClick={() => handleClickEditUsers(dataTable)}
              >
                {`${dataTable.rowData[1]} ${dataTable.rowData[2]}`}
              </Typography>
            );
          } else {
            return (
              <Typography variant="body2">{`${dataTable.rowData[1]} ${dataTable.rowData[2]}`}</Typography>
            );
          }
        },
      },
    },
    { name: "email", label: "Email" },
    { name: "location", label: "Ubicación" },
    {
      name: "isActive",
      label: "Estado",
      options: {
        customBodyRender: (_, dataTable) => {
          if (role === RolesEnum.ADMINSTRADOR) {
            return (
              <Typography>
                <Switch
                  checked={dataTable.rowData[6]}
                  onChange={(e) => onChangeUserState(e, dataTable)}
                />
                {dataTable.rowData[6] ? "Activado        " : "Desactivado"}
              </Typography>
            );
          } else {
            return (
              <Typography>
                {dataTable.rowData[6] ? "Activado        " : "Desactivado"}
              </Typography>
            );
          }
        },
      },
    },
    {
      name: "roleId",
      label: "Rol",
      options: {
        customBodyRender: (_, dataTable) => {
          return <Typography>{roles[dataTable.rowData[7] - 1]}</Typography>;
        },
      },
    },
  ];

  return (
    <MUIDataTable
      title={
        loading || loadingUpdateUserState ? (
          <Typography>
            Cargando...
            <CircularProgress size={20} />
          </Typography>
        ) : (
          "Lista de usuarios"
        )
      }
      data={users}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
