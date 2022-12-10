import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";

import StyledInputForm from "components/base/StyledInputForm";
import LoadingView from "components/base/Loading";

import yupValidate from "utilities/yupValidate";
import { useLogin } from "utilities/authenticate/AuthenticateService";
import { useAppSelector } from "redux/hooks";

//----------------------------------------------------------------

const DEFAULT_FORM: any = {
  username: "admin",
  password: "123456ab",
};

const Login: React.FC = () => {
  const bgContainer = useColorModeValue("gray.50", "gray.800");
  const bgBox = useColorModeValue("white", "gray.700");
  const history = useHistory();

  const { status } = useAppSelector((state) => state.userInfo);

  const { requestLogin, loading } = useLogin();

  useEffect(() => {
    if (status === 2) {
      history.push("/");
    }
  }, [status]);

  const yupSchema = yup.object().shape({});

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

  //----------------------------------------------------------------

  return loading ? (
    <LoadingView />
  ) : (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgContainer}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Đăng nhập với tài khoản của bạn
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={bgBox} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormProvider {...form}>
              <StyledInputForm
                label="Username"
                placeholder="Vui lòng nhập username"
                htmlFor="username"
                name="username"
                type="username"
              />
              <StyledInputForm
                label="Mật khẩu"
                placeholder="Vui lòng nhập mật khẩu"
                htmlFor="password"
                name="password"
                type="password"
              />
            </FormProvider>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>Quên mật khẩu?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={!isValid}
                onClick={handleSubmit(requestLogin)}
              >
                Đăng nhập&nbsp;
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
