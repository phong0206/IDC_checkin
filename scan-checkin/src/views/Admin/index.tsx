import {
  Flex,
  Text,
  Container,
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  Center,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

import LayoutAdmin from "../../Layout";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const AdminDashboard: React.FC = () => {
  const bgCard = useColorModeValue("white", "gray.900");

  const [totalMonth, setTotalMonth] = useState(0);
  const [totalClinic, setTotalClinic] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);

  const [serviceName, setServiceName] = useState([]);
  const [serviceCount, setServiceCount] = useState([]);

  const dataPie = {
    labels: serviceName,
    datasets: [
      {
        label: "# of Votes",
        data: serviceCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <LayoutAdmin>
      <Container maxW={"90%"} p={6}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%">
            <Center py={6}>
              <Box
                maxW={"320px"}
                w={"full"}
                bg={bgCard}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                <Heading
                  fontSize={"xl"}
                  color={"#3F51B5"}
                  fontFamily={"body"}
                  mb={4}
                >
                  Doanh thu tháng
                </Heading>

                <Text fontSize={24} fontWeight={600} color={"red.500"} mb={4}>
                  {totalMonth.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  }) || ""}
                </Text>
              </Box>
            </Center>
          </GridItem>

          <GridItem w="100%">
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
                <Heading
                  fontSize={"xl"}
                  color={"#3F51B5"}
                  fontFamily={"body"}
                  mb={4}
                >
                  Cơ sở hoạt động
                </Heading>

                <Text fontSize={24} fontWeight={600} color={"green.500"} mb={4}>
                  {totalClinic}
                </Text>
              </Box>
            </Center>
          </GridItem>

          <GridItem w="100%">
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
                <Heading
                  fontSize={"xl"}
                  color={"#3F51B5"}
                  fontFamily={"body"}
                  mb={4}
                >
                  Số khách hàng
                </Heading>

                <Text fontSize={24} fontWeight={600} color={"blue.500"} mb={4}>
                  {totalUser}
                </Text>
              </Box>
            </Center>
          </GridItem>
        </Grid>

        <Box
          w={"full"}
          bg={bgCard}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            <GridItem w="100%">
              <Box>
                <Heading
                  fontSize={"xl"}
                  color={"#3F51B5"}
                  fontFamily={"body"}
                  mb={4}
                >
                  Thống kê các gói đã đăng ký
                </Heading>
                <Pie data={dataPie} />
              </Box>
            </GridItem>

            <GridItem w="100%">
              <Box>
                <Heading
                  fontSize={"xl"}
                  color={"#3F51B5"}
                  fontFamily={"body"}
                  mb={4}
                >
                  Thống kê doanh thu theo tháng
                </Heading>
                <Line options={options} data={dataBar} />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
