import { object, string, ref } from "yup";

// for registration
export const createUserSchema = object({
    body: object({
        name: string(),
        password:string()
          .required("Password is required")
          .min(6, "Password is too short - should be 6 chars minimum.")
          .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain latin letters"),
        passwordConfirmation: string().oneOf(
            [ref("password"), ''],
            "Passwords must match"
          ),
        email: string()
            .email("Email Must be valid")
            .required("Email is required"),
          })
});

// for login
export const createUserSessionSchema = object({
  body: object({
      password:string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain latin letters"),
      passwordConfirmation: string().oneOf(
          [ref("password"), ''],
          "Passwords must match"
        ),
      email: string()
          .email("Email Must be valid")
          .required("Email is required"),
        })
});
