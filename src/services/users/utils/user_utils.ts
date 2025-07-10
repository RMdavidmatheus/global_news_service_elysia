import { DateTime } from "luxon";
import { UserDbInterface } from "../../../models/users/db_interface/user_db_interface";
import { UserModel } from "../../../models/users/user_model";
import { LunchTimeModel } from "../../../models/users/lunch_time_model";
import { LunchTimeBody } from "../../../models/users/body/lunch_time_body";
import { UserShedule } from "../../../models/users/enum/user_enum";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserUtils {
  //* Method to map LunchTime response from database to LunchTime model
  private static mapLunchTimeResponse(
    lunchTime: LunchTimeModel
  ): LunchTimeModel {
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
  static mapUserResponseArray(response: UserDbInterface[]): UserModel[] {
    if (!response) return [];

    const mapItem = (item: UserDbInterface): UserModel => ({
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
  static mapUserResponse(response: UserDbInterface): UserModel {
    return this.mapUserResponseArray([response])[0];
  }

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
  static createLunchTimeObject(
    body: LunchTimeBody,
    initialTime: Date,
    finalDate: Date
  ): LunchTimeModel {
    return {
      is_lunching: body.is_lunching,
      schedule_user: body.is_lunching
        ? body.schedule_user
        : UserShedule.NO_SCHEDULE,
      initial_time: DateTime.fromJSDate(initialTime)
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      final_time: DateTime.fromJSDate(finalDate)
        .setZone("America/Bogota")
        .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
      elapsed_time: body.is_lunching
        ? this.calculateElapsedTime(initialTime, finalDate)
        : "User is not lunching",
    };
  }

  //* Method to capitalize the first letter of the every word
  static capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    const lower = str.toLocaleLowerCase("es-ES");
    return lower[0].toLocaleUpperCase("es-ES") + lower.slice(1);
  };

  //* Method to hash password using bcypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  //* Method to generate a cookie jwt
  static generateJwtCookie(userId: string, username: string): string {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        id: userId,
        username: username,
        exp: Math.floor(expirationTime.getTime() / 1000),
      },
      secretKey
    );

    return token;
  }

  //* Method to verify the password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
