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
  Stack,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

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

const StyledRadioButton = forwardRef((props: FormInputProps, ref: any) => {
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
    formState,
  }: IParamsRender) => {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={htmlFor}>{`${label}`}</FormLabel>}
        <div>
          <RadioGroup
            value={value}
            placeholder={placeholder || ""}
            onChange={(text) => onChange(text)}
            defaultValue="1"
            {...customInputProps}
          >
            <Stack direction="row">
              {options.map((el: IOption) => (
                <Radio value={el.value.toString()}>{el.label}</Radio>
              ))}
            </Stack>
          </RadioGroup>
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

export default StyledRadioButton;
