import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { LinkItems } from "../configs/constants/admin/headerAdmin";
import NavItem from "./NavItem";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/home";
import { useSelectorUser } from "redux/hooks";
import { useHistory } from "react-router-dom";
import { userInfoActions } from "redux/slices/userSlice";
import { store } from "redux/store";
interface SidebarProps extends BoxProps {
  onClose: () => void;
}

//----------------------------------------------------------------

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  const user = useSelectorUser();

  const handleLogout = () => {
    store.dispatch(userInfoActions.logOut());
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      // overflow={"auto"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src="/logo-admin.png" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Text
        mt="10px"
        mx="8"
        style={{ color: "blue" }}
        fontSize="20"
      >{`Xin chào ${user?.name}!`}</Text>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href || "#"}>
          {link.name}
        </NavItem>
      ))}
      {/* <Box h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
          p="0"
        >
          {colorMode === "light" ? (
            <Image src="/img/sun-light.svg" />
          ) : (
            <Image src="/img/moon-dark.svg" />
          )}
        </Button>
      </Box> */}
      <Button
        aria-label="Toggle Color Mode"
        onClick={() => handleLogout()}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
        p="5"
        ml="12"
        color="red"
      >
        Đăng xuất
      </Button>
    </Box>
  );
};

export default SidebarContent;
