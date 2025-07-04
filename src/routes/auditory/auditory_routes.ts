import { Elysia } from "elysia";
import { prisma } from "../../context/db_config/db_service";
import { AuditoryService } from "../../services/auditory/auditory_service";
import { AuditoryController } from "../../controllers/auditory/auditory_controller";
import { AuditorySchema } from "../../models/auditory/auditory_model";
import { randomUUIDv7 } from "bun";
import { AuditoryBodySchema } from "../../models/auditory/body/auditory_body";

//* Inject the database service
const db = prisma;

//* Inject the user service
const service = new AuditoryService(db);

//* Inject the user controller
const controller = new AuditoryController(service);

//* Routes
export const auditoryRoutes = new Elysia({ prefix: "/auditory" })
  //* Get all auditory
  .get("/", controller.getAllAuditory, {
    detail: {
      tags: ["Auditory"],
      summary: "Obtain all auditory",
      description: "This endpoint is used to obtain all auditory on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the list of auditory on database",
          content: {
            "application/json": {
              schema: AuditorySchema,
              example: [
                {
                  id: "1",
                  user: {
                    id: randomUUIDv7().toString(),
                    user_name: "JDOE",
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
                    created_at: "2025-01-01T00:00:00.000Z",
                    updated_at: "2025-01-01T00:00:00.000Z",
                    deleted_at: "2025-01-01T00:00:00.000Z",
                  },
                  task: {
                    id: "1",
                    details: "Task 1",
                    is_active: true,
                    created_at: "2025-01-01T00:00:00.000Z",
                    updated_at: "2025-01-01T00:00:00.000Z",
                    deleted_at: "2025-01-01T00:00:00.000Z",
                  },
                  status: true,
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
            "This code is for no content response, and return a message that no auditory was found",
          content: {
            "application/json": {
              example: {
                message: "No auditories found",
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
  }).model({
    body: AuditoryBodySchema,
    model: AuditorySchema,
  });
