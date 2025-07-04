import { prisma } from "../../context/db_config/db_service";
import { AuditoryModel } from "../../models/auditory/auditory_model";
import { AuditoryUtils } from "./utils/auditory_utils";

export class AuditoryService {
  //* Inject the database service
  constructor(private readonly db: typeof prisma) {}

  //* Get all auditory
  async getAllAuditory(): Promise<AuditoryModel[]> {
    try {
      const response = await this.db.auditory.findMany({
        where: { isActive: true },
        include: {
          user: true,
          task: true,
        },
      });

      if (!response) {
        console.error(`❌ Error getting all auditory`);
        return [];
      }

      return AuditoryUtils.mapAuditoryResponseArray(response);
    } catch (error) {
      console.error(`❌ Error getting all auditory: ${error}`);
      throw error;
    }
  }
}
