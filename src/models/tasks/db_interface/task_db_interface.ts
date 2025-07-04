import { JsonValue } from "@prisma/client/runtime/library";

//* Task db interface
export interface TaskDbInterface {
    id: string;
    details: JsonValue;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}