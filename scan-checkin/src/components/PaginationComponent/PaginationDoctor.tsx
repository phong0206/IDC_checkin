import React, { ReactNode, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { setDefaultLocale } from "react-datepicker";
import StatsCard from "../StatsCard/StatsCard";
import { BsPerson } from "react-icons/bs";
import { baseUrl } from "../../configs/constants/admin/url";
import { useHistory } from "react-router-dom";

interface PaginationDoctorProps {
  allData: any;
}

const PaginationDoctor: React.FC<PaginationDoctorProps> = ({ allData }) => {
  const countPerPage = 3;
  const history = useHistory();
  const [currentPage, setCurrentPage] = React.useState(1);
  const bg = useColorModeValue("gray.100", "gray.700");
  const bgCard = useColorModeValue("white", "gray.900");
  const colorCard = useColorModeValue("gray.700", "gray.400");

  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    setCollection(cloneDeep(allData.slice(0, countPerPage)));
  }, [allData]);

  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const handleDetail = (id: string) => (e: any) => {
    history.push(`/doctor/detail-doctor/${id}`);
  };
  return (
    <Box w={"100%"} bg={bg} pb={"50px"}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Danh sách bác sĩ</Heading>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {collection.map((e: any) => (
            <>
              {e?.status === "isActive" ? (
                <Center py={6} cursor={"pointer"}>
                  <Box
                    maxW={"320px"}
                    w={"full"}
                    bg={bgCard}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                  >
                    <Avatar
                      size={"xl"}
                      src={`${baseUrl}/${e?.image}`}
                      mb={4}
                      pos={"relative"}
                      _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: "green.300",
                        border: "2px solid white",
                        rounded: "full",
                        pos: "absolute",
                        bottom: 0,
                        right: 3,
                      }}
                    />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                      {e?.name || ""}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                      {e?.title || ""}
                    </Text>
                    <Text textAlign={"center"} color={colorCard} px={3}>
                      {e?.clinic?.name || ""}
                    </Text>

                    <Stack mt={8} direction={"row"} spacing={4}>
                      {/* <Button
                       flex={1}
                       fontSize={"sm"}
                       rounded={"full"}
                       _focus={{
                         bg: "gray.200",
                       }}
                     >
                       Message
                     </Button> */}
                      <Button
                        flex={1}
                        fontSize={"sm"}
                        rounded={"full"}
                        bg={"blue.400"}
                        color={"white"}
                        boxShadow={
                          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                          bg: "blue.500",
                        }}
                        _focus={{
                          bg: "blue.500",
                        }}
                        onClick={handleDetail(e?._id)}
                      >
                        Xem chi tiết
                      </Button>
                    </Stack>
                  </Box>
                </Center>
              ) : (
                ""
              )}
            </>
          ))}
        </SimpleGrid>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        ></Stack>
      </Container>

      <Flex justifyContent={"center"}>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={allData.length}
        />
      </Flex>
    </Box>
  );
};

export default PaginationDoctor;
