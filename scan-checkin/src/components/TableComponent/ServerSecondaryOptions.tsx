import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import { RiRestartLine, RiFileShredLine, RiLock2Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";

import { deleteDoctor, unlockDoctor } from "../../redux/doctor/fetchData";
import { deleteClinic, unlockClinic } from "../../redux/clinic/fetchData";
import { deactivateUser, activateUser } from "../../redux/user/fetchData";
import useToast from "../Toast";

interface ServerSecondaryOptionsProps {
  name: string;
  id: any;
}

const ServerSecondaryOptions: React.FC<ServerSecondaryOptionsProps> = ({
  name,
  id,
}) => {
  const { toastSuccess, toastError } = useToast();
  const history = useHistory();

  const handleEdit = () => {
    if (window.location.pathname.includes("clinic-manager")) {
      history.push(`/clinic-manager/edit-${name}/${id}`);
    }
    if (window.location.pathname.includes("admin")) {
      history.push(`/admin/edit-${name}/${id}`);
    }
  };

  const handleView = () => {
    if (window.location.pathname.includes("clinic-manager")) {
      history.push(`/clinic-manager/profile-doctor/${id}`);
    }
  };

  const handleDelete = () => {
    if (name === "clinic") {
      deleteClinic(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }

    if (name === "doctor") {
      deleteDoctor(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }

    if (name === "user") {
      deactivateUser(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }
  };

  const handleUnlock = () => {
    if (name === "clinic") {
      unlockClinic(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }
    if (name === "user") {
      activateUser(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }
    if (name === "doctor") {
      unlockDoctor(id)
        .then((res) => {
          if (res.data.status === 1) {
            window.location.reload();
            toastSuccess(`${res.data.message}`);
          } else {
            toastError(`${res.data.message}`);
          }
        })
        .catch((e) => toastError(e));
    }
  };

  return (
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {name === "doctor" ? (
                <>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleView}
                  >
                    Xem
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleEdit}
                  >
                    Sửa
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiLock2Line />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleDelete}
                  >
                    Khoá
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiLock2Line />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleUnlock}
                  >
                    Mở khoá
                  </Button>
                </>
              ) : (
                ""
              )}
              {name === "service" ? (
                <>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleEdit}
                  >
                    Sửa
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiLock2Line />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleDelete}
                  >
                    xoá
                  </Button>
                </>
              ) : (
                ""
              )}
              {name === "clinic" ? (
                <>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleUnlock}
                  >
                    Mở khoá
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiLock2Line />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleDelete}
                  >
                    Khoá
                  </Button>
                </>
              ) : (
                ""
              )}
              {name === "user" ? (
                <>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleEdit}
                  >
                    Sửa
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiLock2Line />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleDelete}
                  >
                    Khoá
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<RiFileShredLine />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    onClick={handleUnlock}
                  >
                    Mở khoá
                  </Button>
                </>
              ) : (
                ""
              )}
              {name === "contact-us" ? (
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<RiRestartLine />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  colorScheme="red"
                  fontSize="sm"
                  onClick={handleDelete}
                >
                  Xóa
                </Button>
              ) : (
                ""
              )}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ServerSecondaryOptions;
