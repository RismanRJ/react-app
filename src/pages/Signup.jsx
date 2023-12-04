import { Box, Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Image, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const Signup = () => {
  const [isLoading, setloading] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [Lastname, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [loginstatus, setloginStatus] = useState(false);
  const handlecreateUser = async () => {
    setloading(true);
    if (!email || !password || !firstname || !Lastname) {
      setTimeout(() => {
        setloading(false);
      }, 1200);
      setshow(true);

      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (user.user.uid) {
        set(ref(db, `users/${user.user.uid}`), {
          firstname: firstname,
          Lastname: Lastname,
          email: email,
        });
        setloading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log("New account created  successfully");
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
          <h3>Hello Sir!!</h3>
          <form>
            <Flex direction="column" gap={5}>
              <Flex gap={2}>
                <Input
                  type="text"
                  placeholder="Firstname"
                  required
                  value={firstname}
                  onChange={(e) => {
                    setfirstname(e.target.value);
                  }}
                />

                <Input
                  type="text"
                  placeholder="Lastname"
                  required
                  value={Lastname}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Flex>
              <Flex gap={2}>
                <Alert status="error" display={show ? "block" : "none"}>
                  <Flex>
                    <AlertIcon />
                    Please fill the Firstname field
                  </Flex>
                </Alert>
                <Alert status="error" display={show ? "block" : "none"}>
                  <Flex>
                    <AlertIcon />
                    Please fill the Lastname field
                  </Flex>
                </Alert>
              </Flex>
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
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
                required
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <Alert status="error" display={show ? "block" : "none"}>
                <Flex>
                  <AlertIcon />
                  Please fill the password field
                </Flex>
              </Alert>

              <Link className="ms-auto" to={"/auth"}>
                Already Have an Account?
              </Link>
              <Button
                display={"block"}
                w={"100%"}
                bg={"lightgreen"}
                _hover={{
                  bg: "green.400",
                }}
                isLoading={isLoading}
                onClick={handlecreateUser}
              >
                Submit
              </Button>
            </Flex>
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

export default Signup;
