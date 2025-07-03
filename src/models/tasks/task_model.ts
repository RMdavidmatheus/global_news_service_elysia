import { Static, t } from "elysia";
import { TaskJsonSchema } from "./task_json_model";
import { randomUUIDv7 } from "bun";

//* Task schema
export const TaskSchema = t.Object({
    id: t.String({
        description: "This is the id of the task",
        example: randomUUIDv7().toString()
    }),
    details: t.Object(TaskJsonSchema),
    is_active: t.Boolean({
        description: "This is the active status of the task",
        example: true
    }),
    created_at: t.String({
        description: "This is the created at of the task",
        example: "2025-01-01T00:00:00.000Z"
    }),
    updated_at: t.Optional(t.String({
        description: "This is the updated at of the task",
        example: "2025-01-01T00:00:00.000Z"
    })),
    deleted_at: t.Optional(t.String({
        description: "This is the deleted at of the task",
        example: "2025-01-01T00:00:00.000Z"
    }))
}, { title: "Task model", description: "This is the schema of the task when is returned" })

//* Task model
export type TaskModel = Static<typeof TaskSchema>;