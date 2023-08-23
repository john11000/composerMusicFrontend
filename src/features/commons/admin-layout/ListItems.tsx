import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';

import {
  ROUTER_LINK_CUSTOMERS,
  ROUTER_LINK_DISTRIBUTOR,
  ROUTER_LINK_FAULT_CAUSAL,
  ROUTER_LINK_GROUPS,
  ROUTER_LINK_INVOICES,
  ROUTER_LINK_REFERENCES,
  ROUTER_LINK_REPORTS,
  ROUTER_LINK_SERVICES,
  ROUTER_LINK_SERVICE_ORDERS,
  ROUTER_LINK_USERS,
} from '@/constants/routes-link.constants';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AltRoute,
  Assessment,
  DriveFileMove,
  Engineering,
  FileCopy,
  Grading,
  PersonAdd,
  SmsFailed,
  Workspaces,
} from '@mui/icons-material';
import { RolesEnum } from '@/models/roles.enum';
import { Tooltip } from '@material-ui/core';
import {
  TITLE_MODULE_CUSTOMERS,
  TITLE_MODULE_DISTRIBUTOR,
  TITLE_MODULE_FAULT_CAUSAL,
  TITLE_MODULE_GROUPS,
  TITLE_MODULE_INVOICES,
  TITLE_MODULE_REFERENCES,
  TITLE_MODULE_REPORTS,
  TITLE_MODULE_SERVICES,
  TITLE_MODULE_SERVICE_ORDERS,
  TITLE_MODULE_USERS,
} from '@/constants/title.constants';
import useGetRol from '@/hooks/useGetRol';

export const ListItems = () => {
  const router = useRouter();
  const role = useGetRol();
  return (
    <React.Fragment>
      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_USERS}>
          <ListItemButton selected={router.pathname === ROUTER_LINK_USERS} component={Link} href={ROUTER_LINK_USERS}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_USERS} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_GROUPS}>
          <ListItemButton selected={router.pathname === ROUTER_LINK_GROUPS} component={Link} href={ROUTER_LINK_GROUPS}>
            <ListItemIcon>
              <Workspaces />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_GROUPS} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_REFERENCES}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_REFERENCES}
            component={Link}
            href={ROUTER_LINK_REFERENCES}
          >
            <ListItemIcon>
              <AltRoute />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_REFERENCES} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_SERVICES}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_SERVICES}
            component={Link}
            href={ROUTER_LINK_SERVICES}
          >
            <ListItemIcon>
              <DriveFileMove />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_SERVICES} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_CUSTOMERS}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_CUSTOMERS}
            component={Link}
            href={ROUTER_LINK_CUSTOMERS}
          >
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_CUSTOMERS} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_DISTRIBUTOR}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_DISTRIBUTOR}
            component={Link}
            href={ROUTER_LINK_DISTRIBUTOR}
          >
            <ListItemIcon>
              <Engineering />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_DISTRIBUTOR} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_INVOICES}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_INVOICES}
            component={Link}
            href={ROUTER_LINK_INVOICES}
          >
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_INVOICES} />
          </ListItemButton>
        </Tooltip>
      )}

      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_FAULT_CAUSAL}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_FAULT_CAUSAL}
            component={Link}
            href={ROUTER_LINK_FAULT_CAUSAL}
          >
            <ListItemIcon>
              <SmsFailed />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_FAULT_CAUSAL} />
          </ListItemButton>
        </Tooltip>
      )}
      {(role == RolesEnum.ADMINSTRADOR || role == RolesEnum.TECNICO || role == RolesEnum.AUXILIAR) && (
        <Tooltip title={TITLE_MODULE_SERVICE_ORDERS}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_SERVICE_ORDERS}
            component={Link}
            href={ROUTER_LINK_SERVICE_ORDERS}
          >
            <ListItemIcon>
              <Grading />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_SERVICE_ORDERS} />
          </ListItemButton>
        </Tooltip>
      )}
      {role == RolesEnum.ADMINSTRADOR && (
        <Tooltip title={TITLE_MODULE_REPORTS}>
          <ListItemButton
            selected={router.pathname === ROUTER_LINK_REPORTS}
            component={Link}
            href={ROUTER_LINK_REPORTS}
          >
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary={TITLE_MODULE_REPORTS} />
          </ListItemButton>
        </Tooltip>
      )}
    </React.Fragment>
  );
};
