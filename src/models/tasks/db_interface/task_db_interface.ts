import { JsonValue } from "@prisma/client/runtime/library";

//* Task db interface is the interface for the task table in the database
export interface TaskDbInterface {
    id: string;
    details: JsonValue;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}