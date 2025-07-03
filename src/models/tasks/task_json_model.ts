import { Static, t } from "elysia";

//* Task json schema
export const TaskJsonSchema = t.Object({
    task_name: t.String({
        description: "This is the name of the task",
        example: "Postproduction"
    }),
    task_client: t.String({
        description: "This is the client of the task",
        example: "Coca-Cola"
    }),
    task_initial_time: t.String({
        description: "This is the initial time of the task",
        example: "2025-01-01T00:00:00.000Z"
    }),
    task_final_time: t.String({
        description: "This is the final time of the task",
        example: "2025-01-01T00:00:00.000Z"
    }),
    task_elapsed_time: t.String({
        description: "This is the elapsed time of the task",
        example: "1 Hour"
    }),
}, { title: "Task json model", description: "This is the schema of the task in json format when is returned" })

//* Task json model
export type TaskJsonModel = Static<typeof TaskJsonSchema>;