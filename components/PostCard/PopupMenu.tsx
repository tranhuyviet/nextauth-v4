import { Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { IPostPopulate } from "../../utils/types";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import FollowButton from "./FollowButton";

const PopupMenu: React.FC<{
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  post: IPostPopulate;
  openEditForm: () => void;
}> = ({ open, handleClose, anchorEl, post, openEditForm }) => {
  const { data: session } = useSession();
  if (!post) return <p>Loading</p>;

  const renderMenu =
    post.user._id.toString() === session?.user._id.toString() ? (
      <>
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
            <DeletePostButton postId={post._id} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <EditPostButton openEditForm={openEditForm} />
          </MenuItem>
        </Menu>
      </>
    ) : (
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
          <FollowButton name={post.user.name} />
        </MenuItem>
      </Menu>
    );

  return <div className="">{renderMenu}</div>;
};

export default PopupMenu;
