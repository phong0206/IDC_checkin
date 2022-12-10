import {
  Button,
  Flex,
  Stack,
  Heading,
  Spacer,
  Text,
  Container,
  useColorModeValue,
  Input,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import TableUserComponent from "./TableUserComponent";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseLayoutAdmin from "../../../Layout";
import StyledInputForm from "components/base/StyledInputForm";

import { getUsers } from "api/modules/api-app/user";
import usePaging from "hooks/usePaging";

//----------------------------------------------------------------

const UserAdmin: React.FC = () => {
  const history = useHistory();
  const bgContainer = useColorModeValue("white", "gray.700");
  const DEFAULT_FORM: any = {
    email: "",
  };

  const {
    data: list,
    loading,
    params,
    setParams,
  } = usePaging(getUsers, "list-users");

  const yupSchema = yup.object().shape({
    name: yup.string(),
  });

  const form = useForm({
    mode: "onChange", // validate form onChange
    defaultValues: DEFAULT_FORM,
    resolver: yupResolver(yupSchema),
    reValidateMode: "onChange",
    criteriaMode: "firstError", // first error from each field will be gathered.
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = form;

  const handleAdd = () => {
    history.push(`/add-user`);
  };

  const handleSearch = async (data: any) => {
    const { email } = data;
    setParams({ ...params[0].params, email });
  };

  const tableColume = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức danh",
      dataIndex: "role",
      key: "role",
      render: (text: any) => (text === "ROLE_ADMIN" ? "Admin" : "User"),
    },
  ];

  return (
    <BaseLayoutAdmin>
      <Container
        maxW={"90%"}
        p={6}
        bg={bgContainer}
        rounded={"xl"}
        boxShadow={"lg"}
      >
        <Heading as="h1" mb={"20px"}>
          <Flex flexDirection={"row"}>
            <Flex>
              <Text>Quản lý tài khoản</Text>
            </Flex>
            <Spacer />
            <Flex>
              <Button colorScheme="teal" variant="solid" onClick={handleAdd}>
                Thêm tài khoản
              </Button>
            </Flex>
          </Flex>
        </Heading>

        <section>
          <Stack>
            <HStack spacing="20">
              <FormProvider {...form}>
                <StyledInputForm
                  label="Email"
                  placeholder="Tìm kiếm theo email"
                  name="email"
                  type="email"
                />
                <StyledInputForm
                  label="Tên tài khoản"
                  placeholder="Tìm kiếm theo tên tài khoản"
                  name="name"
                />
              </FormProvider>
            </HStack>
            <Stack align={"center"}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit(handleSearch)}
              >
                Tìm kiếm&nbsp;
              </Button>
            </Stack>
          </Stack>
        </section>

        <TableUserComponent
          loading={loading}
          name={"user"}
          tableHead={tableColume}
          countPerPage={10}
          allData={list || []}
        />
      </Container>
    </BaseLayoutAdmin>
  );
};

export default UserAdmin;
