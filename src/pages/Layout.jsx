import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Navbar from "../components/Navbar";
import { auth, firestore } from "../../firebase/firebase";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <>
      <Flex>
        {pathname !== "/auth" &&
        pathname !== "/forgotpassword" &&
        pathname !== "/signup" ? (
          <>
            <Sidebar />
          </>
        ) : null}
        <Box
          flex={1}
          h={"auto"}
          w={{ base: "calc(100%-50px)", md: "calc(100%-200px) " }}
        >
          {pathname == "/auth" ||
          pathname == "/forgotpassword" ||
          pathname == "/signup" ? null : (
            <Navbar />
          )}
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
