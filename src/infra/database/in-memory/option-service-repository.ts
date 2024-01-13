import { OptionServiceRepository } from "@/appointment/application/repositories/option-service-repository";
import { OptionService } from "@/appointment/enterprise/entities/option-service";

export class OptionServiceRepositoryInMemory implements OptionServiceRepository {
  items: OptionService[] = []
  
  async save(data: OptionService): Promise<void> {
    this.items.push(data)
  }

  async findById(id: string): Promise<OptionService | undefined> {
    return this.items.find((optionService: OptionService) => optionService.id.isEqual(id))
  }
}