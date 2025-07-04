import { Context } from "elysia";
import { AuditoryService } from "../../services/auditory/auditory_service";
import { AuditoryModel } from "../../models/auditory/auditory_model";
import { MessageApi } from "../../context/messages/message_api";

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
}
