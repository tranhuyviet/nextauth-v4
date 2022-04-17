import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen shadow-md">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
