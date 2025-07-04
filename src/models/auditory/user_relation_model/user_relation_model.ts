import { randomUUIDv7 } from "bun";
import { Static, t } from "elysia";
import { LunchTimeSchema } from "../../users/lunch_time_model";

//* User relation schema
export const UserRelationSchema = t.Object({
    id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString()
    }),
    admin: t.Boolean({
        description: "This is the admin status of the user",
        example: false,
    }),
    user_name: t.String({
        description: "This is the user name of the user",
        example: "JDOE",
    }),
}, { title: "User relation model", description: "This is the schema of the user relation when is returned" })

//* User relation model
export type UserRelationModel = Static<typeof UserRelationSchema>;