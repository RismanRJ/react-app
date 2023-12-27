import {
  Box,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Button,
  useToast,
  Spacer,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Product = () => {
  const [count, Setcount] = useState(1);
  const location = useLocation();
  const toast = useToast();
  const data = location.state;
  const [active, Setactive] = useState(true);
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("Data"));
  const addcart = async (data, e) => {
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
            count: userdata.rating.count + count,
          },
        });
      }
      // console.log(counter, id);
    } catch (error) {
      console.log(error);
    }

    console.log("added succesfully");
  };
  const stars = Array(5).fill(0);
  const handleincrement = () => {
    let val = count;
    val = val + 1;
    count < 10 ? Setcount(val) : Setcount(10);
  };

  const handledecrement = () => {
    let val = count;
    val = val - 1;
    count > 1 ? Setcount(val) : Setcount(1);
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box h={"100vh"} w={"full"}>
          <Link onClick={() => navigate("/")}>
            <HStack align={"center"}>
              <IoArrowBackCircleSharp fontSize={"1.5rem"} />
              <Text m={0} p={0}>
                Back to Home
              </Text>
            </HStack>
          </Link>

          <VStack
            justify={"center"}
            align={"center"}
            h={"100%"}
            textAlign={"center"}
          >
            <Heading display={{ base: "block", sm: "block", md: "none" }}>
              {data.title}
            </Heading>
            <Image
              p={5}
              h={"500px"}
              srcSet={data.image}
              objectFit={"contain"}
              // bg={"gray.200"}
              borderRadius={"1rem"}
            />
            <HStack justify={"center"} my={2}>
              <Box
                h={"50px"}
                w={"50px"}
                borderRadius={"0.5rem"}
                border={active ? "solid" : ""}
                borderColor={active ? "gray.400" : ""}
                p={1}
                onClick={() => Setactive(!active)}
              >
                <Image srcSet={data.image} h={"full"} w={"full"} />
              </Box>
              <Box
                h={"50px"}
                w={"50px"}
                borderRadius={"0.5rem"}
                border={active ? "solid" : ""}
                borderColor={active ? "gray.400" : ""}
                p={1}
                onClick={() => Setactive(active)}
              >
                <Image srcSet={data.image} h={"full"} w={"full"} />
              </Box>
              <Box
                h={"50px"}
                w={"50px"}
                borderRadius={"0.5rem"}
                border={active ? "solid" : ""}
                borderColor={active ? "gray.400" : ""}
                p={1}
                onClick={() => Setactive(!active)}
              >
                <Image srcSet={data.image} h={"full"} w={"full"} />
              </Box>
              <Box
                h={"50px"}
                w={"50px"}
                borderRadius={"0.5rem"}
                border={active ? "solid" : ""}
                borderColor={active ? "gray.400" : ""}
                p={1}
                onClick={() => Setactive(!active)}
              >
                <Image srcSet={data.image} h={"full"} w={"full"} />
              </Box>
            </HStack>
          </VStack>
        </Box>

        <Box h={"100vh"} w="full" px={10} py={5}>
          <VStack
            justify={{ base: "start", sm: "start", md: "center" }}
            align={"flex-start"}
            h={"100%"}
          >
            <Text fontWeight={700} fontSize={"1.5rem"} textAlign={"center"}>
              {data.title}
            </Text>
            <Box
              h={"4px"}
              w={"350px"}
              bg={"gray.500"}
              borderRadius={"0.4rem"}
              mx={"auto"}
            />
            <Text fontWeight={900} fontSize={"1.5rem"}>{`$${data.price}`}</Text>

            <HStack align={"baseline"}>
              {stars.map((_, index) =>
                data.rating.rate.toFixed() == index ? (
                  <FaStarHalfAlt key={index} color="gold" />
                ) : (
                  <FaStar
                    key={index}
                    color={data.rating.rate > index ? "gold" : "black"}
                  />
                )
              )}

              <p
                style={{
                  fontWeight: "500",
                }}
              >
                {data.rating.rate} Ratings
              </p>
            </HStack>
            <Text fontWeight={700} fontSize={"1.5rem"} color={"gray.500"}>
              {data.category.toUpperCase()}
            </Text>
            <Text textAlign={"justify"} fontWeight={500} fontStyle={"italic"}>
              {data.description}
            </Text>
            <Flex direction={"row"} w={"full"} align={"center"}>
              <Heading>Quantity</Heading>
              <Spacer />
              <CiCirclePlus
                fontSize={"2rem"}
                onClick={() => handleincrement()}
              />
              <Text my={1} userSelect={"none"} fontWeight={"500"}>
                {count}
              </Text>
              <CiCircleMinus
                fontSize={"2rem"}
                onClick={() => handledecrement()}
              />
            </Flex>
            <Button
              my={10}
              w={"full"}
              bg={"blue.800"}
              textColor={"white"}
              transition={"0.5s"}
              _hover={{
                boxShadow: "2px 2px 25px darkblue",
              }}
              onClick={() => {
                toast({
                  title: `Product Added Successfully!!`,
                  status: "success",
                  isClosable: true,
                }),
                  addcart(data);
              }}
            >
              Add to Cart
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Product;
