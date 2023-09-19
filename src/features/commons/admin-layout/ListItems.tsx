import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";

import { ROUTER_LINK_USERS } from "@/constants/routes-link.constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "@material-ui/core";
import {
  TITLE_MODULE_TRANSCRIPT_MELODY,
  TITLE_MODULE_LIST_MELODY,
  TITLE_MODULE_RECORD_MELODY,
  TITLE_MODULE_GENERATE_MELODY,
} from "@/constants/title.constants";

export const ListItems = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Tooltip title={TITLE_MODULE_LIST_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_USERS}
          component={Link}
          href={ROUTER_LINK_USERS}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_LIST_MELODY} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_TRANSCRIPT_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_USERS}
          component={Link}
          href={ROUTER_LINK_USERS}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_TRANSCRIPT_MELODY} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_RECORD_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_USERS}
          component={Link}
          href={ROUTER_LINK_USERS}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_RECORD_MELODY} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_GENERATE_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_USERS}
          component={Link}
          href={ROUTER_LINK_USERS}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_GENERATE_MELODY} />
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
};
