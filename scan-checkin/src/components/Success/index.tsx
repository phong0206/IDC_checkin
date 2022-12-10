import { Box, Heading, Text, useQuery } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

const Success: React.FC = () => {
  const location = useLocation();
  return (
    <Box textAlign="center" py={10} px={6} h={"400px"} m={"auto"}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {/* {title} */} Thành công
      </Heading>
      {/* <Text color={"gray.500"}>{description}</Text> */}
    </Box>
  );
};

export default Success;
