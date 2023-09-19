import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Close,
  DoDisturb,
  LockOpen,
  MoreVert,
  RemoveRedEye,
} from "@mui/icons-material";
import useGetRol from "@/hooks/useGetRol";
import { RolesEnum } from "@/models/roles.enum";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";
import {
  ActionEnum,
  IServiceOrders,
  ServicesOrderStateEnum,
} from "../models/ServiceOrders.type";
import ToastsManager from "@/utilities/toasts.manager";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

type props = {
  seviceOrder: IServiceOrders;
};
export default function ServiceOrdersTableMenu({ seviceOrder }: props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    openCloseServiceOrderDialog,
    setTitleServiceOrderDialog,
    setActionTodo,
  } = useServiceOrdersContext();
  const role = useGetRol();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action: ActionEnum) => {
    setActionTodo(action);
    switch (action) {
      case ActionEnum.ASIGNAR_TECNICO:
        {
          setTitleServiceOrderDialog("Asignar técnico");
          openCloseServiceOrderDialog();
        }
        break;
      case ActionEnum.VER:
        {
          ToastsManager.showToast("success", "Descargando archivo");
        }
        break;
      case ActionEnum.CERRAR:
        {
          setTitleServiceOrderDialog("Cerrar orden de servicios");
          openCloseServiceOrderDialog();
        }
        break;
      case ActionEnum.DESBLOQUEAR:
        {
          setTitleServiceOrderDialog("Desbloquear orden de servicios");
          openCloseServiceOrderDialog();
        }
        break;
      case ActionEnum.ANULAR:
        {
          setTitleServiceOrderDialog("Anular orden de servicios");
          openCloseServiceOrderDialog();
        }
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
      >
        <MoreVert />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* {(role === RolesEnum.AUXILIAR || RolesEnum.ADMINSTRADOR) && (
          <MenuItem onClick={() => handleClose(ActionEnum.ASIGNAR_TECNICO)} disableRipple>
            <EditIcon />
            Asignar técnico
          </MenuItem>
        )} */}
        {(role === RolesEnum.TECNICO ||
          role === RolesEnum.AUXILIAR ||
          RolesEnum.ADMINSTRADOR) && (
          <MenuItem onClick={() => handleClose(ActionEnum.VER)} disableRipple>
            <RemoveRedEye />
            Ver
          </MenuItem>
        )}
        {role === RolesEnum.ADMINSTRADOR && (
          <MenuItem
            onClick={() => handleClose(ActionEnum.ANULAR)}
            disableRipple
          >
            <DoDisturb />
            Anular
          </MenuItem>
        )}
        {(role === RolesEnum.TECNICO ||
          role === RolesEnum.AUXILIAR ||
          RolesEnum.ADMINSTRADOR) && (
          <MenuItem
            onClick={() => handleClose(ActionEnum.CERRAR)}
            disableRipple
          >
            <Close />
            Cerrar
          </MenuItem>
        )}
        {RolesEnum.ADMINSTRADOR &&
          seviceOrder?.status === ServicesOrderStateEnum.BLOQUEADAS && (
            <MenuItem
              onClick={() => handleClose(ActionEnum.DESBLOQUEAR)}
              disableRipple
            >
              <LockOpen />
              Desbloquear
            </MenuItem>
          )}
      </StyledMenu>
    </div>
  );
}
