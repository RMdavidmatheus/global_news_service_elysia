import { Type as t } from "@sinclair/typebox";
import { Static } from "elysia";

//* Lunch time schema
export const LunchTimeSchema = t.Object(
  {
    is_lunching: t.Boolean({
        description: "This is the lunching status of the user",
        example: true,
    }),
    schedule_user: t.String({
        description: "This is the schedule of the user",
        example: "D",
    }),
    initial_time: t.String({
        description: "This is the initial time of the lunch",
        example: "2025-01-01T00:00:00.000Z",
    }),
    final_time: t.String({
        description: "This is the final time of the lunch",
        example: "2025-01-01T00:00:00.000Z",
    }),
    elapsed_time: t.String({
        description: "This is the elapsed time of the lunch",
        example: "1 hour and 30 minutes",
    }),
  },
  { title: "Lunch time model", description: "This is the schema of the lunch time when is returned" }
);

//* Lunch time model
export type LunchTimeModel = Static<typeof LunchTimeSchema>;
