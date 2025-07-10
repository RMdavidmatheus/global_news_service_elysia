import { LunchTimeBodySchema } from "./../../models/users/body/lunch_time_body";
import { LunchTimeSchema } from "../../models/users/lunch_time_model";
import Elysia, { t } from "elysia";
import { prisma } from "../../context/db_config/db_service";
import { UserController } from "../../controllers/users/user_controller";
import { UserService } from "../../services/users/user_service";
import { UserSchema } from "../../models/users/user_model";
import { randomUUIDv7 } from "bun";
import { UserBodySchema } from "../../models/users/body/user_body";
import { LoginBodySchema } from "../../models/users/body/login_body";

//* Inject the database service
const db = prisma;

//* Inject the user service
const service = new UserService(db);

//* Inject the user controller
const controller = new UserController(service);

//* Routes
export const userRoutes = new Elysia({ prefix: "/users" })
  //* Get all users
  .get("/", controller.getAllUsers, {
    detail: {
      tags: ["Users"],
      summary: "Obtain all users",
      description: "This endpoint is used to obtain all users on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the list of users on database",
          content: {
            "application/json": {
              schema: t.Array(UserSchema),
              example: [
                {
                  id: randomUUIDv7().toString(),
                  admin: true,
                  user_name: "jdoe",
                  full_Name: "John Doe",
                  password: "123456",
                  lunch_time: {
                    is_launching: true,
                    schedule_user: "T",
                    initial_time: "12:00",
                    final_time: "13:00",
                    elapsed_time: "1 Hour",
                  },
                  is_active: true,
                  created_at: "2021-01-01T00:00:00.000Z",
                  updated_at: "2021-01-01T00:00:00.000Z",
                  deleted_at: "2021-01-01T00:00:00.000Z",
                },
                {
                  id: randomUUIDv7().toString(),
                  admin: true,
                  user_name: "dmateus",
                  full_Name: "David Mateus",
                  password: "123456",
                  lunch_time: {
                    is_launching: true,
                    schedule_user: "T",
                    initial_time: "12:00",
                    final_time: "13:00",
                    elapsed_time: "1 Hour",
                  },
                  is_active: true,
                  created_at: "2021-01-01T00:00:00.000Z",
                  updated_at: "2021-01-01T00:00:00.000Z",
                  deleted_at: "2021-01-01T00:00:00.000Z",
                },
              ],
            },
          },
        },
        204: {
          description: "This code is for success response, but no users found",
          content: {
            "application/json": {
              example: {
                message: "No users found",
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
  //* Get user by id
  .get("/user", controller.getUserById, {
    query: t.Object({
      id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Obtain a user by id",
      description: "This endpoint is used to obtain a user by id on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the user on database",
          content: {
            "application/json": {
              schema: UserSchema,
              example: {
                id: randomUUIDv7().toString(),
                admin: true,
                user_name: "jdoe",
                full_Name: "John Doe",
                password: "123456",
                lunch_time: {
                  is_launching: true,
                  schedule_user: "T",
                  initial_time: "12:00",
                  final_time: "13:00",
                  elapsed_time: "1 Hour",
                },
                is_active: true,
                created_at: "2021-01-01T00:00:00.000Z",
                updated_at: "2021-01-01T00:00:00.000Z",
                deleted_at: "2021-01-01T00:00:00.000Z",
              },
            },
          },
        },
        204: {
          description: "This code is for success response, but no user found",
          content: {
            "application/json": {
              example: {
                message: `User not found with id ${randomUUIDv7().toString()}`,
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
  //* Create user
  .post("/", controller.createUser, {
    body: UserBodySchema,
    detail: {
      tags: ["Users"],
      summary: "Create a user",
      description: "This endpoint is used to create a user on database",
      responses: {
        201: {
          description:
            "This code is for success response, and return message with the user id created",
          content: {
            "application/json": {
              example: {
                message: `User created successfully with id ${randomUUIDv7().toString()}`,
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
                message: "User not created",
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
  //* Update user
  .put("/user", controller.updateUser, {
    body: UserBodySchema,
    query: t.Object({
      id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Update a user",
      description: "This endpoint is used to update a user on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return message with the user id updated",
          content: {
            "application/json": {
              example: {
                message: `User updated successfully with id ${randomUUIDv7().toString()}`,
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
                message: "User not updated",
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
  //* Patch lunch time
  .patch("/lunch-time", controller.updateLunchTime, {
    body: LunchTimeBodySchema,
    query: t.Object({
      id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Update lunch time",
      description:
        "This endpoint is used to update lunch time of a user on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return message with the user id updated",
          content: {
            "application/json": {
              example: {
                message: `Lunch time updated successfully on user with id ${randomUUIDv7().toString()}`,
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
                message: `Lunch time not updated on user with id ${randomUUIDv7().toString()}`,
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
  .delete("/user", controller.deleteUser, {
    query: t.Object({
      id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Delete a user",
      description: "This endpoint is used to delete a user on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return message with the user id deleted",
          content: {
            "application/json": {
              example: {
                message: `User deleted successfully with id ${randomUUIDv7().toString()}`,
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
                message: `User not deleted with id ${randomUUIDv7().toString()}`,
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
  //* Login user
  .post("/login", controller.loginUser, {
    body: LoginBodySchema,
    detail: {
      tags: ["Users"],
      summary: "Login user",
      description: "This endpoint is used to login a user on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return message with the user id logged",
          headers: {
            "Set-Cookie": {
              description: "This is the cookie with the token",
              example: "auth_token=token",
            },
          },
          content: {
            "application/json": {
              example: {
                message: "Login exitoso",
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
                message: "Credenciales inválidas",
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
  //* Logout user
  .get("/logout", controller.logoutUser, {
    detail: {
      tags: ["Users"],
      summary: "Logout user",
      description: "This endpoint is used to logout a user on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return message with the user id logged",
          content: {
            "application/json": {
              example: {
                message: "Cierre de sesión exitoso",
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
                message: "No se ha iniciado sesión",
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
  //* Models
  .model({
    UserSchema,
    LunchTimeSchema,
    UserBodySchema,
    LunchTimeBodySchema,
    LoginBodySchema,
  });
