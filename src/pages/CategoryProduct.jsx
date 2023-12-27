import {
  Box,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Outlet } from "react-router-dom";
import api from "./api/items";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button, IconButton, Image, Skeleton, Toast } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const CategoryProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState("true");
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const res = await api.get(
        `products/category/${location.state.title.toLowerCase()}`
      );
      setData(res.data);
      // console.log(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  const user_id = JSON.parse(localStorage.getItem("Data"));
  const addcart = async (data) => {
    let counter = 0;
    let id = "";
    let userdata = {};
    try {
      const snap = await getDocs(
        collection(firestore, `products/cart/${user_id.id}`)
      );
      const coll = collection(firestore, `products/cart/${user_id.id}`);
      snap.empty
        ? (counter = 0)
        : snap.forEach((val) => {
            if (val.data().id === data.id) {
              id += val.id;
              userdata = val.data();
              counter = counter + 1;
            }
          });
      if (counter === 0) {
        await addDoc(coll, {
          ...data,
          rating: {
            count: 1,
          },
        });
      } else {
        const user = doc(firestore, `products/cart/${user_id.id}`, id);
        await updateDoc(user, {
          rating: {
            count: userdata.rating.count + 1,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    console.log("added succesfully");
  };
  return (
    <>
      {loading ? (
        <SimpleGrid columns={2} spacing={5}>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
        </SimpleGrid>
      ) : (
        <>
          <Link to={"/category"}>
            <HStack align={"center"}>
              <IoArrowBackCircleSharp fontSize={"1.5rem"} />
              <Text m={0} p={0}>
                Back to Category
              </Text>
            </HStack>
          </Link>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={5}
            h={"auto"}
            my={2}
            mx={2}
          >
            {data.map((data, index) => (
              <Box
                key={data.id}
                bg={"gray.200"}
                borderRadius={10}
                border={"solid"}
                borderWidth={3}
                borderColor={"gray.400"}
                h={"460px"}
                onClick={() => {
                  navigate("/product", { state: data });
                }}
              >
                <VStack mx={1} px={2} mb={2} zIndex={-1} h={"full"}>
                  <Image
                    p={"2rem"}
                    srcSet={data.image}
                    bg={"white"}
                    m={1}
                    borderRadius={20}
                    h={"300"}
                    w={"full"}
                    objectFit={"cover"}
                  />
                  <Flex direction={"column"}>
                    <Heading fontSize={{ base: "0.9em", md: "1rem" }} m={0}>
                      {data.title}
                    </Heading>
                    <Text m={0} fontWeight={900}>
                      {"₹" + data.price}
                    </Text>
                  </Flex>
                  <Spacer />

                  <Button
                    mb={3}
                    w={"full"}
                    bg={"blue.800"}
                    textColor={"white"}
                    transition={"0.5s"}
                    _hover={{
                      boxShadow: "2px 2px 25px darkblue",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addcart(data),
                        Toast({
                          title: `Product Added Successfully!!`,
                          status: "success",
                          isClosable: true,
                        });
                    }}
                  >
                    Add to Cart
                    <MdOutlineShoppingCart
                      fontSize={"1.3rem"}
                      fontWeight={900}
                    />
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
      <IconButton
        borderRadius={"50%"}
        bg={"darkblue"}
        color={"white"}
        h={"60px"}
        w={"60px"}
        p={3}
        fontSize={"2rem"}
        display={"block"}
        position={"sticky"}
        ms={"auto"}
        bottom={0}
        icon={<MdOutlineShoppingCart />}
        onClick={() => navigate("/cart")}
      />
    </>
  );
};

export default CategoryProduct;
