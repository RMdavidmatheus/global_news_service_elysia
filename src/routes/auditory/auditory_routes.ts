import { Elysia, t } from "elysia";
import { prisma } from "../../context/db_config/db_service";
import { AuditoryService } from "../../services/auditory/auditory_service";
import { AuditoryController } from "../../controllers/auditory/auditory_controller";
import { AuditorySchema } from "../../models/auditory/auditory_model";
import { randomUUIDv7 } from "bun";
import { AuditoryBodySchema } from "../../models/auditory/body/auditory_body";
import { StatusBodySchema } from "../../models/auditory/body/status_body";

//* Inject the database service
const db = prisma;

//* Inject the user service
const service = new AuditoryService(db);

//* Inject the user controller
const controller = new AuditoryController(service);

//* Routes
export const auditoryRoutes = new Elysia({ prefix: "/auditories" })
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
                    admin: true,
                    user_name: "JDOE",
                  },
                  task: {
                    id: "1",
                    details: {
                      task_name: "Postproduction",
                      task_client: "Coca-Cola",
                      task_initial_time: "2025-01-01T00:00:00.000Z",
                      task_final_time: "2025-01-01T00:00:00.000Z",
                      task_elapsed_time: "0 minutes",
                    },
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
  })
  //* Get auditory by id
  .get("/auditory", controller.getAuditoryById, {
    query: t.Object({
      id: t.String({
        description: "This is the id of the auditory",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Auditory"],
      summary: "Obtain a auditory by id",
      description:
        "This endpoint is used to obtain a auditory by id on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return the auditory on database",
          content: {
            "application/json": {
              schema: AuditorySchema,
              example: {
                id: randomUUIDv7().toString(),
                user: {
                  id: randomUUIDv7().toString(),
                  admin: true,
                  user_name: "JDOE",
                },
                task: {
                  id: randomUUIDv7().toString(),
                  details: {
                    task_name: "Task 1",
                    task_client: "Client 1",
                    task_initial_time: "12:00",
                    task_final_time: "13:00",
                    task_elapsed_time: "1 Hour",
                  },
                },
                status: true,
                is_active: true,
                created_at: "2025-01-01T00:00:00.000Z",
                updated_at: "2025-01-01T00:00:00.000Z",
                deleted_at: "2025-01-01T00:00:00.000Z",
              },
            },
          },
        },
        204: {
          description:
            "This code is for no content response, and return a message that no auditory was found",
          content: {
            "application/json": {
              example: {
                message: "Auditory not found",
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
  })
  //* Create auditory
  .post("/", controller.createAuditory, {
    body: AuditoryBodySchema,
    detail: {
      tags: ["Auditory"],
      summary: "Create a auditory",
      description: "This endpoint is used to create a auditory on database",
      responses: {
        201: {
          description:
            "This code is for created response, and return a message that the auditory was created",
          content: {
            "application/json": {
              example: {
                message: "Auditory created successfully",
              },
            },
          },
        },
        400: {
          description:
            "This code is for bad request response, and return a message that the auditory was not created",
          content: {
            "application/json": {
              example: {
                message: "Auditory not created",
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
  })
  //* Update auditory status
  .patch("/auditory/status", controller.updateAuditoryStatusToDisable, {
    body: StatusBodySchema,
    detail: {
      tags: ["Auditory"],
      summary: "Update auditory status to disable",
      description:
        "This endpoint is used to update the status of a auditory to disable",
      responses: {
        200: {
          description:
            "This code is for success response, and return a message that the auditory status was updated",
          content: {
            "application/json": {
              example: {
                message: `Auditory status updated with id: ${randomUUIDv7().toString()}`,
              },
            },
          },
        },
        400: {
          description:
            "This code is for bad request response, and return a message that the auditory status was not updated",
          content: {
            "application/json": {
              example: {
                message: `Error updating auditory status with id: ${randomUUIDv7().toString()}`,
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
  })
  //* Delete auditory
  .delete("/auditory", controller.deleteAuditory, {
    query: t.Object({
      id: t.String({
        description: "This is the id of the auditory",
        example: randomUUIDv7().toString(),
      }),
    }),
    detail: {
      tags: ["Auditory"],
      summary: "Delete a auditory",
      description: "This endpoint is used to delete a auditory on database",
      responses: {
        200: {
          description:
            "This code is for success response, and return a message that the auditory was deleted",
          content: {
            "application/json": {
              example: {
                message: `Auditory deleted with id: ${randomUUIDv7().toString()}`,
              },
            },
          },
        },
        400: {
          description:
            "This code is for bad request response, and return a message that the auditory was not deleted",
          content: {
            "application/json": {
              example: {
                message: `Error deleting auditory with id: ${randomUUIDv7().toString()}`,
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
  })
  .model({
    body: AuditoryBodySchema,
    model: AuditorySchema,
    body_status: StatusBodySchema,
  });
