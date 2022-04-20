import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PopupMenu from "./PopupMenu";
const MenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto relative">
      <IconButton className="hover:!bg-blue-600/20" onClick={handleClick}>
        <MoreHorizOutlinedIcon className="hover:text-blue-600/80" />
      </IconButton>
      <PopupMenu open={open} handleClose={handleClose} anchorEl={anchorEl} />
    </div>
  );
};

export default MenuButton;
