import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Config } from "configs";

const Translate: React.FC = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button
            px={["0px", "0px", "9px", "0px", "9px"]}
            bg="transparent"
            borderColor="gray.700"
            h="inherit"
            className="hover-icon"
            _hover={{
              bg: "transparent",
              color: "teal.150",
              borderBottom: "1px",
              borderRadius: "0px",
            }}
            mx={["0px", "6px", "0px"]}
            _active={{}}
          >
            <Image
              cursor="pointer"
              className={"arrow-child-icon"}
              src={"/img/language-active.svg"}
              width={"20px"}
              h={"20px"}
            />
            <Image
              cursor="pointer"
              className={"arrow-child-icon-hover"}
              src={"/img/language.svg"}
              width={"20px"}
              h={"20px"}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          maxW="135px"
          py="0px"
          mt="-8px"
          overflow="hidden"
          borderRadius="24px"
          borderWidth="0px"
          bg="#1F2835"
          borderColor="gray.700"
          _hover={{ bg: "#1F2835" }}
          _active={{ bg: "#1F2835" }}
        >
          {Config.LIST_LANGUAGE.map((item) => (
            <Flex
              w="100%"
              key={item?.value}
              m="0px"
              p="6px"
              textAlign="center"
              justifyContent="center"
              onClick={() => handleChangeLanguage(item?.value)}
              color={i18n.language === item?.value ? "teal.150" : "gray.500"}
              _focus={{ background: "gray.700" }}
              _hover={{ bg: "gray.700" }}
              _selected={{ bg: "#1F2835" }}
              _active={{ bg: "#1F2835" }}
            >
              {item?.label}
            </Flex>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Translate;
