import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, Badge, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="container mx-auto text-center">
        <p>loading...</p>
      </div>
    );

  return (
    <nav className="h-[70px] bg-gray-700/50 flex items-center space-x-4 text-lg font-semibold text-gray-50 px-4 justify-between">
      <Link href={"/"}>
        <a>
          <Image
            src="/images/meta-logo.png"
            width={50}
            height={50}
            alt="meta-logo"
          />
        </a>
      </Link>
      {status === "unauthenticated" && (
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      )}
      {status === "authenticated" && session.user && (
        <div className="flex space-x-4 h-full items-center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={session.user?.image || undefined}
              alt={session.user?.name || undefined}
              sx={{ width: 52, height: 52 }}
            />
          </StyledBadge>
          <p>{session.user?.name}</p>

          <Divider orientation="vertical" className="!h-8 !bg-gray-200/90" />

          <button onClick={() => signOut()}>Log out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
