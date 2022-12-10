import i18next from "i18next";
import * as yup from "yup";
import { requireField } from "./format";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "./validate";

const yupValidate = {
  name: () =>
    yup
      .string()
      .required(() => requireField("Tên"))
      .trim(i18next.t("error.trimSpace"))
      .strict(true)
      .min(USERNAME_MIN_LENGTH, i18next.t("error.nameLength"))
      .max(USERNAME_MAX_LENGTH, i18next.t("error.nameLength")),

  email: () =>
    yup
      .string()
      .required(() => requireField("Email"))
      .email("Email không đúng định dạng!")
      .matches(REGEX_EMAIL, "Email không đúng định dạng!"),

  phone: () =>
    yup
      .string()
      .required(() => requireField("phone"))
      .matches(REGEX_PHONE, i18next.t("error.phoneInvalid")),

  /**
   * @param ref : the name of StyledInputForm want to compare
   * @param isMatchCurrentPassword
   * password() : input password
   * password(ref) : input passwordConfirm, have to be the same with password
   * password(ref, false) : input newPassword, have not to be the same with currentPassword
   */
  password: (ref?: string, isMatchCurrentPassword = true): any => {
    if (ref) {
      // NEW PASSWORD
      if (!isMatchCurrentPassword) {
        return yupValidate
          .password()
          .not([yup.ref(ref), null], "Mật khẩu xác nhận không chính xác!");
      }

      // CONFIRM PASSWORD
      return yup
        .string()
        .required(() => requireField("Mật khẩu xác nhận"))
        .oneOf([yup.ref(ref), null], "Mật khẩu xác nhận không chính xác!");
    }

    return yup
      .string()
      .required(() => requireField("Mật khẩu"))
      .trim("Mật khẩu không được có khoảng cách!")
      .strict(true)
      .min(PASSWORD_MIN_LENGTH, "Mật khẩu tối thiểu 6 kí tự")
      .max(PASSWORD_MAX_LENGTH, "Mật khẩu tối đa 18 kí tự")
      .matches(REGEX_PASSWORD, "Mật khẩu không đúng định dạng");
  },
  birthday: () => yup.string().required(() => requireField("birthday")),
  labelPicker: () => yup.string().required(() => requireField("labelPicker")),
  policy: () => yup.string().required(() => requireField("policy")),
};

export default yupValidate;
