import { TaskRelationModel } from "../task_relation_model/task_relation_model";
import { UserRelationModel } from "../user_relation_model/user_relation_model";

//* Auditory db interface
export interface AuditoryDbInterface {
  id: string;
  idUser: string;
  idTask: string;
  status: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  user: UserRelationModel;
  task: TaskRelationModel;
}
