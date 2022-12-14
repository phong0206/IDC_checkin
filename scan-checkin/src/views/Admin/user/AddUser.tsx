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
            <Flex>Th??m t??i kho???n</Flex>
          </Flex>
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormProvider {...form}>
              <StyledInputForm
                label="T??n t??i kho???n"
                placeholder="Vui l??ng nh???p t??n t??i kho???n"
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
                placeholder="Vui l??ng nh???p email"
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
                label="M???t kh???u"
                placeholder="Vui l??ng nh???p m???t kh???u"
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
                label="X??c nh???n m???t kh???u"
                placeholder="Vui l??ng nh???p m???t kh???u x??c nh???n"
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
                label="Ch???c v???"
                options={[
                  { label: "Admin", value: "ROLE_ADMIN" },
                  { label: "USER", value: "ROLE_DOCTOR" },
                ]}
                placeholder="Vui l??ng ch???n ch???c v???"
                htmlFor="role"
                name="role"
              />
            </FormProvider>
          </GridItem>
          {isVisible && (
            <GridItem>
              <FormProvider {...form}>
                <StyledSelectOne
                  label="C?? s??? y t???"
                  options={clinics}
                  placeholder="Vui l??ng ch???n c?? s??? y t???"
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
