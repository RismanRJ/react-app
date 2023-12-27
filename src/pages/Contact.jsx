import {
  Box,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import emailjs from "emailjs-com";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";

const Contact = () => {
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const social_icons = [
    {
      icon: <FaFacebook />,
      link: "https://www.facebook.com/rismanRJ21/",
    },
    {
      icon: <FaInstagramSquare />,
      link: "https://www.instagram.com/?hl=en",
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/risman21/",
    },
    {
      icon: <BsTwitterX />,
      link: "https://twitter.com/home",
    },
  ];
  const sendemail = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await emailjs.sendForm(
        "service_7pl2e4k",
        "template_rvzsvml",
        e.target,
        "6-PcSsCQQhmY6nYJh"
      );
      console.log(res);
      toast({
        title: "Feedback form submitted",
        description: "Thanks for your feedback",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        setloading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Feedback form not submitted",
        description: "An error occured on your feedback form",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        setloading(false);
      }, 2000);
      console.log(error);
    }
  };

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        h={{ base: "auto", md: "100vh" }}
        w={"100%"}
        placeItems={"center"}
        bgImg={
          "https://th.bing.com/th/id/OIP.Ke8oWdHNArW8iZm-8hegiwHaE8?rs=1&pid=ImgDetMain"
        }
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        bgSize={"cover"}
      >
        <VStack
          h={"100%"}
          align={"flex-start"}
          justify={"center"}
          px={5}
          mx={"auto"}
          my={5}
        >
          <Heading>Contact us</Heading>
          <Text>
            Need to get in touch with us? Either fill out the form with your
            inquiry or find the Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptas, qui vitae molestiae incidunt minima enim
            totam laudantium quae, possimus, iusto molestias suscipit sapiente.
            Cum facilis rerum quis, dignissimos deserunt autem?
          </Text>
          <Heading fontSize={"1.8rem"}>Social</Heading>
          <HStack fontSize={"1.5rem"} color={"darkblue"}>
            {social_icons.map((val, index) => (
              <Link
                target="blank"
                href={val.link}
                px={2}
                _hover={{
                  transition: "all 0.2s linear",
                  transform: "scale(1.5)",
                }}
                key={index}
              >
                {val.icon}
              </Link>
            ))}
          </HStack>
        </VStack>

        <Box
          borderRadius={"1rem"}
          h={"fit-content"}
          w={"fit-content"}
          mx={"auto"}
          boxShadow={"2px 2px 35px gray"}
          mb={5}
          bg={"white"}
        >
          <form onSubmit={sendemail}>
            <FormControl px={5} isRequired>
              <Heading mx={"auto"}>Feedback Form</Heading>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                border={"solid"}
                borderColor={"gray.400"}
                name="fname"
              />

              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="xyz@gmail.com"
                mb={5}
                border={"solid"}
                borderColor={"gray.400"}
                name="user_email"
              />
              <FormLabel>What can we help you with?*</FormLabel>
              <Textarea
                border={"solid"}
                borderColor={"gray.400"}
                name="message"
              />

              <Button
                type="submit"
                display={"block"}
                my={5}
                bg={"darkblue"}
                color={"white"}
                isLoading={loading}
                mx={"auto"}
                _hover={{
                  bg: "darkblue",
                  boxShadow: "2px 2px 20px  2px darkblue",
                }}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems={"center"}
        w={"100%"}
        bg={"blue.900"}
        color={"white"}
      >
        <Box textAlign={"center"}>
          <Image srcSet="https://www.privy.com/hubfs/Privy.png" />
          <Heading m={0}>Our office is located at:</Heading>
          <Text m={0} mb={5}>
            201 South St, 2nd Floor Boston, MA 02111
          </Text>
        </Box>

        <VStack
          h={{ base: "450px", md: "500px" }}
          w={{ base: "full", md: "400px" }}
          align={"flex-start"}
          justify={"center"}
          boxShadow={"2px 2px 15px gray"}
          spacing={8}
          px={3}
          my={5}
          borderRadius={"1rem"}
        >
          <Heading
            fontWeight={"900"}
            mx={"auto"}
            textShadow={"1px 1px 30px white"}
          >
            Shopify
          </Heading>
          <Heading fontSize={"1.2rem"}>Sign up for our newsletter</Heading>
          <Text color={"gray.300"} fontWeight={"600"} m={0}>
            Our bi-weekly newsletter full of inspiration, podcasts, trends and
            news
          </Text>
          <Input type="email" placeholder="Email Address*" />
          <Checkbox fontWeight={600}>
            I agree to allow Privy to store and process my personal data in
            order to contact me
          </Checkbox>
          <Button
            bg={"darkblue"}
            color={"white"}
            w={"full"}
            mb={5}
            _hover={{
              bg: "darkblue",
              boxShadow: "2px 2px 15px whitesmoke",
            }}
          >
            Sign up
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Contact;
