import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import {
  Button,
  IconButton,
  Image,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  extendTheme,
  useToast,
} from "@chakra-ui/react";

import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { LiaOpencart } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
const Cart = () => {
  const [isloading, setloading] = useState(true);
  const toast = useToast();
  const [data, setData] = useState([]);
  const user_id = JSON.parse(localStorage.getItem("Data"));
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const product = [];
        const querySnapshot = await getDocs(
          collection(firestore, `products/cart/${user_id.id}`)
        );
        querySnapshot.forEach((doc) => {
          product.push({ ...doc.data(), id: doc.id });
        });

        setData(product);
        setloading(false);
      };

      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, [data]);
  let price = 0;
  let items_count = 0;
  data.map((val) => {
    price += val.price * val.rating.count;
    items_count += val.rating.count;
  });

  const handlecartincrement = async (id, index) => {
    const user = doc(firestore, `products/cart/${user_id.id}`, id);
    try {
      let count = data[index].rating.count;
      console.log(count + 1);
      await updateDoc(user, {
        rating: {
          count: count + 1,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlecartdecrement = async (id, index) => {
    const user = doc(firestore, `products/cart/${user_id.id}`, id);
    try {
      let count = data[index].rating.count;
      console.log(count - 1);
      await updateDoc(user, {
        rating: {
          count: count == 1 ? 1 : count - 1,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handledeleteCart = async (id) => {
    try {
      const user = doc(firestore, `products/cart/${user_id.id}`, id);
      await deleteDoc(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      ) : data.length === 0 ? (
        <VStack textAlign={"center"}>
          <Heading>Oops... Your cart is Empty!!</Heading>
          <LiaOpencart fontSize={"5rem"} />
          <Image src="https://img.freepik.com/free-vector/protective-glass-counters_52683-38360.jpg?size=626&ext=jpg&ga=GA1.1.152971922.1680023370&semt=ais" />
        </VStack>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }}>
          <Container maxW={"xl"} my={2} userSelect={"none"}>
            <Heading size={"md"}>Welcome to Shopping Cart</Heading>
            <SimpleGrid columns={1}>
              {data.map((data, index) => (
                <Box
                  key={index}
                  h={100}
                  w={"full"}
                  bg={"gray.200"}
                  mb={2}
                  borderRadius={"0.5rem"}
                  p={1}
                >
                  <Flex align={"center"} justify={"space-between"}>
                    <Box
                      h={"90px"}
                      w={90}
                      p={2.5}
                      borderRadius={"10"}
                      bg={"white"}
                      mx={1}
                    >
                      <Image
                        borderRadius={"full"}
                        srcSet={data.image}
                        h={"100%"}
                        mx={"auto"}
                        objectFit={"contain"}
                        bg={"transparent"}
                      />
                    </Box>
                    <Box mx={2} me={"auto"}>
                      <Text
                        m={0}
                        fontSize={{ base: "0.6rem", md: "0.8em" }}
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {data.title}
                      </Text>
                      <Text>
                        {`₹` + (data.price * data.rating.count).toFixed(2)}
                      </Text>
                    </Box>
                    <Flex direction={"column"} align={"center"}>
                      <CiCirclePlus
                        onClick={() => handlecartincrement(data.id, index)}
                        fontSize={"1.5rem"}
                      />
                      <Text my={1} userSelect={"none"}>
                        {data.rating.count}
                      </Text>
                      <CiCircleMinus
                        fontSize={"1.5rem"}
                        onClick={() => handlecartdecrement(data.id, index)}
                      />
                    </Flex>
                    <Tooltip label="Discard" hasArrow>
                      <IconButton
                        mx={3}
                        bg={"red.300"}
                        _hover={{
                          bg: "red.500",
                        }}
                        onClick={() => {
                          handledeleteCart(data.id),
                            toast({
                              title: `Product Deleted Successfully!!`,
                              position: "bottom",
                              status: "warning",
                              isClosable: true,
                            });
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </Tooltip>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
          <Container
            h={"auto"}
            w={"full"}
            bg={"blue.200"}
            my={10}
            borderRadius={"1.2rem"}
            bgColor={"gray.200"}
          >
            <HStack justify={"center"} my={5}>
              <Heading>Cart Summary</Heading>
              <MdOutlineShoppingCart fontSize={"2.1rem"} />
            </HStack>
            <TableContainer>
              <Table
                // variant={"striped"}

                size={{ sm: "sm", md: "md", lg: "lg" }}
              >
                <TableCaption>Customer order details</TableCaption>
                <Thead fontSize={{ base: "0.8rem", sm: "0.8rem" }}>
                  <Tr>
                    <Th>Product name</Th>
                    <Th>Items</Th>
                    <Th> Multiply By</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((val) => (
                    <Tr key={val.id} p={0}>
                      <Td>{val.title.slice(0, 12)}</Td>
                      <Td>{` ${val.rating.count}`}</Td>
                      <Td>{"₹" + (val.rating.count * val.price).toFixed(2)}</Td>
                    </Tr>
                  ))}
                  <Tr
                    // my={10}

                    bg={"green.400"}
                    color={"white"}
                    fontWeight={700}
                    fontSize={{ base: "1.2rem" }}
                  >
                    <Td>Total Price</Td>
                    <Td>{items_count}</Td>
                    <Td>{`₹${price.toFixed(2)}`}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Button
              w={"full"}
              my={5}
              bg={"blue.800"}
              textColor={"white"}
              transition={"0.5s"}
              _hover={{
                boxShadow: "2px 2px 25px darkblue",
              }}
            >
              Checkout
            </Button>
          </Container>
        </SimpleGrid>
      )}
    </>
  );
};

export default Cart;
