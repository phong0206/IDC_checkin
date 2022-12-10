import React, { ReactNode } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

interface PaginationSpecialtyProps {
  allData: any;
}

const PaginationSpecialty: React.FC<PaginationSpecialtyProps> = ({
  allData,
}) => {
  const countPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const bg = useColorModeValue("gray.100", "gray.700");
  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    allData.slice(from, to);
  };
  return (
    <Box w={"100%"} bg={bg} pb={"50px"}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Chuyên khoa phổ biến</Heading>
        </Stack>

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

export default PaginationSpecialty;
