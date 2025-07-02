import { prisma } from "../../context/db_config/db_service";
import { UserBody } from "../../models/users/body/user_body";
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

      if (!response) return [];

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

      if (!response) return {} as UserModel;

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

      if (!response) return {} as UserModel;

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
        },
      });

      if (!response) return {} as UserModel;

      return UserUtils.mapUserResponse(response);
    } catch (error) {
      console.error(`❌ Error updating user ${error}`);
      throw error;
    }
  }
}
