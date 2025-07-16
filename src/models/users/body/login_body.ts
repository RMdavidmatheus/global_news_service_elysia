import { Static, t } from "elysia";

//* Login body
export const LoginBodySchema = t.Object(
  {
    user_name: t.String({
      description: "This is the user name of the user",
      example: "JDOE",
    }),
    password: t.String({
      description: "This is the password of the user",
      example: "123456",
    }),
  },
  {
    title: "Login body",
    description: "This contains the credentials for user login",
  }
);

//* Export the login body
export type LoginBody = Static<typeof LoginBodySchema>;
