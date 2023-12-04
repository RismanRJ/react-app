import { Box, Flex, SimpleGrid } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { auth, firestore } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SimpleGrid columns={3} spacing={5} h={"auto"} mb={2}>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
        <Box h={"150px"} bg={"blue.200"} mx={2}></Box>
      </SimpleGrid>
    </>
  );
};

export default Home;
