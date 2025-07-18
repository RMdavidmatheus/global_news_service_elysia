import { randomUUIDv7 } from "bun";
import { Static, t } from "elysia";

//* Status body schema
export const StatusBodySchema = t.Array(t.String(), {
    title: "Array of IDs",
    description: "This contains the ids of the items to update the status",
    example: [randomUUIDv7().toString(), randomUUIDv7().toString()]
})

//* Status body model
export type StatusBody = Static<typeof StatusBodySchema>;