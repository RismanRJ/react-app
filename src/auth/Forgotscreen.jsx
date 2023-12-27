import { Box, Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Image, Input } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Forgotscreen = () => {
  const [email, setEmail] = useState("");
  const [show, setshow] = useState(false);
  const [isLoading, setloading] = useState(false);
  const [loginstatus, setloginStatus] = useState(false);

  const handlereset = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!email) {
      setTimeout(() => {
        setloading(false);
      }, 1000);
      setshow(true);
      return;
    }
    try {
      setshow(false);
      await sendPasswordResetEmail(auth, email);
      setloading(false);
      setloginStatus(true);
      setTimeout(() => {
        setloginStatus(false);
      }, 2000);
    } catch (e) {
      alert(e);
      setloading(false);
    }
  };
  return (
    <Flex>
      <Box h={"100vh"} w={{ base: "100%", md: "50%" }} bg={"white"}>
        <Flex
          direction={"column"}
          px={10}
          gap={5}
          py={5}
          h={"100vh"}
          justify={"center"}
        >
          <Flex align={"baseline"}>
            <div className="fa fa-home" style={{ fontSize: "2rem" }}></div>
            <p style={{ fontSize: "1.3rem" }}>Shopify</p>
          </Flex>
          <h3>Welcome Back!!</h3>
          <form>
            <Flex direction="column" gap={5}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Alert status="error" display={show ? "block" : "none"}>
                <Flex>
                  <AlertIcon />
                  Please fill the Email field
                </Flex>
              </Alert>

              <Button
                display={"block"}
                w={"100%"}
                bg={"lightgreen"}
                _hover={{
                  bg: "green.400",
                }}
                isLoading={isLoading}
                onClick={handlereset}
              >
                Reset Password
              </Button>
              <Link to={"/auth"}>
                <Button
                  display={"block"}
                  w={"100%"}
                  bg={"blue.300"}
                  _hover={{
                    bg: "blue.400",
                  }}
                >
                  Go back
                </Button>
              </Link>
            </Flex>
          </form>
          <Alert
            status="success"
            my={5}
            display={loginstatus ? "block" : "none"}
          >
            <Flex>
              <AlertIcon />
              Reset Link sent Successfully
            </Flex>
          </Alert>
        </Flex>
      </Box>
      <Box h={"100vh"} w={{ base: "0%", md: "50%" }} bg={"white"}>
        <Image
          src="https://images.pexels.com/photos/2831794/pexels-photo-2831794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="school_png"
          objectFit={"cover"}
          boxSize={"100vh"}
        />
      </Box>
    </Flex>
  );
};

export default Forgotscreen;
