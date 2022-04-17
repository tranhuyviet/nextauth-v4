import { IErrorsObject } from "./types";

const errorParse = (error: any) => {
  const errors: IErrorsObject = {};
  if (error.inner) {
    error.inner.forEach((el: any) => {
      errors[el.path] = el.message;
    });
  } else {
    errors.global = "Something went wrong. Please try again.";
  }
  return errors;
};

export default errorParse;
