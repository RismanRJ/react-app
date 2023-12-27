import { Box, Flex, HStack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import DataContext from "../context/DataContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { search, setSearch, handlesearch } = useContext(DataContext);

  return (
    <Flex
      zIndex={100}
      w={"100%"}
      bg={"black"}
      h={"50px"}
      justify={"space-around"}
      color={"white"}
      px={2}
      top={0}
      align={"center"}
      position={"sticky"}
    >
      <Link to={"/"}>
        <h5>Shopify</h5>
      </Link>

      <FormControl
        mx={2}
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <HStack>
          <Input
            px={2}
            type="search"
            role="searchbox"
            w={"100%"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Products...etc"
          />
          <Button
            type="button"
            role="button"
            onClick={() => {
              search
                ? navigate("/")
                : alert("Enter the product name correctly!");
            }}
          >
            <FaSearch />
          </Button>
        </HStack>
      </FormControl>

      <Tooltip
        label={"Cart"}
        hasArrow
        bg={"green.600"}
        display={{ base: "none", md: "block" }}
      >
        <IconButton
          borderRadius={"50%"}
          p={2}
          me={1}
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart fontSize={"2.1rem"} />
        </IconButton>
      </Tooltip>

      <Tooltip
        label={"My Account"}
        hasArrow
        me={2}
        bg={"green.600"}
        display={{ base: "none", md: "block" }}
      >
        <IconButton
          borderRadius={"50%"}
          onClick={() => navigate("/profile")}
          p={2}
        >
          <FaUser />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default Navbar;
