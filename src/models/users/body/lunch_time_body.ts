import { Static, t } from "elysia";

//* Lunch time body
export const lunchTimeBodySchema = t.Object(
  {
    is_lunching: t.Boolean({
      description: "This is the lunching status of the user",
      example: true,
    }),
    schedule_user: t.String({
      description: "This is the schedule of the user",
      example: "D",
    }),
  },
  {
    title: "Lunch time body",
    description:
      "This contains the essential information to create a lunch time object",
  }
);

//* Export the lunch time body
export type LunchTimeBody = Static<typeof lunchTimeBodySchema>;
