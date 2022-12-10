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
import { Text, Input, FormLabel, FormControl, Select } from "@chakra-ui/react";

type TName = FieldPath<FieldValues>;

export interface IParamsRender {
  field: ControllerRenderProps<FieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

export interface IOption {
  label: String;
  value: any;
}

interface FormInputProps {
  label: string;
  htmlFor?: string;
  placeholder?: string;
  options: Array<IOption>;
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  form?: UseFormReturn;
  dynamicOnChangeName?: string;
}

const StyledInputForm = forwardRef((props: FormInputProps, ref: any) => {
  const { t } = useTranslation();
  const {
    label,
    htmlFor,
    placeholder,
    options,
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
          <Select
            value={value}
            placeholder={placeholder || ""}
            onChange={(text) => onChange(text)}
            {...customInputProps}
          >
            {options.map((el: IOption) => (
              <option value={el.value}>{el.label}</option>
            ))}
          </Select>
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

export default StyledInputForm;
