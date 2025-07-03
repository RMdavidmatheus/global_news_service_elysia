import { Context } from "elysia";
import { MessageApi } from "../../context/messages/message_api";
import { TaskModel } from "../../models/tasks/task_model";
import { TaskService } from "../../services/tasks/task_service";
import { TaskBody } from "../../models/tasks/body/task_body";

export class TaskController {
  //* Inject the task service
  constructor(private readonly service: TaskService) {}

  //* Get all tasks
  getAllTasks = async ({
    set,
  }: Pick<Context, "set">): Promise<TaskModel[] | MessageApi> => {
    try {
      const response: TaskModel[] = await this.service.getAllTasks();

      if (!response || response.length === 0) {
        set.status = 204;
        return {
          message: "No tasks found",
        } as MessageApi;
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(`❌ Error getting all tasks: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      } as MessageApi;
    }
  };

  //* Get a task by id
  getTaskById = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<TaskModel | MessageApi> => {
    try {
      const response: TaskModel = await this.service.getTaskById(query.id);

      if (!response || !response.id) {
        set.status = 204;
        return {
          message: `Task not found with id ${query.id}`,
        };
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(`❌ Error getting task by id: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Create a task
  createTask = async ({
    set,
    body,
  }: Pick<Context, "set" | "body">): Promise<TaskModel | MessageApi> => {
    try {
      const response: TaskModel = await this.service.createTask(
        body as TaskBody
      );

      if (!response) {
        set.status = 400;
        return {
          message: "Error creating task",
        };
      }

      set.status = 201;
      return {
        message: `Task created successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error creating task: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Update a task
  updateTask = async ({
    set,
    body,
    query,
  }: Pick<Context, "set" | "body" | "query">): Promise<
    TaskModel | MessageApi
  > => {
    try {
      const response: TaskModel = await this.service.updateTask(
        query.id,
        body as TaskBody
      );

      if (!response || !response.id) {
        set.status = 204;
        return {
          message: `Task not found with id ${query.id}`,
        };
      }

      set.status = 200;
      return {
        message: `Task updated successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error updating task: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Delete a task
  deleteTask = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<TaskModel | MessageApi> => {
    try {
      const response: TaskModel = await this.service.deleteTask(query.id);

      if (!response || !response.id) {
        set.status = 204;
        return {
          message: `Task not found with id ${query.id}`,
        };
      }

      set.status = 200;
      return {
        message: `Task deleted successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error deleting task: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };
}
