import { randomUUIDv7 } from "bun";
import { Static, t } from "elysia";
import { TaskJsonSchema } from "../../tasks/task_json_model";

//* Task relation schema
export const TaskRelationSchema = t.Object({
    id: t.String({
        description: "This is the id of the task",
        example: randomUUIDv7().toString()
    }),
    details: TaskJsonSchema,
}, { title: "Task model", description: "This is the schema of the task when is returned" });

//* Task relation model
export type TaskRelationModel = Static<typeof TaskRelationSchema>;