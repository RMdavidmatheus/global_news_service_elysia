import { prisma } from "../../context/db_config/db_service";
import { TaskBody } from "../../models/tasks/body/task_body";
import { TaskModel } from "../../models/tasks/task_model";
import { TaskUtils } from "./utils/task_utils";

export class TaskService {
  //* Inject the database service
  constructor(private readonly db: typeof prisma) {}

  //* Get all tasks
  async getAllTasks(): Promise<TaskModel[]> {
    try {
      const response = await this.db.task.findMany({
        where: { isActive: true },
      });

      if (!response) {
        console.error(`❌ Error getting all tasks`);
        return [];
      }

      return TaskUtils.mapTaskResponseArray(response);
    } catch (error) {
      console.error(`❌ Error getting all tasks: ${error}`);
      throw error;
    }
  }

  //* Get a task by id
  async getTaskById(id: string): Promise<TaskModel> {
    try {
      const response = await this.db.task.findUnique({
        where: { id: id, isActive: true },
      });

      if (!response || !response.id) {
        console.error(`❌ Task not found`);
        return {} as TaskModel;
      }

      return TaskUtils.mapTaskResponse(response);
    } catch (error) {
      console.error(`❌ Error getting task by id: ${error}`);
      throw error;
    }
  }

  //* Create a task
  async createTask(body: TaskBody): Promise<TaskModel> {
    try {
      const response = await this.db.task.create({
        data: {
          task: TaskUtils.createTaskJsonObject(body, new Date()),
        },
      });

      if (!response || !response.id) {
        console.error(`❌ Error creating task`);
        return {} as TaskModel;
      }

      return TaskUtils.mapTaskResponse(response);
    } catch (error) {
      console.error(`❌ Error creating task: ${error}`);
      throw error;
    }
  }
}
