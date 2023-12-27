import { Box, Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Image, Input } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";

import { onValue, ref } from "firebase/database";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [isLoading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [loginstatus, setloginStatus] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const loginuser = useAuthStore((state) => state.login);

  const handlesignin = async (e) => {
    e.preventDefault();

    setloading(true);
    if (!email || !password) {
      setTimeout(() => {
        setloading(false);
      }, 1200);
      setshow(true);

      return;
    }
    try {
      setshow(false);
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user.user.uid) {
        setloginStatus(true);

        localStorage.setItem("user", JSON.stringify({ uid: user.user.uid }));

        const query = ref(db, `users/${user.user.uid}`);
        onValue(query, (snapshot) => {
          const data = snapshot.val();
          localStorage.setItem(
            "Data",
            JSON.stringify({ ...data, id: user.user.uid })
          );

          localStorage.getItem("Data") ? loginuser(user.user.uid) : null;

          setloading(false);
        });

        console.log("sign in successfully");
      }
    } catch (e) {
      setloading(false);
      seterror(e.message.toString());
      console.log(e.message, error.toString());
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
                required
                onChange={(e) => setemail(e.target.value)}
              />
              <Alert status="error" display={show ? "block" : "none"}>
                <Flex>
                  <AlertIcon />
                  Please fill the Email field
                </Flex>
              </Alert>
              <Input
                type="password"
                placeholder="Enter your Password"
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
              />
              <Alert status="error" display={show ? "block" : "none"}>
                <Flex>
                  <AlertIcon />
                  Please fill the Password field
                </Flex>
              </Alert>
              <Flex
                justify={"space-between"}
                direction={{ base: "column", md: "row" }}
              >
                <Link to={"/signup"}>Don't have an Account?</Link>
                <Link
                  style={{
                    alignSelf: "flex-end",
                  }}
                  to={"/forgotscreen"}
                  onClick={() => Navigate("/forgotpassword")}
                >
                  Forgot Password?
                </Link>
              </Flex>
              <Button
                display={"block"}
                w={"100%"}
                bg={"lightgreen"}
                _hover={{
                  bg: "green.400",
                }}
                isLoading={isLoading}
                onClick={handlesignin}
              >
                Submit
              </Button>
            </Flex>
            <Alert
              status="success"
              my={5}
              display={loginstatus ? "block" : "none"}
            >
              <Flex>
                <AlertIcon />
                Login Successfully
              </Flex>
            </Alert>
            <Alert status="error" my={5} display={error ? "block" : "none"}>
              <Flex>
                <AlertIcon />
                {error}
              </Flex>
            </Alert>
          </form>
        </Flex>
      </Box>
      <Box h={"100vh"} w={{ base: "0%", md: "50%" }} bg={"yellow"}>
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

export default Login;
