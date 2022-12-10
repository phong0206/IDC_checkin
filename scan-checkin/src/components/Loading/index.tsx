import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import React from "react";
import { RepeatIcon } from "@chakra-ui/icons";

interface Props {
  duration: number;
  isDisable?: any;
  ml?: any;
  mr?: any;
}
const spin = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
  `;

const Loading: React.FC<Props> = ({
  duration,
  isDisable,
  ml = "0px",
  mr = "0px",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite ${duration}s linear`;

  return (
    <Box display={isDisable ? "none" : "block"} ml={ml} mr={mr}>
      <RepeatIcon animation={animation} />
    </Box>
  );
};

export default Loading;
