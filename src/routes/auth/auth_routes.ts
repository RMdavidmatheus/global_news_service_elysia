import { Elysia, t } from "elysia";
import { UserController } from "../../controllers/users/user_controller";
import { UserService } from "../../services/users/user_service";
import { prisma } from "../../context/db_config/db_service";
import { LoginBodySchema } from "../../models/users/body/login_body";

const userService = new UserService(prisma);
const userController = new UserController(userService);

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/login", userController.loginUser, {
    body: LoginBodySchema,
    detail: {
      tags: ["Authentication"],
      summary: "Login user",
      description: "Authenticate user and create JWT token",
      responses: {
        200: {
          description:
            "This code is for success response, and return the message",
          content: {
            "application/json": {
              example: {
                message: "Successfully logged in",
              },
            },
          },
        },
        401: {
          description:
            "This code is for error response, and return the error message",
          content: {
            "application/json": {
              example: {
                message: "Invalid credentials",
              },
            },
          },
        },
        500: {
          description:
            "This code is for error response, and return the error message",
          content: {
            "application/json": {
              example: {
                message: "Internal server error",
              },
            },
          },
        },
      },
    },
  })
  .get(
    "/logout",
    ({ set, cookie: { auth_token } }) => {
      return userController.logoutUser({ set, cookie: { auth_token } });
    },
    {
      detail: {
        tags: ["Authentication"],
        summary: "Logout user",
        description: "Remove authentication token",
        responses: {
          200: {
            description:
              "This code is for success response, and return the message",
            content: {
              "application/json": {
                example: {
                  message: "Successfully logged out",
                },
              },
            },
          },
          400: {
            description:
              "This code is for error response, and return the error message",
            content: {
              "application/json": {
                example: {
                  message: "No session started",
                },
              },
            },
          },
          500: {
            description:
              "This code is for error response, and return the error message",
            content: {
              "application/json": {
                example: {
                  message: "Internal server error",
                },
              },
            },
          },
        },
      },
    }
  )
  .get("/session", userController.decodeSession, {
    detail: {
      tags: ["Authentication"],
      summary: "Decode session",
      description: "Decode session and return the values",
      responses: {
        200: {
          description:
            "This code is for success response, and return the message",
          content: {
            "application/json": {
              example: {
                message:
                  "Session decoded successfully taking the values: user_id: 1, username: test, full_name: Test User, admin: false",
              },
            },
          },
        },
        401: {
          description:
            "This code is for error response, and return the error message",
          content: {
            "application/json": {
              example: {
                message: "Invalid session",
              },
            },
          },
        },
        500: {
          description:
            "This code is for error response, and return the error message",
          content: {
            "application/json": {
              example: {
                message: "Internal server error",
              },
            },
          },
        },
      },
    },
  }).model({
    body: LoginBodySchema,
  });
