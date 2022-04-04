import * as Yup from "yup";

function getValidationSchema(values) {
  return Yup.object().shape({
    name: Yup.string().required("Tên được yêu cầu!"),
    user_name: Yup.string().required("Tên người dùng được yêu cầu!"),
    email: Yup.string().required("Email được yêu cầu!"),
    address: Yup.string(),
    date_of_birth: Yup.string(),
    avatar: Yup.string(),
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
