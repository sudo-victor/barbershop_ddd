import { OptionService } from '@/appointment/enterprise/entities/option-service';

export interface OptionServiceRepository {
  save(optionService: OptionService): Promise<void>
  findById(id: string): Promise<OptionService | undefined>
}