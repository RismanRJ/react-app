import { Box, Flex } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Image,
  Input,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, firestore } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref } from "firebase/database";

const Login = () => {
  const [isLoading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [loginstatus, setloginStatus] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setUset] = useState();
  const navigate = useNavigate();

  const id = auth.currentUser;
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/auth");
      }
    });
  }, [id]);

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
        setloading(false);

        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log("sign in successfully");
      }
    } catch (e) {
      setloading(false);
      console.log(e);
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
            <p style={{ fontSize: "1.3rem" }}>Docore</p>
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
              <Flex justify={"space-between"}>
                <Link to={"/signup"}>Don't have an Account?</Link>
                <Link to={"/forgotpassword"}>Forgot Password?</Link>
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
