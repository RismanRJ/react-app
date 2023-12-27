import { Box, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";

import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { DataProvider } from "../context/DataContext";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <DataProvider>
        <Flex>
          {pathname !== "/auth" &&
          pathname !== "/forgotscreen" &&
          pathname !== "/signup" ? (
            <>
              <Sidebar />
            </>
          ) : null}
          <Box
            flex={1}
            h={"100vh"}
            w={{ base: "calc(100%-50px)", md: "calc(100%-200px) " }}
            zIndex={50}
          >
            {pathname == "/auth" ||
            pathname == "/forgotscreen" ||
            pathname == "/signup" ? null : (
              <>
                <Navbar />
              </>
            )}
            {children}
            {pathname == "/auth" ||
            pathname == "/forgotscreen" ||
            pathname == "/signup" ? null : (
              <>
                <Footer />
              </>
            )}
          </Box>
        </Flex>
      </DataProvider>
    </>
  );
};

export default Layout;
