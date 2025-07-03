import { Static, t } from "elysia";

//* Task body schema
export const TaskBodySchema = t.Object({
    task_name: t.String({
        description: "This is the name of the task",
        example: "Postproduction"
    }),
    task_client: t.String({
        description: "This is the client of the task",
        example: "Coca-Cola"
    }),
    task_minutes: t.Number({
        description: "This is the minutes of the task",
        example: 10
    })
}, { title: "Task body", description: "This contains the essential information to create a task" })

//* Task body model
export type TaskBody = Static<typeof TaskBodySchema>;