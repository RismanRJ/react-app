import React, { useEffect, useState } from "react";
import { db, firestore, storage } from "../../firebase/firebase";

import { Box, Flex, SimpleGrid, Stack, VStack } from "@chakra-ui/layout";
import {
  Button,
  FormLabel,
  Image,
  Input,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";

import { onValue, update, ref } from "firebase/database";
import { FaUserEdit } from "react-icons/fa";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as ref_storage } from "firebase/storage";
import { doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const [loading, setloading] = useState(true);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [mobileno, setmobileno] = useState(0);
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [id, setid] = useState("");
  const [udata, setData] = useState("");

  const [image, Setimage] = useState(null);
  const imageurl =
    "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?rs=1&pid=ImgDetMain";

  const [isdisabled, setdisabled] = useState(true);
  const [imageloading, setimageloading] = useState(false);
  const [profiledisabled, setprofiledisabled] = useState(true);
  const Data = JSON.parse(localStorage.getItem("Data"));
  const uuid = JSON.parse(localStorage.getItem("user"));
  const data = ref(db, `users/${uuid.uid}`);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchdata = async () => {
      setid(uuid.uid);

      setfname(Data.firstname);
      setlname(Data.Lastname);
      setemail(Data.email);
      setaddress(Data.address);
      setmobileno(Data.mobileno);
      setcountry(Data.country);
      onValue(data, async (snapshot) => {
        const users_data = snapshot.val();
        setData(users_data);
      });
      setTimeout(() => {
        setloading(false);
      }, 1500);
    };

    fetchdata();
  }, []);

  const handlechange = async (e) => {
    if (e.target.files[0]) {
      Setimage(e.target.files[0]);
    } else {
      setprofiledisabled(true);
    }
  };

  const handleupload = async () => {
    setimageloading(true);
    try {
      const storage_ref = ref_storage(storage, `${id}/${image.name}`);
      await uploadBytes(storage_ref, image);
      const downloadURL = await getDownloadURL(
        ref_storage(storage, `${id}/${image.name}`)
      );

      await update(data, {
        photoURL: downloadURL,
      });
      await onValue(data, async (snapshot) => {
        const users_data = snapshot.val();
        setData(users_data);
        localStorage.setItem("Data", JSON.stringify(users_data));
        // console.log(data);
      });

      console.log("uploaded");
      setprofiledisabled(true);
      setimageloading(false);
      // location.reload();
    } catch (error) {
      setimageloading(false);
      console.log(error);
    }
  };

  const handleupdate = async () => {
    setloading(true);
    const data = ref(db, `users/${id}`);

    try {
      console.log(image);

      update(data, {
        firstname: fname,
        Lastname: lname,
        email: email,
        address: address,
        country: country,
        mobileno: mobileno,
      });
      const query = ref(db, `users/${id}`);
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        localStorage.setItem("Data", JSON.stringify({ ...data, id: id }));
        console.log(data);
      });
    } catch (e) {
      console.log(e);
      setloading(false);
    }
    setTimeout(() => {
      setloading(false);
    }, 1500);
    console.log("updated");
  };

  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton h={50} mx={2}></Skeleton>
          <Skeleton h={50} mx={2}></Skeleton>
          <Skeleton h={50} mx={2}></Skeleton>
          <Skeleton h={50} mx={2}></Skeleton>
        </Stack>
      ) : (
        <Box h={{ base: "auto", md: "100vh" }}>
          <VStack align={"center"} my={2}>
            <Box
              h={"150px"}
              w={"150px"}
              borderRadius={"50%"}
              border={"solid"}
              borderColor={"black"}
              position={"relative"}
            >
              <Image
                alt="avatar"
                src={udata.photoURL ? udata.photoURL : imageurl}
                bg={"white"}
                p={1}
                h={"100%"}
                w={"100%"}
                objectFit={"cover"}
                borderRadius={"50%"}
              />
              <label htmlFor="profile_img">
                <FaUserEdit
                  onClick={() => setprofiledisabled(!profiledisabled)}
                  style={{
                    fontSize: "1.8rem",
                    position: "absolute",
                    color: "white",
                    margin: "auto",
                    right: 0,
                    left: 10,
                    padding: "7px",
                    background: "black",
                    borderRadius: "50%",
                    top: "140",
                    bottom: "-5",
                  }}
                />
              </label>

              <Input
                type="file"
                onChange={handlechange}
                display={"none"}
                id="profile_img"
              />
            </Box>
            <Button
              isDisabled={profiledisabled}
              onClick={handleupload}
              isLoading={imageloading}
              my={2}
              bg={"black"}
              color={"white"}
              _hover={{
                bg: "black",
                boxShadow: "2px 2px 15px black",
              }}
            >
              Save
            </Button>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} my={5} mx={5}>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                value={fname}
                bg={"white"}
                disabled={isdisabled}
                onChange={(e) => setfname(e.target.value)}
              />
            </Box>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lname}
                bg={"white"}
                disabled={isdisabled}
                onChange={(e) => setlname(e.target.value)}
              />
            </Box>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                bg={"white"}
                disabled={isdisabled}
                onChange={(e) => setemail(e.target.value)}
              />
            </Box>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>Address</FormLabel>
              <Textarea
                bg={"white"}
                value={address}
                disabled={isdisabled}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Box>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>Mobile no</FormLabel>
              <Input
                bg={"white"}
                type="number"
                value={mobileno}
                onChange={(e) => setmobileno(e.target.value)}
                disabled={isdisabled}
                maxLength={10}
                minLength={10}
              />
            </Box>
            <Box
              h={"auto"}
              bg={"gray.300"}
              px={2}
              py={1}
              borderRadius={"0.5rem"}
            >
              <FormLabel>Country</FormLabel>
              <Input
                value={country}
                bg={"white"}
                disabled={isdisabled}
                onChange={(e) => setcountry(e.target.value)}
              />
            </Box>
          </SimpleGrid>
          <Flex justify={"center"} gap={3} my={5}>
            <Button
              bg={"green.300"}
              _hover={{
                bg: "green.500",
              }}
              onClick={() => {
                setdisabled(!isdisabled);

                !isdisabled ? handleupdate() : null;
              }}
              isLoading={loading}
            >
              {isdisabled ? "Edit Account" : "Update Account"}
            </Button>
          </Flex>

          {/* {JSON.stringify(id)} */}
        </Box>
      )}
    </>
  );
};

export default Profile;
