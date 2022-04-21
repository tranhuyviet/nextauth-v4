import { IconButton } from "@mui/material";
import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PopupMenu from "./PopupMenu";
import { IPostPopulate } from "../../utils/types";

const MenuButton: React.FC<{
  post: IPostPopulate;
  openEditForm: () => void;
}> = ({ post, openEditForm }) => {
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
      <PopupMenu
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        post={post}
        openEditForm={openEditForm}
      />
    </div>
  );
};

export default MenuButton;
