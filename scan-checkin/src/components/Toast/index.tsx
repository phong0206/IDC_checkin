import { useMemo } from "react";
import {
  Box,
  Flex,
  Image,
  useToast as useToastUI,
  Text,
} from "@chakra-ui/react";

// Toasts
const useToast = () => {
  const toast: any = useToastUI();
  const helpers = useMemo(() => {
    return {
      toastError: (title: any, description?: any) => {
        return toast({
          status: "error",
          duration: 2500,
          render: () => (
            <Flex
              borderRadius={"20px"}
              px={"20px"}
              py={"15px"}
              bg="gray.800"
              w={["350px", "400px"]}
              alignItems={"center"}
              justifyContent={"space-between"}
              border="1px"
              borderColor="red.500"
            >
              <Image src={"/img/error-icon.svg"} w={"32px"} h={"32px"} />
              <Flex
                width={"100%"}
                pl="8px"
                color={"white"}
                textAlign="left"
                flexDirection={"column"}
                justify="flex-start"
              >
                <Text
                  width={"100%"}
                  fontWeight="600"
                  fontSize="16px"
                  textAlign="left"
                  color="red.500"
                >
                  {title || ""}
                </Text>
                <Text
                  justifyContent="flex-start"
                  fontSize={"13px"}
                  textAlign="left"
                  color={"red.400"}
                >
                  {description || ""}
                </Text>
              </Flex>
            </Flex>
          ),
        });
      },
      toastSuccess: (title: string, description?: any) => {
        return toast({
          status: "success",
          duration: 2500,
          render: () => (
            <Flex
              borderRadius={"20px"}
              px={"20px"}
              py={"15px"}
              bg="gray.800"
              w={["350px", "400px"]}
              alignItems={"center"}
              justifyContent={"space-between"}
              border="1px"
              borderColor="teal.150"
            >
              <Image src={"/img/checked.svg"} w={"32px"} h={"32px"} />
              <Flex
                width={"100%"}
                pl="8px"
                color={"white"}
                textAlign="left"
                flexDirection={"column"}
                justify="flex-start"
              >
                <Text
                  width={"100%"}
                  fontWeight="600"
                  fontSize="16px"
                  textAlign="left"
                  color="teal.150"
                >
                  {title || ""}
                </Text>
                <Text
                  justifyContent="flex-start"
                  fontSize={"13px"}
                  textAlign="left"
                  color={"gray.500"}
                >
                  {description || ""}
                </Text>
              </Flex>
            </Flex>
          ),
        });
      },
    };
  }, [toast]);

  return helpers;
};

export default useToast;
