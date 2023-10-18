import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  ROUTER_MODULE_GENERATE_MELODY,
  ROUTER_MODULE_LIST_MELODY,
  ROUTER_MODULE_TRANSCRIPT_MELODY,
} from "@/constants/routes-link.constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "@material-ui/core";
import {
  TITLE_MODULE_TRANSCRIPT_MELODY,
  TITLE_MODULE_LIST_MELODY,
  TITLE_MODULE_GENERATE_MELODY,
} from "@/constants/title.constants";
import { FormatListBulleted, Memory, Spellcheck } from "@mui/icons-material";

export const ListItems = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Tooltip title={TITLE_MODULE_LIST_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_MODULE_LIST_MELODY}
          component={Link}
          href={ROUTER_MODULE_LIST_MELODY}
        >
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_LIST_MELODY} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_TRANSCRIPT_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_MODULE_TRANSCRIPT_MELODY}
          component={Link}
          href={ROUTER_MODULE_TRANSCRIPT_MELODY}
        >
          <ListItemIcon>
            <Spellcheck />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_TRANSCRIPT_MELODY} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_GENERATE_MELODY}>
        <ListItemButton
          selected={router.pathname === ROUTER_MODULE_GENERATE_MELODY}
          component={Link}
          href={ROUTER_MODULE_GENERATE_MELODY}
        >
          <ListItemIcon>
            <Memory />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_GENERATE_MELODY} />
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
};
