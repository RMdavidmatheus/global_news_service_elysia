import { JsonValue } from "@prisma/client/runtime/library";

//* UserDbInterface is the interface for the user table in the database
export interface UserDbInterface {
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
