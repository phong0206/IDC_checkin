import {
  Button,
  Flex,
  Heading,
  Grid,
  GridItem,
  Center,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import * as yup from "yup";

import useToast from "components/Toast";
import BaseLayoutAdmin from "../../../Layout";
import StyledInputForm from "components/base/StyledInputForm";
import StyledSelectOne from "components/base/StyledSelectOne";
import { getClinics } from "api/modules/api-app/clinic";
import LoadingView from "components/base/Loading";

import { createUser } from "api/modules/api-app/user";
import yupValidate from "utilities/yupValidate";
import useAPI from "hooks/useApi";

//----------------------------------------------------------------

const AddDoctorClinic = () => {
  const { toastSuccess, toastError } = useToast();

  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [clinics, setClinics] = useState([]);

  const history = useHistory();

  const { loading, response, error, request } = useAPI(createUser);

  useEffect(() => {
    if (response) {
      history.goBack();
    }
  }, [response]);

  useEffect(() => {
    const getData = async () => {
      const res = await getClinics();
      if (res.data.status) {
        setClinics(
          res.data.data?.map((el: any) => {
            return {
              label: el?.name,
              value: el?._id,
            };
          })
        );
      } else {
        toastError(res.data.message);
      }
    };
    getData();
  }, []);

  const DEFAULT_FORM: any = {
    email: "",
    password: "",
  };

  const addUser = async (data: any) => {
    delete data.confirmPassword;
    await request(data);
  };

  const yupSchema = yup.object().shape({
    email: yupValidate.email(),
    password: yupValidate.password(),
    confirmPassword: yupValidate.password("password"),
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

  useEffect(() => {
    if (form.watch("role") === "ROLE_DOCTOR") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      form.setValue("clinic", undefined);
    }
  }, [form.watch("role")]);

  //----------------------------------------------------------------

  return (
    <BaseLayoutAdmin>
      <Container
        maxW={"90%"}
        p={6}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
      >
        <Heading as="h1" mb={"20px"}>
          <Flex flexDirection={"row"}>
            <Flex>Thêm tài khoản</Flex>
          </Flex>
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormProvider {...form}>
              <StyledInputForm
                label="Tên tài khoản"
                placeholder="Vui lòng nhập tên tài khoản"
                htmlFor="name"
                name="name"
                type="name"
              />
            </FormProvider>
          </GridItem>
          <GridItem>
            <FormProvider {...form}>
              <StyledInputForm
                label="Email"
                placeholder="Vui lòng nhập email"
                htmlFor="email"
                name="email"
                type="email"
              />
            </FormProvider>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormProvider {...form}>
              <StyledInputForm
                ref={passwordRef}
                label="Mật khẩu"
                placeholder="Vui lòng nhập mật khẩu"
                htmlFor="password"
                name="password"
                type="password"
              />
            </FormProvider>
          </GridItem>

          <GridItem>
            <FormProvider {...form}>
              <StyledInputForm
                ref={passwordConfirmRef}
                label="Xác nhận mật khẩu"
                placeholder="Vui lòng nhập mật khẩu xác nhận"
                htmlFor="password"
                name="confirmPassword"
                type="password"
              />
            </FormProvider>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormProvider {...form}>
              <StyledSelectOne
                label="Chức vụ"
                options={[
                  { label: "Admin", value: "ROLE_ADMIN" },
                  { label: "USER", value: "ROLE_DOCTOR" },
                ]}
                placeholder="Vui lòng chọn chức vụ"
                htmlFor="role"
                name="role"
              />
            </FormProvider>
          </GridItem>
          {isVisible && (
            <GridItem>
              <FormProvider {...form}>
                <StyledSelectOne
                  label="Cơ sở y tế"
                  options={clinics}
                  placeholder="Vui lòng chọn cơ sở y tế"
                  htmlFor="clinic"
                  name="clinic"
                />
              </FormProvider>
            </GridItem>
          )}
        </Grid>

        <Center margin={"20px"}>
          <Button
            size={"lg"}
            mt={4}
            colorScheme="teal"
            onClick={handleSubmit(addUser)}
          >
            Submit&nbsp;
          </Button>
        </Center>
      </Container>
    </BaseLayoutAdmin>
  );
};

export default AddDoctorClinic;
