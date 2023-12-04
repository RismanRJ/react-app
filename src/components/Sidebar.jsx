import { Flex, Spacer, Box } from "@chakra-ui/layout";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { Button } from "@chakra-ui/react";
import { color } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
  const items = [
    {
      icon: "fa fa-home",
      name: "Home",
      link: "/",
    },
    {
      icon: "fa fa-facebook",
      name: "Message",
      link: "/message",
    },
    {
      icon: "fa fa-instagram",
      name: "Message",
      link: "",
    },
    {
      icon: "fa fa-twitter",
      name: "Message",
      link: "",
    },
  ];

  const handlesignout = async () => {
    await signOut(auth);

    navigate("/auth");
  };
  return (
    <Box w={{ base: "50px", md: "200px" }} color={"black"}>
      <Flex
        direction={"column"}
        bg={"gray.300"}
        h={"100vh"}
        position={"fixed"}
        w={{ base: "50px", md: "200px" }}
      >
        {items.map((val, index) => (
          <Flex
            key={index}
            align={"center"}
            justify={{ base: "center", md: "flex-start" }}
            _hover={{
              bg: { base: "none", md: "green.300" },
            }}
            borderRadius={"0.5rem"}
            mx={1}
          >
            <Button
              bg={"none"}
              my={2}
              fontSize={"1.4rem"}
              _hover={{
                bg: { base: "green.300", md: "none" },
              }}
            >
              <Link className={val.icon} to={val.link}></Link>
            </Button>
            <Button
              display={{ base: "none", md: "block" }}
              bg={"none"}
              _hover={{
                bg: "none",
              }}
              w={{ base: "0%", md: "100%" }}
              textAlign={"start"}
            >
              <Link to={val.link}>{val.name}</Link>
            </Button>
          </Flex>
        ))}
        <Spacer />
        <Flex
          align={"center"}
          justify={{ base: "center", md: "flex-start" }}
          _hover={{
            bg: { base: "none", md: "red.300" },
          }}
          borderRadius={"0.5rem"}
          mx={1}
        >
          <Button
            bg={"none"}
            _hover={{
              bg: { base: "red.300", md: "none" },
            }}
            my={2}
            fontSize={"1.4rem"}
          >
            <Link className="fa fa-home" onClick={handlesignout}></Link>
          </Button>
          <Button
            display={{ base: "none", md: "block" }}
            bg={"none"}
            _hover={{
              bg: "none",
            }}
          >
            <Link onClick={handlesignout}>Logout</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
