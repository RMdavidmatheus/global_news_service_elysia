import { DateTime } from "luxon";
import { UserDBInterface } from "../../../models/users/db_interface/user_db_interface";
import { UserModel } from "../../../models/users/user_model";
import { LunchTimeModel } from "../../../models/lunch_time_model";

export class UserUtils {
  //* Method to map LunchTime response from database to LunchTime model
  static mapLunchTimeResponse(lunchTime: LunchTimeModel): LunchTimeModel {
    return {
      is_lunching: lunchTime.is_lunching,
      schedule_user: lunchTime.schedule_user,
      initial_time: DateTime.fromISO(lunchTime.initial_time, { zone: "utc" })
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      final_time: DateTime.fromISO(lunchTime.final_time, { zone: "utc" })
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      elapsed_time: lunchTime.elapsed_time,
    };
  }

  //* Method for map response from database to User model in list
  static mapUserResponseArray(response: UserDBInterface[]): UserModel[] {
    if (!response) return [];

    const mapItem = (item: UserDBInterface): UserModel => ({
      id: item.id,
      admin: item.admin,
      user_name: item.username,
      full_Name: item.fullName,
      password: item.password,
      lunch_time: item.lunchTime
        ? this.mapLunchTimeResponse(item.lunchTime as unknown as LunchTimeModel)
        : undefined,
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
  static mapUserResponse(response: UserDBInterface): UserModel {
    return this.mapUserResponseArray([response])[0];
  }
}
