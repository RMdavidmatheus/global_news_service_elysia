import { AuditoryModel } from "../../../models/auditory/auditory_model";
import { DateTime } from "luxon";
import { UserRelationModel } from "../../../models/auditory/user_relation_model/user_relation_model";
import { TaskModel } from "../../../models/tasks/task_model";
import { TaskRelationModel } from "../../../models/auditory/task_relation_model/task_relation_model";
import { TaskJsonModel } from "../../../models/tasks/task_json_model";
import { UserDbInterface } from "../../../models/users/db_interface/user_db_interface";
import { AuditoryDbInterface } from "../../../models/auditory/db_interface/auditory_db_interface";

export class AuditoryUtils {

  //* Method to capitalize the first letter of the every word
  private static capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    const lower = str.toLocaleLowerCase("es-ES");
    return lower[0].toLocaleUpperCase("es-ES") + lower.slice(1);
  };

  //* Method to map task details to TaskJsonModel
  private static mapTaskDetails(task: TaskJsonModel): TaskJsonModel {
    return {
        task_name: this.capitalizeFirstLetter(task.task_name),
        task_client: task.task_client.toUpperCase(),
        task_initial_time: DateTime.fromISO(task.task_initial_time, {
          zone: "utc",
        })
          .setZone("America/Bogota")
          .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
        task_final_time: DateTime.fromISO(task.task_final_time, { zone: "utc" })
          .setZone("America/Bogota")
          .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
        task_elapsed_time: this.capitalizeFirstLetter(task.task_elapsed_time),
      } as TaskJsonModel;
  }

  //* Method to map task relation to TaskRelationModel
  private static mapTaskRelation(task: TaskModel): TaskRelationModel {
    return {
      id: task.id,
      details: this.mapTaskDetails(task.details),
    };
  }

  //* Method to map user relation to UserRelationModel
  private static mapUserRelation(user: UserDbInterface): UserRelationModel {
    return {
      id: user.id,
      admin: user.admin,
      user_name: user.username,
    } as UserRelationModel;
  }

  //* Method for map response from database to Auditory model in array
  static mapAuditoryResponseArray(response: AuditoryDbInterface[]): AuditoryModel[] {
    if (!response) return [];

    const mapItem = (item: AuditoryDbInterface): AuditoryModel => ({
      id: item.id,
      user: this.mapUserRelation(item.user as unknown as UserDbInterface),
      task: this.mapTaskRelation(item.task as unknown as TaskModel),
      status: item.status,
      is_active: item.isActive,
      created_at: DateTime.fromJSDate(new Date(item.createdAt))
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      updated_at: item.updatedAt
        ? DateTime.fromJSDate(new Date(item.updatedAt))
            .setZone("America/Bogota")
            .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
        : undefined,
      deleted_at: item.deletedAt
        ? DateTime.fromJSDate(new Date(item.deletedAt))
            .setZone("America/Bogota")
            .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
        : undefined,
    });

    return response.map(mapItem);
  }

  //* Method for map response from database to Auditory model
  static mapAuditoryResponse(response: AuditoryDbInterface): AuditoryModel {
    return this.mapAuditoryResponseArray([response])[0];
  }
}
