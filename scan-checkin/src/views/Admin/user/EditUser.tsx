import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Grid,
  GridItem,
  Center,
  Container,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/index";
import useToast from "../../../components/Toast";
import ButtonBackHome from "../../../components/ButtonBackHome";
import BaseLayoutAdmin from "../../../Layout";
import { useSelectorUser } from "../../../redux/hooks";
import {
  updateUserForAdmin,
  getUserByIdForAdmin,
} from "../../../redux/user/fetchData";
import { useHistory } from "react-router-dom";

const EditUser = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toastSuccess, toastError } = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { id } = props.match.params;

  useEffect(() => {
    const getData = async () => {
      const res = await getUserByIdForAdmin(id);
      if (res.data?.status) {
        const data = res.data.data;
        if (data) {
          setName(data.name);
          setEmail(data.email);
          setRole(data.role);
        }
      } else {
        toastError(res.data?.message);
      }
    };
    getData();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
  };

  const handleSubmit = () => {
    const body = {
      name,
      email,
      password,
      role,
    };

    updateUserForAdmin(id, body)
      .then((res) => {
        if (res.data.status === 1) {
          setIsLoading(true);
          toastSuccess(res.data.message);
          history.push("/admin/user");
        } else {
          toastError(`${res.data.message}`);
        }
      })
      .catch((e) => toastError(e));
  };

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
            <ButtonBackHome type="admin" />
            <Flex ml={"20px"}>Sửa thông tin tài khoản</Flex>
          </Flex>
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="code">Email</FormLabel>
              <Input
                id="email"
                type="text"
                name={"email"}
                value={email}
                placeholder="Vui lòng điền email"
                onChange={handleChange}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <Input
                id="password"
                type="password"
                name={"password"}
                onChange={handleChange}
                placeholder="Nhập mật khẩu cho tài khoản"
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={"20px"}>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="name">Tên</FormLabel>
              <Input
                id="name"
                type="test"
                value={name}
                placeholder="Vui lòng điền tên người dùng"
                name={"name"}
                onChange={handleChange}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel htmlFor="name">Chức danh</FormLabel>
              <Select
                placeholder="Chọn chức danh"
                onChange={handleChange}
                name={"role"}
                value={role}
              >
                <option value="ROLE_USER">user</option>
                <option value="ROLE_ADMIN">admin</option>
              </Select>
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </GridItem>
        </Grid>

        <Center margin={"20px"}>
          <Button size={"lg"} mt={4} colorScheme="teal" onClick={handleSubmit}>
            Submit&nbsp;
            <Loading duration={10} isDisable={isLoading} />
          </Button>
        </Center>
      </Container>
    </BaseLayoutAdmin>
  );
};

export default EditUser;
