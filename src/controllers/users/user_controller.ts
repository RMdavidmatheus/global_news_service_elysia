import { Context } from "elysia";
import { MessageApi } from "../../context/messages/message_api";
import { UserModel } from "../../models/users/user_model";
import { UserService } from "../../services/users/user_service";

export class UserController {
  //* Inject the user service
  constructor(private readonly service: UserService) {}

  //* Get all users
  getAllUsers = async ({
    set,
  }: Pick<Context, "set">): Promise<UserModel[] | MessageApi> => {
    try {
      const response: UserModel[] = await this.service.getAllUsers();

      if (!response || response.length === 0) {
        set.status = 204;
        return { message: "No users found" };
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(`❌ Error getting all users ${error}`);
      set.status = 500;
      throw error;
    }
  };

  //* Get user by id
  getUserById = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<UserModel | MessageApi> => {
    try {
      const response: UserModel = await this.service.getUserById(query.id);

      if (!response) {
        set.status = 204;
        return { message: `User not found with id ${query.id}` };
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(
        `❌ Error getting user by id: ${query.id}, error: ${error}`
      );
      set.status = 500;
      throw error;
    }
  };
}
