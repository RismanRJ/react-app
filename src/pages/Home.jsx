import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

import {
  Button,
  IconButton,
  Image,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, firestore } from "../../firebase/firebase";
import DataContext from "../context/DataContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const toast = useToast();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState("true");
  const user_id = JSON.parse(localStorage.getItem("Data"));
  const navigate = useNavigate();
  const { resdata } = useContext(DataContext);
  useEffect(() => {
    resdata ? setloading(false) : setloading(true);
  });

  const addcart = async (data) => {
    let counter = 0;
    let id = "";
    let userdata = {};
    try {
      // console.log(user_id);
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
      // console.log(counter, id);
    } catch (error) {
      console.log(error);
    }

    console.log("added succesfully");
  };

  return (
    <>
      {loading ? (
        <SimpleGrid columns={2} spacing={5} h={"100vh"}>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
          <Skeleton h={"150px"} bg={"gray.400"}></Skeleton>
        </SimpleGrid>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={5}
          my={2}
          mx={2}
        >
          {resdata.map((data, index) => (
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
                      toast({
                        title: `Product Added Successfully!!`,
                        status: "success",
                        isClosable: true,
                      });
                  }}
                >
                  Add to Cart
                  <MdOutlineShoppingCart fontSize={"1.3rem"} fontWeight={900} />
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
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

export default Home;
