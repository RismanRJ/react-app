import { Flex, Spacer, Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { Button, Image, Tooltip } from "@chakra-ui/react";

import useAuthStore from "../store/authStore";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";

import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { onValue, ref } from "firebase/database";

const Sidebar = () => {
  const [size, setsize] = useState(true);
  const navigate = useNavigate();
  const [name, Setname] = useState("");
  const { logoutuser } = useAuthStore((state) => {
    return { logoutuser: state.logout };
  });
  const [userdata, setuserdata] = useState("");

  const items = [
    {
      id: 1,
      icon: <RxDashboard />,
      name: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      icon: <BsCart2 />,
      name: "Orders",
      link: "/message",
    },
    {
      id: 3,
      icon: <MdCategory />,
      name: "Category",
      link: "/category",
    },
    {
      id: 4,
      icon: <MdOutlineContactSupport />,
      name: "Contact us",
      link: "/contact",
    },
  ];

  const id = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (id) {
      const data = JSON.parse(localStorage.getItem("Data"));
      const userRef = ref(db, `users/${id.uid}`);
      let Name = data ? data.firstname + " " + data.Lastname : "";
      Setname(Name);
      onValue(userRef, async (snapshot) => {
        const users_data = snapshot.val();
        setuserdata(users_data);
      });
    }
  }, []);
  const handlesignout = async () => {
    await signOut(auth);

    localStorage.removeItem("user");
    localStorage.removeItem("Data");

    logoutuser();
  };
  return (
    <Box
      h={"100vh"}
      w={size ? "55px" : "200px"}
      className="sidebar"
      zIndex={105}
      transitionProperty={"all"}
      transition={"ease-in"}
      transitionDuration={"0.2s"}
    >
      <Flex
        direction={"column"}
        h={"100%"}
        position={"fixed"}
        left={0}
        w={size ? "55px" : "200px"}
        className="sidebar_card"
        transitionProperty={"all"}
        transition={"linear"}
        transitionDuration={"0.2s"}
        align={size ? "center" : "start"}
      >
        <Flex
          bg={"white"}
          borderRadius={"50%"}
          position={"absolute"}
          fontSize={"1.3rem"}
          top={7}
          right={-2}
          onClick={() => setsize(!size)}
        >
          {!size ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
        </Flex>
        <br />
        <br />
        <br />
        <VStack zIndex={120} align={"center"} w={"full"}>
          <Box
            h={"45px"}
            w={"45px"}
            borderRadius={"50%"}
            bg={"white"}
            border={"solid"}
            borderColor={"black"}
            transition={"all"}
            transitionDuration={"0.2s"}
            _hover={{
              transform: "scale(1.2)",
            }}
          >
            <Image
              src={
                userdata.photoURL
                  ? userdata.photoURL
                  : "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?rs=1&pid=ImgDetMain"
              }
              h={"100%"}
              w={"100%"}
              bg={"white"}
              p={1}
              objectFit={"cover"}
              borderRadius={"50%"}
              onClick={() => navigate("/profile")}
            />
          </Box>
          <Text display={!size ? "block" : "none"}>{name}</Text>
        </VStack>
        {items.map((val) => (
          <HStack
            key={val.id}
            align={"center"}
            justify={size ? "center" : "flex-start"}
            borderRadius={"0.5rem"}
            mx={1}
            my={1}
            w={"full"}
            onClick={() => navigate(val.link)}
          >
            <HStack borderRadius={"10px"}>
              <Tooltip
                key={val.id}
                label={val.name}
                placement="right"
                hasArrow
                bg={"white"}
                color={"black"}
                display={{ base: "none", md: size ? "block" : "none" }}
              >
                <Button
                  bg={"none"}
                  my={2}
                  fontSize={"1.4rem"}
                  p={2}
                  _hover={{
                    bg: size ? "white" : "none",
                  }}
                  onClick={() => navigate(val.link)}
                >
                  {val.icon}
                </Button>
              </Tooltip>
              <Button
                textAlign={"start"}
                display={size ? "none" : "block"}
                bg={"none"}
                _focus={{
                  bg: "none",
                }}
                _hover={"none"}
                w={"full"}
                onClick={() => navigate(val.link)}
              >
                {val.name}
              </Button>
            </HStack>
          </HStack>
        ))}

        <Spacer />
        <HStack
          w={"full"}
          mx={1}
          borderRadius={"10px"}
          my={10}
          justify={size ? "center" : "start"}
          // _hover={
          //   !size
          //     ? {
          //         zIndex: 2000,
          //         mx: "5px",
          //         borderBottom: "solid",
          //         borderBottomColor: "black",
          //       }
          //     : "none"
          // }
        >
          <Flex
            align={"center"}
            borderRadius={"0.5rem"}
            mx={1}
            onClick={handlesignout}
          >
            <Tooltip
              label={"logout"}
              placement="right"
              hasArrow
              bg={"red"}
              display={{ base: "none", md: size ? "block" : "none" }}
            >
              <Button
                bg={"none"}
                _hover={{
                  bg: size ? "red.200" : "none",
                }}
                my={2}
                fontSize={"1.4rem"}
                p={2}
              >
                <FiLogOut />
              </Button>
            </Tooltip>
            <Button
              w={"full"}
              display={size ? "none" : "block"}
              bg={"none"}
              _hover={{
                bg: "none",
              }}
            >
              Logout
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
