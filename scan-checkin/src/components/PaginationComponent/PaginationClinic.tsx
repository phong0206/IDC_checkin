import React, { ReactNode, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
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

import { baseUrl } from "../../configs/constants/admin/url";
import { useHistory } from "react-router-dom";

interface PaginationClinicProps {
  allData: any;
}

const PaginationClinic: React.FC<PaginationClinicProps> = ({ allData }) => {
  const history = useHistory();
  const countPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
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

  const handleDetailClinic = (id: any) => (e: any) => {
    history.push(`/clinic/detail-clinic/${id}`);
  };
  return (
    <Box w={"100%"} pb={"50px"}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Cơ sở y tế nổi bật</Heading>
        </Stack>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
        ></SimpleGrid>
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

export default PaginationClinic;
