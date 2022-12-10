import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <Flex
      position={"absolute"}
      zIndex={"6000"}
      opacity={"1"}
      transition={"ease .1s"}
      w={"100%"}
      h={"100vh"}
      bg={"black"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Image
          transition={"ease .1s"}
          src={"https://media.giphy.com/media/kELXPGMOmmCLxhMr6R/giphy.gif"}
          alt={"loading"}
          justifyContent={"center"}
        />
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"40px"} color={"white"} fontFamily={"Bangers"}>
            Loading
          </Text>
          <Flex mt={"8px"} ml={"8px"}>
            <Flex className="spinner1" />
            <Flex className="spinner2" mx={"8px"} />
            <Flex className="spinner3" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoadingPage;
