import { randomUUIDv7 } from "bun";
import { Static, t } from "elysia";

//* Auditory body schema
export const AuditoryBodySchema = t.Object({
    id_user: t.String({
        description: "This is the id of the user",
        example: randomUUIDv7().toString()
    }),
    id_task: t.String({
        description: "This is the id of the task",
        example: randomUUIDv7().toString()
    }),
}, { title: "Auditory body", description: "This contains the essential information to create an auditory" })

//* Auditory body model
export type AuditoryBody = Static<typeof AuditoryBodySchema>;