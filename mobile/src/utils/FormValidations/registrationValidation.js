import * as Yup from "yup";

function getValidationSchema(values) {
  return Yup.object().shape({
    password: Yup.string().required("Mật khẩu được yêu cầu!"),
    confirmPassword: Yup.string()
      .oneOf([values.password], "Mật khẩu không trùng khớp!")
      .required("Xác nhận mật khẩu phải điền!"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email được yêu cầu!"),
  });
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

export default function validate(values) {
  const validationSchema = getValidationSchema(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}
