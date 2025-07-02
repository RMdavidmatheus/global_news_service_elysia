import { prisma } from "../../context/db_config/db_service";
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
}
