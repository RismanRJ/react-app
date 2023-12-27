import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/layout";
import { Button, Image, Tooltip } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import DataContext from "../context/DataContext";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import CategoryProduct from "./CategoryProduct";
import Footer from "../components/Footer";
const Category = () => {
  const categories = [
    {
      title: "Men's Clothing",
      id: 1,
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      ],
    },
    {
      title: "Women's Clothing",
      id: 2,
      images: [
        "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
        "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
        "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
        "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
        "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
        "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      ],
    },
    {
      title: "Electronics",
      id: 3,

      images: [
        "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
        "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
        "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
        "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      ],
    },
    {
      title: "Jewelry",
      id: 4,
      images: [
        "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      ],
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      {categories.map((val, index) => (
        <VStack align={"start"} mx={{ base: 0, md: 5 }} key={index}>
          <Heading
            fontSize={{ base: "1.3em", md: "auto" }}
            bg={"gray.200"}
            w={"full"}
            my={2}
            borderRightRadius={"5rem"}
            px={5}
          >
            {val.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2 }} w={"full"} spacing="10">
            <Box
              w={"full"}
              h="270px"
              border={"solid"}
              borderColor={"gray.500"}
              borderRadius={"1.2em"}
            >
              <SimpleGrid
                columns={3}
                spacingX={2}
                spacingY={5}
                placeItems={"center"}
                my={"5"}
              >
                {val.images.map((val, imageindex) => (
                  <Box
                    h={"95px"}
                    w={{ base: "80px", md: "120px" }}
                    key={imageindex}
                    border={"solid"}
                    borderColor={"gray.400"}
                    borderRadius={"0.7rem"}
                    p={1}
                  >
                    <Image srcSet={val} h={"100%"} w={"100%"} />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            <Box
              h="270px"
              border={"solid"}
              borderColor={"gray.500"}
              borderRadius={"1.2em"}
              position={"relative"}
            >
              <SimpleGrid
                columns={3}
                spacingX={2}
                spacingY={5}
                placeItems={"center"}
                my={"5"}
              >
                {val.images.map((val, index) => (
                  <Box
                    key={index}
                    h={"95px"}
                    w={{ base: "80px", md: "120px" }}
                    border={"solid"}
                    borderColor={"gray.400"}
                    borderRadius={"0.7rem"}
                    objectFit={"contain"}
                    p={1}
                  >
                    <Image srcSet={val} h={"100%"} w={"100%"} />
                  </Box>
                ))}
              </SimpleGrid>

              <IoChevronForwardCircleSharp
                color="white"
                fontWeight={"900"}
                fontSize={"2.5rem"}
                style={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  background: "white",
                  borderRadius: "50%",
                  color: "black",
                  zIndex: 10,
                }}
                onClick={() =>
                  navigate(`/products/${val.title}`, {
                    state: {
                      title: val.title,
                    },
                  })
                }
              />
            </Box>
          </SimpleGrid>
        </VStack>
      ))}

      <Outlet />
      <br />
    </>
  );
};

export default Category;
