import { OptionService } from "@/appointment/enterprise/entities/option-service";
import { OptionServiceRepository } from "../repositories/option-service-repository";
import { BarberRepository } from "../repositories/barber-repository";
import { BarberNotFoundError } from "@/core/usecases/errors/barber-not-found-error";

export class CreateOptionServiceUseCase {
  
  constructor(
    private optionServiceRepository: OptionServiceRepository,
    private barberRepository: BarberRepository
  ) {}
  
  async execute(input: Input) {
    const barber = await this.barberRepository.findById(input.barberId)
    if (!barber) throw new BarberNotFoundError()
    const optionService = OptionService.create(input)
    await this.optionServiceRepository.save(optionService)
    return {
      id: optionService.id.toValue(),
      duration: optionService.duration,
      name: optionService.name,
      description: optionService.description,
      price: optionService.price,
    }
  }
}

type Input = {
  barberId: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  durationInSec: number;
}