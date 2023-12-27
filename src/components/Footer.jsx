import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React from "react";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
const Footer = () => {
  const headings = ["Our Solution", "Your Needs", "Offer"];
  const solution = [
    "Integrated Security",
    "Core Features",
    "Product Features",
    "Pricing",
  ];

  return (
    <Box h={"auto"} w={"100%"} color={"white"} bg={"black"} py={5}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }}>
        {headings.map((val, index) => (
          <VStack align={"start"} px={5} my={3} key={index}>
            <Heading fontSize={"1.5rem"}>{val}</Heading>

            {solution.map((val, titleindex) => (
              <HStack align={"center"} key={titleindex}>
                <FaArrowRight />
                <Text color={"gray"} fontWeight={600} m={0}>
                  {val}
                </Text>
              </HStack>
            ))}
          </VStack>
        ))}
        <VStack align={"start"} px={5} mb={5}>
          <Heading fontSize={"1.5rem"}> Accepted Cards</Heading>
          <HStack fontSize={"2rem"} spacing={5}>
            <FaCcMastercard />
            <FaCcVisa />
            <FaCcPaypal />
          </HStack>
          <Heading
            fontSize={"1rem"}
            color={"whitesmoke"}
            my={2}
            fontWeight={900}
          >
            Copyright
          </Heading>
          <HStack align={"center"}>
            <FaCopyright fontSize={"1rem"} color="white" />
            <Text m={0}>Risman 2023</Text>
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
