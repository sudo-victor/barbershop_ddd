import { Barber } from '@/appointment/enterprise/entities/barber';

export interface BarberRepository {
  findById(id: string): Promise<Barber | undefined>;
  findByCpf(cpf: string): Promise<Barber | undefined>;
  save(barber: Barber): Promise<void>;
}