import { InputJsonValue } from "../../../generated/prisma/runtime/library";
import { prisma } from "../../context/db_config/db_service";
import { LunchTimeBody } from "../../models/users/body/lunch_time_body";
import { UserBody } from "../../models/users/body/user_body";
import { UserShedule } from "../../models/users/enum/user_enum";
import { UserModel } from "../../models/users/user_model";
import { UserUtils } from "./utils/user_utils";

export class UserService {
  //* Inject the database service
  constructor(private readonly db: typeof prisma) {}

  //* Get all users
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const response = await this.db.users.findMany({
        where: {
          isActive: true,
        },
      });

      if (!response) {
        console.error(`❌ Error getting all users`);
        return [];
      }

      return UserUtils.mapUserResponseArray(response);
    } catch (error) {
      console.error(`❌ Error getting all users ${error}`);
      throw error;
    }
  }

  //* Get user by id
  async getUserById(id: string): Promise<UserModel> {
    try {
      const response = await this.db.users.findUnique({
        where: { id, isActive: true },
      });

      if (!response || !response.id) {
        console.error(`❌ User not found`);
        return {} as UserModel;
      }

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error getting user by id ${error}`);
      throw error;
    }
  }

  //* Create user
  async createUser(body: UserBody): Promise<UserModel> {
    try {
      const response = await this.db.users.create({
        data: {
          username: body.user_name.toUpperCase(),
          fullName: UserUtils.capitalizeFirstLetter(body.full_name),
          password: await UserUtils.hashPassword(body.password),
          admin: false,
        },
      });

      if (!response) {
        console.error(`❌ Error creating user`);
        return {} as UserModel;
      }

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error creating user ${error}`);
      throw error;
    }
  }

  //* Update user
  async updateUser(id: string, body: UserBody): Promise<UserModel> {
    try {
      const response = await this.db.users.update({
        where: { id: id, isActive: true },
        data: {
          username: body.user_name.toUpperCase(),
          fullName: UserUtils.capitalizeFirstLetter(body.full_name),
          password: await UserUtils.hashPassword(body.password),
          updatedAt: new Date(),
        },
      });

      if (!response) {
        console.error(`❌ Error updating user`);
        return {} as UserModel;
      }

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error updating user ${error}`);
      throw error;
    }
  }

  //* Update lunch time
  async updateLunchTime(id: string, body: LunchTimeBody): Promise<UserModel> {
    try {
      const initialTime = new Date();
      const finalTime = new Date(initialTime.getTime());
      finalTime.setMinutes(
        finalTime.getMinutes() +
          (body.schedule_user === UserShedule.NIGHT.toString()
            ? 30
            : body.schedule_user === UserShedule.MORNING.toString()
            ? 60
            : 0)
      );

      const updatedLunchTime = UserUtils.createLunchTimeObject(
        body,
        initialTime,
        finalTime
      );

      const response = await this.db.users.update({
        where: { id: id, isActive: true },
        data: {
          lunchTime: updatedLunchTime as unknown as InputJsonValue,
          updatedAt: new Date(),
        },
      });

      if (!response) {
        console.error(`❌ Error updating lunch time`);
        return {} as UserModel;
      }

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error updating lunch time ${error}`);
      throw error;
    }
  }

  //* Delete user
  async deleteUser(id: string): Promise<UserModel> {
    try {
      const response = await this.db.users.update({
        where: { id: id, isActive: true },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });

      if (!response) {
        console.error(`❌ Error deleting user`);
        return {} as UserModel;
      }

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error deleting user ${error}`);
      throw error;
    }
  }
}
