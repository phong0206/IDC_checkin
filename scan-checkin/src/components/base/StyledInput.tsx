import React, { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, Input, FormLabel, FormControl } from "@chakra-ui/react";

export interface StyledInputProps {
  errorMessage?: string;
  label?: string;
  containerStyle: any;
  customPlaceHolder: any;
  htmlFor: string;
  isError: boolean;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const {
    containerStyle,
    label,
    customPlaceHolder,
    errorMessage,
    htmlFor,
    isError,
    ...otherProps
  } = props;

  return (
    <FormControl isInvalid={isError}>
      {!!label && <FormLabel htmlFor={htmlFor}>{`${label}`}</FormLabel>}
      <div>
        <Input
          isInvalid={!isFocused && !!errorMessage}
          placeholder={customPlaceHolder ? customPlaceHolder : ""}
          {...otherProps}
        />
      </div>
      {!!errorMessage && <Text>{`${errorMessage}`}</Text>}
    </FormControl>
  );
};

export default forwardRef(StyledInput);
