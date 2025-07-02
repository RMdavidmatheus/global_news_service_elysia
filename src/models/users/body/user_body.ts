import { Static, t } from "elysia";

//* User body
export const userBodySchema = t.Object({
  user_name: t.String({
    description: "This is the user name of the user",
    example: "JDOE",
  }),

  full_name: t.String({
    description: "This is the full name of the user",
    example: "John Doe",
  }),

  password: t.String({
    description: "This is the password of the user",
    example: "123456",
  }),
}, {title: "User body", description: "This contains the essential information to create a user"});

//* Export the user body
export type UserBody = Static<typeof userBodySchema>;