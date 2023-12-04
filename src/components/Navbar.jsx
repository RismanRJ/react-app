import { Box, Flex } from "@chakra-ui/layout";
import { IconButton, Input, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        w={"100%"}
        bg={"black"}
        h={"50px"}
        py={"0.5rem"}
        justify={"space-around"}
        color={"white"}
        px={2}
        align={"center"}
        top={0}
        position={"sticky"}
      >
        <Link to={"/"}>
          <h5>Shopify</h5>
        </Link>
        <Input type="search" w={"100%"} mx={3} placeholder="Products...etc" />
        <IconButton
          className="fa fa-home ms-auto"
          h={"100%"}
          onClick={() => navigate("/cart")}
        />
        <IconButton
          className="fa fa-user"
          ms={1}
          borderRadius={"50%"}
          onClick={() => navigate("/profile")}
        />
      </Flex>
    </>
  );
};

export default Navbar;
