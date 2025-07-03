import { randomUUIDv7 } from "bun";
import { t } from "elysia";
import { Static } from "elysia";
import { LunchTimeSchema } from "./lunch_time_model";

//* User schema
export const UserSchema = t.Object(
  {
    id: t.String({
        description: "This is the id of the user on the database",
        example: randomUUIDv7().toString(),
    }),
    admin: t.Boolean({
        description: "This is the admin status of the user",
        example: false,
    }),
    user_name: t.String({
        description: "This is the user name of the user",
        example: "JDOE",
    }),
    full_Name: t.String({
        description: "This is the full name of the user",
        example: "John Doe",
    }),
    password: t.String({
        description: "This is the password of the user",
        example: "$2b$10$CI1iMcHD4HiZYW1r0QoDsOJnZmy3GY4yyCHtPnPaSQMyPAoWG4Opy",
    }),
    lunch_time: t.Optional(LunchTimeSchema),
    is_active: t.Boolean({
        description: "This is the active status of the user",
        example: true,
    }),
    created_at: t.String({
        description: "This is the creation date of the user",
        example: "2025-01-01T00:00:00.000Z",
    }),
    updated_at: t.Optional(t.String({
        description: "This is the update date of the user",
        example: "2025-01-01T00:00:00.000Z",
    })),
    deleted_at: t.Optional(t.String({
        description: "This is the deletion date of the user",
        example: "2025-01-01T00:00:00.000Z",
    })),
  },
  { title: "User model", description: "This is the schema of the user when is returned" }
);

//* User model
export type UserModel = Static<typeof UserSchema>;
