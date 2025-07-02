import { t } from "elysia";
import { Static } from "elysia";

//* User schema
export const userSchema = t.Object(
  {
    id: t.String(),
    admin: t.Boolean(),
    user_name: t.String(),
    full_Name: t.String(),
    password: t.String(),
    lunch_time: t.Optional(
      t.Object({
        is_lunching: t.Boolean(),
        schedule_user: t.String(),
        initial_time: t.String(),
        final_time: t.String(),
        elapsed_time: t.String(),
      })
    ),
    is_active: t.Boolean(),
    created_at: t.String(),
    updated_at: t.Optional(t.String()),
    deleted_at: t.Optional(t.String()),
  },
  { title: "User model", description: "This is the schema of the user when is returned" }
);

//* User model
export type UserModel = Static<typeof userSchema>;
