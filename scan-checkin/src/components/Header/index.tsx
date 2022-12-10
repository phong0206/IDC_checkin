import {
  Flex,
  Box,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Config } from "configs";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Translate from "../Translate";
import { useHistory } from "react-router-dom";
import { useSelectorUser } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/home";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("header");
  const [isScroll, setIsScroll] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelectorUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const hanndleScroll = () => {
    if (window.scrollY >= 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  window.addEventListener("scroll", hanndleScroll);

  useEffect(() => {
    if (localStorage.getItem("lang")) {
      const exist = Config.LIST_LANGUAGE.find(
        (i) => i?.value === localStorage.getItem("lang")
      );
      if (exist) {
        i18n.changeLanguage(localStorage.getItem("lang") || "en");
      } else {
        i18n.changeLanguage("en");
        localStorage.setItem("lang", "en");
      }
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("lang", "en");
    }
  }, []);

  const handleSignUp = () => {
    history.push("/sign-up");
  };

  const handleBackHome = () => {
    history.push("/");
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const handleProfile = () => {
    history.push("/user-profile");
  };

  return (
    <Box w={"100%"} position={"fixed"} zIndex={"9000"} ml={"0px"}>
      <Flex
        className={isScroll ? "navbar colorChange" : "navbar"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex onClick={handleBackHome} h={"60px"}>
            <Image src={"/img/logo-bookingcare.png"} />
            {/* <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text> */}
          </Flex>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex h="inherit" align="center">
          <Translate />
        </Flex>
        <Flex mr={"12px"}>
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
        </Flex>
        {user && user.isActive ? (
          <Popover>
            <PopoverTrigger>
              <WrapItem
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Button colorScheme="gray">{user?.name || ""}</Button>
                {/* <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}
              </WrapItem>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {/* <PopoverHeader>{user?.name || ""}</PopoverHeader> */}
              <PopoverBody>
                <Flex cursor={"pointer"} onClick={handleProfile}>
                  Quản lý tài khoản
                </Flex>
              </PopoverBody>
              <PopoverBody
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => handleLogout()}
              >
                Đăng xuất
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              {t("sign_in")}
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={handleSignUp}
            >
              Đăng ký
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Header;
