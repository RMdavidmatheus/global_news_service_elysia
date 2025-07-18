import { prisma } from "../../context/db_config/db_service";
import { AuditoryModel } from "../../models/auditory/auditory_model";
import { AuditoryBody } from "../../models/auditory/body/auditory_body";
import { StatusBody } from "../../models/auditory/body/status_body";
import { AuditoryDbInterface } from "../../models/auditory/db_interface/auditory_db_interface";
import { AuditoryUtils } from "./utils/auditory_utils";

export class AuditoryService {
  //* Inject the database service
  constructor(private readonly db: typeof prisma) {}

  //* Get all auditory
  async getAllAuditory(): Promise<AuditoryModel[]> {
    try {
      const response = await this.db.auditory.findMany({
        take: 6,
        where: { isActive: true, status: true},
        include: {
          user: true,
          task: true,
        },
      });

      if (!response) {
        console.error(`❌ Error getting all auditory`);
        return [];
      }

      return AuditoryUtils.mapAuditoryResponseArray(
        response as unknown as AuditoryDbInterface[]
      );
    } catch (error) {
      console.error(`❌ Error getting all auditory: ${error}`);
      throw error;
    }
  }

  //* Get auditory by id
  async getAuditoryById(id: string): Promise<AuditoryModel> {
    try {
      const response = await this.db.auditory.findUnique({
        where: { id, isActive: true },
        include: {
          user: true,
          task: true,
        },
      });

      if (!response || !response.id) {
        console.error(`❌ Error getting auditory by id: ${id}`);
        return {} as AuditoryModel;
      }

      return AuditoryUtils.mapAuditoryResponse(response);
    } catch (error) {
      console.error(`❌ Error getting auditory by id: ${id}`);
      throw error;
    }
  }

  //* Create auditory
  async createAuditory(body: AuditoryBody): Promise<AuditoryModel> {
    try {
      const response = await this.db.auditory.create({
        data: {
          idUser: body.id_user,
          idTask: body.id_task,
        },
        include: {
          user: true,
          task: true,
        },
      });

      if (!response || !response.id) {
        console.error(`❌ Error creating auditory`);
        return {} as AuditoryModel;
      }

      return AuditoryUtils.mapAuditoryResponse(response);
    } catch (error) {
      console.error(`❌ Error creating auditory`);
      throw error;
    }
  }

  //* Update auditory status to disable
  async updateAuditoryStatus(body: string[]): Promise<number> {
    try {
      const response = await this.db.auditory.updateMany({
        where: { id: { in: body }, isActive: true },
        data: { status: false, updatedAt: new Date() },
      });

      if (!response || response.count === 0) {
        console.error(`❌ Error updating auditory status: ${body}`);
        return 0;
      }

      return response.count;
    } catch (error) {
      console.error(`❌ Error updating auditory status: ${body}`);
      throw error;
    }
  }

  //* Delete auditory
  async deleteAuditory(id: string): Promise<AuditoryModel> {
    try {
      const response = await this.db.auditory.update({
        where: { id, isActive: true },
        data: { isActive: false, deletedAt: new Date() },
        include: {
          user: true,
          task: true,
        },
      });

      if (!response || !response.id) {
        console.error(`❌ Error deleting auditory: ${id}`);
        return {} as AuditoryModel;
      }

      return AuditoryUtils.mapAuditoryResponse(response);
    } catch (error) {
      console.error(`❌ Error deleting auditory: ${id}`);
      throw error;
    }
  }
}
