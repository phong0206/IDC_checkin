/* eslint-disable no-unused-expressions */
import React, { forwardRef, FunctionComponent } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Text,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import ReactDatePicker from "react-datepicker";

type TName = FieldPath<FieldValues>;

export interface IParamsRender {
  field: ControllerRenderProps<FieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

interface FormInputProps {
  label: string;
  htmlFor?: string;
  placeholder?: string;
  type?: string;
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  form?: UseFormReturn;
  dynamicOnChangeName?: string;
}

const StyledInputDate = forwardRef((props: FormInputProps, ref: any) => {
  const { t } = useTranslation();
  const {
    label,
    htmlFor,
    placeholder,
    type = "text",
    name,
    rules,
    defaultValue = "",
    form,
    dynamicOnChangeName = "onChangeText",
    ...inputProps
  } = props;
  const formContext = useFormContext();

  const { control } = formContext || form;
  const customInputProps = inputProps;

  const renderBaseInput = ({
    field: { onChange, value },
    fieldState: { error },
  }: IParamsRender) => {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={htmlFor}>{`${label}`}</FormLabel>}
        <div>
          <ReactDatePicker
            ref={ref}
            selected={value || new Date("1999/09/29")}
            onChange={(text) => onChange(text)}
            autoComplete="off"
            {...customInputProps}
          />
        </div>
        {!!error?.message && (
          <Text color={"red.300"}>{`${error?.message}`}</Text>
        )}
      </FormControl>
    );
  };

  return (
    <Controller
      control={control}
      name={name as any}
      defaultValue={defaultValue}
      rules={rules}
      render={renderBaseInput}
    />
  );
});

export default StyledInputDate;
