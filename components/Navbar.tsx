import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (status === "loading")
    return (
      <div className="container mx-auto text-center">
        <p>loading...</p>
      </div>
    );

  return (
    <nav className="h-[64px] bg-green-600 flex items-center space-x-4 text-lg font-semibold text-gray-50 px-4 justify-between">
      <Link href={"/"}>
        <a>Home</a>
      </Link>
      {status === "unauthenticated" && (
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      )}
      {status === "authenticated" && (
        <button onClick={() => signOut()}>Log out</button>
      )}
    </nav>
  );
};

export default Navbar;
