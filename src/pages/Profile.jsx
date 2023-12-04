import React, { useEffect, useState } from "react";
import { auth, db, firestore } from "../../firebase/firebase";
import {
  CollectionReference,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { FormLabel, Input, Textarea } from "@chakra-ui/react";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const id = auth.currentUser;
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const [firstname, setfirstname] = useState("");
  const [Lastname, setLastName] = useState("");
  const [email, setemail] = useState("");

  const fetchdata = () => {
    console.log(id);

    if (!id) {
      return;
    }
    const query = ref(db, `users/${id.uid}`);
    onValue(query, (snapshot) => {
      const Data = snapshot.val();
      setdata(Data);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchdata();
    // setfirstname(data.firstname);
    // setLastName(data.Lastname);
    // setemail(data.email);
  }, []);

  return (
    <>
      <SimpleGrid columns={2} spacing={10} my={5} mx={3}>
        <Box h={"auto"} bg={"gray.300"} px={2} py={1} borderRadius={"0.5rem"}>
          <FormLabel>First Name</FormLabel>
          <Input value={firstname} bg={"white"} disabled />
        </Box>
        <Box h={"auto"} bg={"gray.300"} px={2} py={1} borderRadius={"0.5rem"}>
          <FormLabel>Last Name</FormLabel>
          <Input value={Lastname} bg={"white"} disabled />
        </Box>
        <Box h={"auto"} bg={"gray.300"} px={2} py={1} borderRadius={"0.5rem"}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} bg={"white"} disabled />
        </Box>
        <Box h={"auto"} bg={"gray.300"} px={2} py={1} borderRadius={"0.5rem"}>
          <FormLabel>Address</FormLabel>
          <Textarea bg={"white"} value={"123@domain city,"} disabled />
        </Box>
        <Box h={"auto"} bg={"gray.300"} px={2} py={1} borderRadius={"0.5rem"}>
          <FormLabel>Country</FormLabel>
          <Input value={"India"} bg={"white"} disabled />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Profile;
