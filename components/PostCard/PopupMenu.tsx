import { Menu, MenuItem } from "@mui/material";
import React from "react";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

const PopupMenu: React.FC<{
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
}> = ({ open, handleClose, anchorEl }) => {
  return (
    <div className="">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} className="!min-w-[250px]">
          <DeletePostButton />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EditPostButton />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PopupMenu;
