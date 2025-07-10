import { randomUUIDv7 } from "bun";
import { Static, t } from "elysia";
import { UserRelationSchema } from "./user_relation_model/user_relation_model";
import { TaskRelationSchema } from "./task_relation_model/task_relation_model";

//* Auditory schema
export const AuditorySchema = t.Object(
  {
    id: t.String({
      description: "This is the id of the auditory",
      example: randomUUIDv7().toString(),
    }),
    user: UserRelationSchema,
    task: TaskRelationSchema,
    status: t.Boolean({
      description: "This is the status of the task",
      example: true,
    }),
    is_active: t.Boolean({
      description: "This is the active status of the task",
      example: true,
    }),
    created_at: t.String({
      description: "This is the created at of the task",
      example: "2025-01-01T00:00:00.000Z",
    }),
    updated_at: t.Optional(
      t.String({
        description: "This is the updated at of the task",
        example: "2025-01-01T00:00:00.000Z",
      })
    ),
    deleted_at: t.Optional(
      t.String({
        description: "This is the deleted at of the task",
        example: "2025-01-01T00:00:00.000Z",
      })
    ),
  },
  {
    title: "Auditory model",
    description: "This is the schema of the auditory when is returned",
  }
);

//* Auditory model
export type AuditoryModel = Static<typeof AuditorySchema>;
