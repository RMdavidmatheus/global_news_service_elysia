import Elysia, { t } from "elysia";
import { prisma } from "../../context/db_config/db_service";
import { TaskController } from "../../controllers/tasks/task_controller";
import { TaskService } from "../../services/tasks/task_service";
import { TaskSchema } from "../../models/tasks/task_model";
import { randomUUIDv7 } from "bun";
import { TaskBodySchema } from "../../models/tasks/body/task_body";

//* Inject the database service
const db = prisma;

//* Inject the user service
const service = new TaskService(db);

//* Inject the user controller
const controller = new TaskController(service);

//* Routes
export const taskRoutes = new Elysia({ prefix: "/tasks" })
  //* Get all tasks
  .get("/", controller.getAllTasks, {
    detail: {
      tags: ["Tasks"],
      summary: "Obtain all tasks",
      description: "This endpoint is used to obtain all tasks on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the list of tasks on database",
          content: {
            "application/json": {
              schema: t.Array(TaskSchema),
              example: [
                {
                  id: randomUUIDv7().toString(),
                  details: {
                    task_name: "Postproduction",
                    task_client: "Coca-Cola",
                    task_initial_time: "2025-01-01T00:00:00.000Z",
                    task_final_time: "2025-01-01T00:00:00.000Z",
                    task_elapsed_time: "0 minutes",
                  },
                  is_active: true,
                  created_at: "2025-01-01T00:00:00.000Z",
                  updated_at: "2025-01-01T00:00:00.000Z",
                  deleted_at: "2025-01-01T00:00:00.000Z",
                },
              ],
            },
          },
        },
        204: {
          description:
            "This code is for no content response, and return a message that no tasks were found",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
              }),
              example: {
                message: "No tasks found",
              },
            },
          },
        },
        500: {
          description:
            "This code is for internal server error response, and return a message that the server is not working",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
              }),
              example: {
                message: "Internal server error",
              },
            },
          },
        },
      },
    },
  })
  //* Get a task by id
  .get("/task", controller.getTaskById, {
    query: t.Object({
      id: t.String({
        description: "This is the id of the task",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Tasks"],
      summary: "Obtain a task by id",
      description: "This endpoint is used to obtain a task by id on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the task by id on database",
          content: {
            "application/json": {
              schema: TaskSchema,
              example: {
                id: randomUUIDv7().toString(),
                details: {
                  task_name: "Postproduction",
                  task_client: "Coca-Cola",
                  task_initial_time: "2025-01-01T00:00:00.000Z",
                  task_final_time: "2025-01-01T00:00:00.000Z",
                  task_elapsed_time: "0 minutes",
                },
                is_active: true,
                created_at: "2025-01-01T00:00:00.000Z",
                updated_at: "2025-01-01T00:00:00.000Z",
                deleted_at: "2025-01-01T00:00:00.000Z",
              },
            },
          },
        },
        404: {
          description:
            "This code is for not found response, and return a message that the task was not found",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
              }),
              example: {
                message: "Task not found",
              },
            },
          },
        },
        500: {
          description:
            "This code is for internal server error response, and return a message that the server is not working",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
              }),
              example: {
                message: "Internal server error",
              },
            },
          },
        },
      },
    },
  })
  //* Create a task
  .post("/", controller.createTask, {
    body: TaskBodySchema,
    detail: {
      tags: ["Tasks"],
      summary: "Create a task",
      description: "This endpoint is used to create a task on database",
      responses: {
        201: {
          description:
            "This code is for created response, and return the task created on database",
          content: {
            "application/json": {
              example: {
                message: `Task created successfully with id: ${randomUUIDv7().toString()}`,
              },
            },
          },
        },
        400: {
          description:
            "This code is for bad request response, and return a message that the task was not created",
          content: {
            "application/json": {
              example: {
                message: "Task not created",
              },
            },
          },
        },
        500: {
          description:
            "This code is for internal server error response, and return a message that the server is not working",
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
  });
