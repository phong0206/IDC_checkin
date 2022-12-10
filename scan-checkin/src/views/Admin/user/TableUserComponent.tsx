import React, { useCallback, useEffect, useMemo, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import "rc-pagination/assets/index.css";
import parseHTML from "html-react-parser";
// import { allData } from "./data";
import {
  Flex,
  Input,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import Pagination from "rc-pagination";
import ServerSecondaryOptions from "../../../components/TableComponent/ServerSecondaryOptions";
import LoadingView from "components/base/Loading";

interface TableUserComponentProps {
  loading: boolean;
  name: string;
  countPerPage: number;
  tableHead: Array<any>;
  allData: any;
}
const TableUserComponent: React.FC<TableUserComponentProps> = ({
  loading,
  name,
  countPerPage,
  tableHead,
  allData,
}) => {
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
  };
  const tableRows = (rowData: any) => {
    const { key, index } = rowData;
    const columnData = tableHead.map((el, i) => {
      return (
        <Td
          key={i}
          maxH={"50px"}
          cursor={el.dataIndex === "action" ? "pointer" : ""}
        >
          {el.render ? el.render(key[el.dataIndex]) : key[el.dataIndex]}
        </Td>
      );
    });
    return <tr key={index}>{columnData}</tr>;
  };
  const tableData = () => {
    return allData.map((key: any, index: any) => tableRows({ key, index }));
  };
  const headRow = () => {
    return tableHead.map((el, index) => (
      <Td key={el.key} textAlign={el.title === "Actions" ? "center" : "start"}>
        {el.title}
      </Td>
    ));
  };
  return (
    <Flex flexDirection="column" w={"100%"}>
      <TableContainer w={"100%"} my={"20px"}>
        {loading ? (
          <LoadingView />
        ) : (
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>{headRow()}</Tr>
            </Thead>
            <Tbody className="trhover" justifyContent={"center"}>
              {tableData()}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      <Flex justifyContent={"center"}>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={allData.length}
        />
      </Flex>
    </Flex>
  );
};
export default TableUserComponent;
