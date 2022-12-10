import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

interface ButtonBackHomeProps {
  type?: string;
}

const ButtonBackHome: React.FC<ButtonBackHomeProps> = ({ type }) => {
  const history = useHistory();
  const handleBackHome = () => {
    if (type === "home") history.push("/");
    else history.goBack();
  };
  return (
    <Flex>
      {type === "admin" ? (
        <Flex onClick={handleBackHome}>
          <Button
            rightIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
          />
        </Flex>
      ) : (
        <Flex
          position={"absolute"}
          top={"10"}
          left={"10"}
          justifyContent={"center"}
          onClick={handleBackHome}
        >
          <Button
            rightIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ButtonBackHome;
