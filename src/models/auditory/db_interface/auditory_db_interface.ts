import { TaskDbInterface } from "../../tasks/db_interface/task_db_interface";
import { UserDbInterface } from "../../users/db_interface/user_db_interface";

//* Auditory db interface is the interface for the auditory table in the database
export interface AuditoryDbInterface {
  id: string;
  idUser: string;
  idTask: string;
  status: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  user: UserDbInterface;
  task: TaskDbInterface;
}
