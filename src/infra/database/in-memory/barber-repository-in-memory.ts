import { BarberRepository } from "@/appointment/application/repositories/barber-repository";
import { Barber } from "@/appointment/enterprise/entities/barber";

export class BarberRepositoryInMemory implements BarberRepository {
  items: Barber[] = []

  async findById(id: string): Promise<any> {
    return this.items.find((barber) => barber.id.isEqual(id))
  }
  
  async save(barber: Barber): Promise<void> {
    this.items.push(barber)
  }

  async findByCpf(cpf: string): Promise<Barber | undefined> {
    return this.items.find((barber) => barber.cpf.isEqual(cpf))
  }
}