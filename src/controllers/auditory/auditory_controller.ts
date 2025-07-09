import { MessageApi } from "./../../context/messages/message_api";
import { Context } from "elysia";
import { AuditoryService } from "../../services/auditory/auditory_service";
import { AuditoryModel } from "../../models/auditory/auditory_model";
import { AuditoryBody } from "../../models/auditory/body/auditory_body";

export class AuditoryController {
  //* Inject the auditory service
  constructor(private readonly service: AuditoryService) {}

  //* Get all auditory
  getAllAuditory = async ({
    set,
  }: Pick<Context, "set">): Promise<AuditoryModel[] | MessageApi> => {
    try {
      const response: AuditoryModel[] = await this.service.getAllAuditory();

      if (!response || response.length === 0) {
        set.status = 204;
        return {
          message: "No auditories found",
        };
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(`❌ Error getting all auditory: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Get auditory by id
  getAuditoryById = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<AuditoryModel | MessageApi> => {
    try {
      const response: AuditoryModel = await this.service.getAuditoryById(
        query.id
      );

      if (!response || !response.id) {
        set.status = 204;
        return {
          message: "Auditory not found",
        };
      }

      set.status = 200;
      return response;
    } catch (error) {
      console.error(`❌ Error getting auditory by id: ${query.id}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Create auditory
  createAuditory = async ({
    set,
    body,
  }: Pick<Context, "set" | "body">): Promise<MessageApi> => {
    try {
      const response: AuditoryModel = await this.service.createAuditory(
        body as AuditoryBody
      );

      if (!response || !response.id) {
        set.status = 400;
        return {
          message: "Error creating auditory",
        };
      }

      set.status = 201;
      return {
        message: `Auditory created successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error creating auditory: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Update auditory status to disable
  updateAuditoryStatusToDisable = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<MessageApi> => {
    try {
      const response: AuditoryModel = await this.service.updateAuditoryStatus(
        query.id
      );

      if (!response || !response.id) {
        set.status = 400;
        return {
          message: `Error updating auditory status with id: ${query.id}`,
        };
      }

      set.status = 200;
      return {
        message: `Auditory status updated with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error updating auditory status: ${error}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };

  //* Delete auditory
  deleteAuditory = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<MessageApi> => {
    try {
      const response: AuditoryModel = await this.service.deleteAuditory(
        query.id
      );

      if (!response || !response.id) {
        set.status = 400;
        return {
          message: `Error deleting auditory with id: ${query.id}`,
        };
      }

      set.status = 200;
      return {
        message: `Auditory deleted successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error(`❌ Error deleting auditory: ${query.id}`);
      set.status = 500;
      return {
        message: "Internal server error",
      };
    }
  };
}
