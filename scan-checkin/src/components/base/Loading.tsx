import Lottie from "react-lottie";
import { Box } from "@chakra-ui/react";

import animationData from "assets/loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  return (
    <Box w="100%" height="100%">
      <Lottie options={defaultOptions} height={100} width={100} />
    </Box>
  );
};

export default Loading;
