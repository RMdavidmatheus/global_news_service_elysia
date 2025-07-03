import { TaskDbInterface } from "../../../models/tasks/db_interface/task_db_interface";
import { TaskJsonModel } from "../../../models/tasks/task_json_model";
import { DateTime } from "luxon";
import { TaskModel } from "../../../models/tasks/task_model";
import { TaskBody } from "../../../models/tasks/body/task_body";

export class TaskUtils {
  //* Method to capitalize the first letter of the every word
  static capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    const lower = str.toLocaleLowerCase("es-ES");
    return lower[0].toLocaleUpperCase("es-ES") + lower.slice(1);
  };

  //* Method to calculate the elapsed time
  private static calculateElapsedTime(initial: Date, final: Date): string {
    const differenceMs = final.getTime() - initial.getTime();

    const totalMinutes = Math.floor(differenceMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} y ${minutes} minute${
        minutes > 1 ? "s" : ""
      }`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  }

  //* Method to create a lunchTime object
  static createTaskJsonObject(
    body: TaskBody,
    initialTime: Date
  ): TaskJsonModel {
    const finalDate = new Date(
      initialTime.getTime() + body.task_minutes * 60000
    );

    return {
      task_name: this.capitalizeFirstLetter(body.task_name),
      task_client: body.task_client.toUpperCase(),
      task_initial_time: DateTime.fromJSDate(initialTime)
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      task_final_time: DateTime.fromJSDate(finalDate)
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      task_elapsed_time: this.calculateElapsedTime(initialTime, finalDate),
    };
  }

  //* Method to map Task response from database to TaskJsonModel
  static mapTaskJsonResponse(task: TaskJsonModel): TaskJsonModel {
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

  //* Method for map response from database to User model in list
  static mapTaskResponseArray(response: TaskDbInterface[]): TaskModel[] {
    if (!response) return [];

    const mapItem = (item: TaskDbInterface): TaskModel => ({
      id: item.id,
      details: item.task
        ? this.mapTaskJsonResponse(item.task as unknown as TaskJsonModel)
        : ({} as any),
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

  //* Method for map response from database to User model in single user
  static mapTaskResponse(response: TaskDbInterface): TaskModel {
    return this.mapTaskResponseArray([response])[0];
  }
}
