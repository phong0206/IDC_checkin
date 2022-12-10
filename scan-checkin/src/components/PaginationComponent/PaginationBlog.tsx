import React, { ReactNode } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

interface PaginationBlogProps {
  allData: any;
  name: string;
}

const PaginationBlog: React.FC<PaginationBlogProps> = ({
  allData,
  name,
  children,
}) => {
  const countPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    allData.slice(from, to);
  };
  return (
    <Box w={"100%"}>
      <Box
        w={"90%"}
        maxW="7xl"
        mx={"auto"}
        pt={5}
        px={{ base: 2, sm: 12, md: 17 }}
      >
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Danh sách bài viết
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
        ></SimpleGrid>
      </Box>
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

export default PaginationBlog;
