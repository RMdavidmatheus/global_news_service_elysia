import { lunchTimeSchema } from './../../models/lunch_time_model';
import Elysia, { t } from "elysia";
import { prisma } from "../../context/db_config/db_service";
import { UserController } from "../../controllers/users/user_controller";
import { UserService } from "../../services/users/user_service";
import { userSchema } from "../../models/users/user_model";
import { randomUUIDv7 } from "bun";

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
              schema: t.Array(userSchema),
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
              schema: userSchema,
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
  .model({
    userSchema,
    lunchTimeSchema,
  });
