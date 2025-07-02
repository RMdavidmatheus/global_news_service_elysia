import { JsonValue } from "@prisma/client/runtime/library";

export interface UserDBInterface {
  id: string;
  admin: boolean;
  username: string;
  fullName: string;
  password: string;
  lunchTime: JsonValue | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
