import { Type as t } from "@sinclair/typebox";
import { Static } from "elysia";

//* Lunch time schema
export const lunchTimeSchema = t.Object(
  {
    is_lunching: t.Boolean(),
    schedule_user: t.String(),
    initial_time: t.String(),
    final_time: t.String(),
    elapsed_time: t.String(),
  },
  { title: "Lunch time model", description: "This is the schema of the lunch time when is returned" }
);

//* Lunch time model
export type LunchTimeModel = Static<typeof lunchTimeSchema>;
